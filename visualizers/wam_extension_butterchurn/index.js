// the code below will get moved to the wam-extensions repo
// and could be imported from webaudiomodules.com in the future
let synth101;
let butterchurn;
let hasInitialized = false;
let audioContext = null;
let hostKey;
let renderer;
let count = 0;

/*=====================================================================================
FILE AUDIO
=======================================================================================*/
document
    .getElementById('file')
    .addEventListener('change', handleFileSelect, false);

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            initAudioFromFile(e.target.result);
        };
        reader.readAsArrayBuffer(file);
    }
}

function initAudioFromFile(audioData) {
    audioContext.decodeAudioData(audioData, function (buffer) {
        let source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(butterchurn.audioNode);
        source.onended = () => {
            ended = true;
        };
        source.start();
    });
}

/*=====================================================================================
VIDEO EXTENSION
=======================================================================================*/
class VideoExtension {
    constructor() {
        this.delegates = new Map();
        this.connections = new Map();
    }

    setDelegate(pluginId, delegate) {
        if (delegate) {
            this.delegates.set(pluginId, delegate);
        } else {
            this.delegates.delete(pluginId);
        }
    }

    getDelegate(pluginId) {
        return this.delegates.get(pluginId);
    }
}

class Uniform {
    constructor(gl, program, name, suffix) {
        this.gl = gl;
        this.program = program;
        this.name = name;
        this.suffix = suffix;
        this.location = gl.getUniformLocation(program, name);
        if (this.location == -1) {
            throw new Error(
                "Passed name didn't correspond to an active attribute in the specified program."
            );
        }
        console.log(`var ${name} location ${this.location}`);
    }

    set(...values) {
        var method = 'uniform' + this.suffix;
        var args = [this.location].concat(values);
        // @ts-ignore
        this.gl[method].apply(this.gl, args);
    }
}

// ----- Rect ----- //

class Rect {
    constructor(gl) {
        this.gl = gl;
        this.buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        this.verts = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
        gl.bufferData(gl.ARRAY_BUFFER, this.verts, gl.STATIC_DRAW);
    }

    render() {
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
    }
}

export class CanvasRenderer {
    constructor(canvas) {
        this.canvas = canvas;

        this.gl = canvas.getContext('webgl2') ?? canvas.getContext('webgl');

        this.setup(this.gl);
    }

    setup(gl) {
        console.log('CanvasRenderer: Calling setup');

        // create program
        var program = gl.createProgram();
        if (program == null) {
            return;
        }
        this.program = program;

        // add shaders
        var vertexShaderSource = this.vertexShader();
        var fragmentShaderSource = this.fragmentShader();

        this.addShader(vertexShaderSource, gl.VERTEX_SHADER);
        this.addShader(fragmentShaderSource, gl.FRAGMENT_SHADER);

        // link & use program
        gl.linkProgram(program);
        gl.useProgram(program);

        // create fragment uniforms
        this.uResolution = new Uniform(gl, program, 'u_resolution', '2f');

        // create position attrib
        this.billboard = new Rect(gl);

        this.positionLocation = this.gl.getAttribLocation(
            this.program,
            'a_position'
        );

        if (this.positionLocation < 0) {
            console.error('positionLocation returned ', this.positionLocation);
        }

        this.resize();

        console.log('finished setup');
    }

    render(input) {
        this.gl.useProgram(this.program);
        this.gl.bindTexture(this.gl.TEXTURE_2D, input);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.billboard.buffer);

