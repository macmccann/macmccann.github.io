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
}
