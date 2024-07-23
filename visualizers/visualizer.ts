import AudioLevels from './audioLevels.js';
import AudioProcessor from './audioProcessor.js';
import { RENDER_FUNCS } from './renderFuncs.js';
import Options from './options.js';

export default class Visualizer {
    audio: AudioProcessor;
    audioLevels: AudioLevels;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    audioNode: AudioNode | null = null;

    constructor(audioContext: AudioContext) {
        this.audio = new AudioProcessor(audioContext);
        this.audioLevels = new AudioLevels(this.audio);

        // Get the canvas element and its context
        this.canvas = document.getElementById(
            'volumeBarCanvas'
        ) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    }

    render() {
        this.audio.sampleAudio();
        this.audioLevels.updateAudioLevels();
        this.renderWebGL();
    }

    connectAudio(audioNode: AudioNode) {
        this.audioNode = audioNode;
        this.audio.connectAudio(audioNode);
    }

    disconnectAudio(audioNode: AudioNode) {
        this.audioNode = null;
        this.audio.disconnectAudio(audioNode);
    }

    renderWebGL() {
        // Clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const renderFunc = RENDER_FUNCS[Options.getOption('visualizer')];
        renderFunc(this.audio, this.canvas, this.ctx);
    }
}