        this.gl.enableVertexAttribArray(this.positionLocation);
        this.gl.vertexAttribPointer(
            this.positionLocation,
            2,
            this.gl.FLOAT,
            false,
            0,
            0
        );

        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);

        this.billboard.render();

        this.gl.bindTexture(this.gl.TEXTURE_2D, null);
        this.gl.useProgram(null);
    }

    // ----- resize ----- //
    resize() {
        var width = 640;
        var height = 480;

        this.uResolution.set(width, height);
        this.gl.viewport(0, 0, width, height);
    }

    addShader(source, type) {
        let gl = this.gl;
        var shader = gl.createShader(type);
        if (shader == null) {
            throw new Error('createShader returned null');
        }
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        var isCompiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (!isCompiled) {
            throw new Error(
                'Shader compile error: ' + gl.getShaderInfoLog(shader)
            );
        }
        gl.attachShader(this.program, shader);
    }

    vertexShader() {
        return `
attribute vec2 a_position;

void main() {
    gl_Position = vec4(a_position, 0, 1);
}
        `;
    }

    fragmentShader() {
        return `
        precision mediump float;

uniform sampler2D texture;
uniform vec2 u_resolution;

void main() {
    vec2 pos = gl_FragCoord.xy / u_resolution;

    gl_FragColor = texture2D(texture, pos);
}
    `;
    }
}

const AudioCtx = window.AudioContext || window.webkitAudioContext;

const setUIStateForLoading = () => {
    document.getElementById('init-button').src = './assets/loading.svg';
    document.getElementById('init').style.cursor = 'wait';
};

document.getElementById('init').addEventListener('click', () => {
    if (hasInitialized) return;
    hasInitialized = true;
    const init = async () => {
        setUIStateForLoading();
        audioContext = new AudioCtx();
        await run();
        document.getElementById('init').style.display = 'none';
    };
    init();
});

const initHost = async (audioContext) => {
    const { default: initializeWamHost } = await import(
        'https://www.webaudiomodules.com/sdk/2.0.0-alpha.6/src/initializeWamHost.js'
    );
    const [, key] = await initializeWamHost(audioContext, 'example');
    hostKey = key;

    await initExtensions();
};

const initExtensions = async () => {
    window.WAMExtensions = window.WAMExtensions || {};
    window.WAMExtensions.video = new VideoExtension();
};

// Load a WebAudioModule, and return an instance.
async function loadWAM(path) {
    const initialState = {};
    const { default: WAM } = await import(path);

    if (typeof WAM !== 'function' || !WAM.isWebAudioModuleConstructor) {
        throw new Error(`Path ${path} is not a WebAudioModule.`);
    }

    // if you wish to load more instances of a WAM, best to keep a reference to the WAM class
    // instead of importing it again.
    const instance = new WAM('example', audioContext);
    await instance.initialize(initialState);

    return instance;
}

async function initVideo(context) {
    let canvas = document.getElementById('wam-video');
    renderer = new CanvasRenderer(canvas);
}

async function run() {
    await initHost(audioContext);

    await initVideo(audioContext);

    butterchurn = await loadWAM('./video_butterchurn_source/dist/index.js');
    console.log('f: ', butterchurn);
    synth101 = await loadWAM('./lib/synth101/index.js');

    synth101.audioNode.connect(butterchurn.audioNode);
    butterchurn.audioNode.connect(audioContext.destination);

    // create the UI and add it to the container
    const ui = await butterchurn.createGui();
    const container = document.getElementById('instrument-container');
    container.appendChild(ui);

    let butterchurnExtension = window.WAMExtensions.video.getDelegate(
        butterchurn.instanceId
    );

    let videoOptions = {
        width: 640,
        height: 480,
        gl: renderer.gl,
    };
    butterchurnExtension.connectVideo(videoOptions);

    window.requestAnimationFrame(renderVideo);
}

function renderVideo() {
    let butterchurnExtension = window.WAMExtensions.video.getDelegate(
        butterchurn.instanceId
    );

    let inputs = [];
    let currentTime = audioContext.currentTime;

    inputs = butterchurnExtension.render(inputs, currentTime);

    renderer.render(inputs[0]);

    window.requestAnimationFrame(renderVideo);
}

document.getElementById('note').addEventListener('mousedown', () => {
    synth101.audioNode.scheduleEvents({
        type: 'wam-midi',
        time: synth101.audioNode.context.currentTime,
        data: { bytes: new Uint8Array([0x90, 74, 100]) },
    });
    synth101.audioNode.scheduleEvents({
        type: 'wam-midi',
        time: synth101.audioNode.context.currentTime + 0.25,
        data: { bytes: new Uint8Array([0x80, 74, 100]) },
    });
});
