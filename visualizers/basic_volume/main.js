import Visualizer from './visualizer.js';

document
    .getElementById('audioFileInput')
    .addEventListener('change', handleFileSelect, false);

let audioContext,
    analyser,
    source,
    bufferLength,
    rmsBufferLength,
    dataArray,
    rmsDataArray,
    canvas,
    gl,
    program,
    buffer,
    visualizer;
let ended = false;
let peakVolume = 0;
let peakVolumeUpDownSmoothed = 0;
let peakHold = {
    value: 0,
    time: 0,
};
let lastRenderTime = null;

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

// const linearSmoothDownwardsForPeak = (
//     current,
//     previous,
//     rampTimesSeconds,
//     secondsSinceLastFrame
// ) => {
//     if (current > previous) {
//         return current;
//     }
//     const { RAMP_LENGTH_DOWN_SECONDS } = rampTimesSeconds;
//     const frames = RAMP_LENGTH_DOWN_SECONDS / secondsSinceLastFrame;
//     const step = (previous - current) / frames;
//     if (Math.abs(step) < STEP_EPSILON) {
//         return current;
//     }
//     const next = previous - step;
//     return next;
// };

// const linearSmoothUpDownForPeak = (
//     current,
//     previous,
//     rampTimesSeconds,
//     secondsSinceLastFrame
// ) => {
//     const { RAMP_LENGTH_UP_SECONDS, RAMP_LENGTH_DOWN_SECONDS } =
//         rampTimesSeconds;
//     if (secondsSinceLastFrame === 0) {
//         return previous;
//     }

//     let frames = 0;
//     if (current > previous) {
//         frames = RAMP_LENGTH_UP_SECONDS / secondsSinceLastFrame;
//     } else {
//         frames = RAMP_LENGTH_DOWN_SECONDS / secondsSinceLastFrame;
//     }
//     const step = (current - previous) / frames;
//     if (Math.abs(step) < STEP_EPSILON) {
//         return current;
//     }
//     const next = previous + step;
//     return next;
// };

// const drawBars = (peakVolume, peakVolumeUpDownSmoothed) => {
//     const volumeLocation = gl.getUniformLocation(program, 'u_volume');
//     const rmsLocation = gl.getUniformLocation(program, 'u_rms');
//     const holdLocation = gl.getUniformLocation(program, 'u_hold');

//     gl.uniform1f(volumeLocation, peakVolume);
//     gl.uniform1f(rmsLocation, peakVolumeUpDownSmoothed);
//     gl.uniform1f(holdLocation, peakHold.value);

//     const peakHeight = peakVolume * 2 - 1;
//     const rmsHeight = peakVolumeUpDownSmoothed * 2 - 1;

//     const peakBarType = 0.0;
//     const rmsBarType = 1.0;

//     gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
//     const positions = [
//         // Peak bar
//         -1,
//         rmsHeight,
//         peakBarType,
//         1,
//         rmsHeight,
//         peakBarType,
//         -1,
//         peakHeight,
//         peakBarType,
//         1,
//         peakHeight,
//         peakBarType,

//         // RMS bar
//         -1,
//         -1,
//         rmsBarType,
//         1,
//         -1,
//         rmsBarType,
//         -1,
//         rmsHeight,
//         rmsBarType,
//         1,
//         rmsHeight,
//         rmsBarType,

//         // Hold bar
//         -1,
//         peakHold.value * 2 - 1,
//         rmsBarType,
//         1,
//         peakHold.value * 2 - 1,
//         rmsBarType,
//         -1,
//         peakHold.value * 2 - 1 + HOLD_HEIGHT,
//         rmsBarType,
//         1,
//         peakHold.value * 2 - 1 + HOLD_HEIGHT,
//         rmsBarType,
//     ];
//     gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

//     gl.clearColor(0, 0, 0, 1);
//     gl.clear(gl.COLOR_BUFFER_BIT);

//     // Draw peak bar
//     gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

//     // Draw RMS bar
//     gl.drawArrays(gl.TRIANGLE_STRIP, 4, 4);

//     // Draw hold bar
//     gl.drawArrays(gl.TRIANGLE_STRIP, 8, 4);

//     requestAnimationFrame(render);
// };

// const getPeakHold = (
//     peakVolume,
//     prevPeakHold,
//     currentTime,
//     secondsSinceLastFrame
// ) => {
//     if (peakVolume >= prevPeakHold.value) {
//         return { value: peakVolume, time: currentTime };
//     }
//     if (currentTime - prevPeakHold.time > PEAK_HOLD_DECAY_MS) {
//         return {
//             value: linearSmoothUpDownForPeak(
//                 peakVolume,
//                 prevPeakHold.value,
//                 {
//                     RAMP_LENGTH_UP_SECONDS,
//                     RAMP_LENGTH_DOWN_SECONDS: PEAK_RAMP_LENGTH_DOWN_SECONDS,
//                 },
//                 secondsSinceLastFrame
//             ),
//             time: prevPeakHold.time,
//         };
//     }
//     return prevPeakHold;
// };

// function render(currentTime) {
//     analyser.getByteTimeDomainData(dataArray);

//     // Idk man
//     if (lastRenderTime == null || lastRenderTime <= 0) {
//         lastRenderTime = currentTime;
//         requestAnimationFrame(render);
//         return;
//     }

//     const msSinceLastFrame = currentTime - lastRenderTime;
//     const secondsSinceLastFrame = msSinceLastFrame / 1000;

//     lastRenderTime = currentTime;

//     // Compute peak volume
//     let peakVolumeThisBuffer = 0;
//     if (!ended) {
//         peakVolumeThisBuffer =
//             dataArray.reduce((a, b) => {
//                 return Math.max(a, Math.abs(b - 128));
//             }, 0) / 128;
//     }
//     peakVolume = linearSmoothDownwardsForPeak(
//         peakVolumeThisBuffer,
//         peakVolume,
//         { RAMP_LENGTH_UP_SECONDS, RAMP_LENGTH_DOWN_SECONDS },
//         secondsSinceLastFrame
//     );
//     peakVolumeUpDownSmoothed = linearSmoothUpDownForPeak(
//         peakVolumeThisBuffer,
//         peakVolumeUpDownSmoothed,
//         { RAMP_LENGTH_UP_SECONDS, RAMP_LENGTH_DOWN_SECONDS },
//         secondsSinceLastFrame
//     );
//     peakHold = getPeakHold(
//         peakVolume,
//         peakHold,
//         currentTime,
//         secondsSinceLastFrame
//     );

//     // drawBars(peakVolume, peakVolumeUpDownSmoothed, peakHold);
// }
