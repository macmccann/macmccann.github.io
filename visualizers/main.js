import ColorThemes from './colorThemes.js';
import Options from './options.js';
import Visualizer from './visualizer.ts';

document
    .getElementById('audioFileInput')
    .addEventListener('change', handleFileSelect, false);

    /// Testing
let audioContext,
    analyser,
    source,
    bufferLength,
    canvas,
    gl,
    program,
    dataArray,
    buffer,
    visualizer;
let ended = false;

const RAMP_LENGTH_UP_SECONDS = 0.1;
const RAMP_LENGTH_DOWN_SECONDS = 1;
const PEAK_RAMP_LENGTH_DOWN_SECONDS = 1;
const STEP_EPSILON = 0.0001;
const HOLD_DECAY = 0.01;
const HOLD_HEIGHT = 0.008;
const PEAK_HOLD_DECAY_MS = 1000;

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            initAudio(e.target.result);
        };
        reader.readAsArrayBuffer(file);
    }
}

function initAudio(audioData) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const FFT_SIZE = 4096;
    analyser = audioContext.createAnalyser();
    analyser.fftSize = FFT_SIZE;
    bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);

    analyser.minDecibels = -90;
    analyser.maxDecibels = 0;
    analyser.smoothingTimeConstant = 0.0;

    audioContext.decodeAudioData(audioData, function (buffer) {
        source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(analyser);
        source.onended = () => {
            ended = true;
        };

        visualizer = new Visualizer(audioContext);
        visualizer.connectAudio(analyser);
        analyser.connect(audioContext.destination);

        source.start();
        // initWebGL();

        startRenderer();
    });
}

function initWebGL() {
    canvas = document.getElementById('volumeBarCanvas');
    gl = canvas.getContext('webgl');

    const vertexShaderSource = `
        attribute vec2 a_position;
        attribute float a_barType;
        varying float v_barType;
        void main() {
            gl_Position = vec4(a_position, 0, 1);
            v_barType = a_barType;
        }
    `;

    const fragmentShaderSource = `
        precision mediump float;
        uniform float u_volume;
        uniform float u_rms;
        uniform float u_hold;
        varying float v_barType;
        void main() {
            if (v_barType == 0.0) {
                gl_FragColor = vec4(0.384, 0.530, 0.216, 1.0);
            } else {
                gl_FragColor = vec4(0.454, 0.98, 0.239, 1.0);
            }
        }
    `;

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(
        gl,
        gl.FRAGMENT_SHADER,
        fragmentShaderSource
    );

    program = createProgram(gl, vertexShader, fragmentShader);
    gl.useProgram(program);

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    const barTypeLocation = gl.getAttribLocation(program, 'a_barType');

    buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 12, 0);

    gl.enableVertexAttribArray(barTypeLocation);
    gl.vertexAttribPointer(barTypeLocation, 1, gl.FLOAT, false, 12, 8);
}

const startRenderer = () => {
    requestAnimationFrame(() => startRenderer());
    visualizer.render();
};

function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Error compiling shader:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

function createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Error linking program:', gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
    }
    return program;
}

document
    .getElementById('colorThemeSelect')
    .addEventListener('change', (event) => {
        ColorThemes.setTheme(event.target.value);
    });

document
    .getElementById('modeSelect')
    .addEventListener('change', (event) => {
        Options.setOption('visualizer', event.target.value);
    });