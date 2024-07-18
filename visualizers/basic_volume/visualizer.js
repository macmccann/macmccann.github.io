import AudioLevels from './audioLevels.js';
import AudioProcessor from './audioprocessor.js';
import { RENDER_FUNCS } from './renderFuncs.js';
import ColorThemes from './colorThemes.js';
import Options from './options.js';

export default class Visualizer {
    constructor(audioContext) {
        this.audio = new AudioProcessor(audioContext);
        this.audioLevels = new AudioLevels(this.audio);

        // Get the canvas element and its context
        this.canvas = document.getElementById('volumeBarCanvas');
        this.ctx = this.canvas.getContext('2d');
    }

    render() {
        this.audio.sampleAudio();
        this.audioLevels.updateAudioLevels(this.fps, this.frameNum);
        this.renderWebGL();
    }

    connectAudio(audioNode) {
        this.audioNode = audioNode;
        this.audio.connectAudio(audioNode);
    }

    disconnectAudio(audioNode) {
        this.audio.disconnectAudio(audioNode);
    }

    renderWebGL() {
        // Clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const renderFunc = RENDER_FUNCS[Options.getOption('visualizer')];
        renderFunc(this.audio, this.canvas, this.ctx);
    }

    drawSpectrum() {
        const data = this.audio.freqArrayL;
        const canvasWidth = this.canvas.width;
        const canvasHeight = this.canvas.height;
        const numBars = data.length;

        // Clear the canvas
        this.ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        // Calculate logarithmic positions for each bar
        let totalLog = 0;
        const logWidths = [];

        for (let i = 0; i < numBars; i++) {
            if (i === 0) {
                logWidths.push(1);
                totalLog += 1;
            } else {
                const logWidth = Math.log10(i + 1) - Math.log10(i);
                logWidths.push(logWidth);
                totalLog += logWidth;
            }
        }

        let cumulativeWidth = 0;

        this.ctx.beginPath();
        for (let i = 0; i < numBars; i++) {
            const logWidth = (logWidths[i] / totalLog) * canvasWidth;

            const x = cumulativeWidth + logWidth / 2;
            const y = canvasHeight - (data[i] * canvasHeight) / 20;

            if (i === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }

            cumulativeWidth += logWidth;
        }
        this.ctx.strokeStyle = ColorThemes.getTheme().primary;
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    }
}
