import { audioFileInput } from './documentElements';
import Visualizer from './visualizer';

class Main {
    audioContext: AudioContext;
    analyser: AnalyserNode;
    bufferLength: number;
    dataArray: Uint8Array;
    visualizer: Visualizer;

    constructor(
        audioContext: AudioContext,
        analyser: AnalyserNode,
        bufferLength: number,
        dataArray: Uint8Array,
        visualizer: Visualizer
    ) {
        this.audioContext = audioContext;
        this.analyser = analyser;
        this.bufferLength = bufferLength;
        this.dataArray = dataArray;
        this.visualizer = visualizer;
    }

    static initAudio = async (
        audioData: ArrayBuffer,
        audioContext: AudioContext,
        analyser: AnalyserNode
    ): Promise<Visualizer> => {
        const buffer = await audioContext.decodeAudioData(audioData);

        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(analyser);

        const visualizer = new Visualizer(audioContext);
        visualizer.connectAudio(analyser);
        analyser.connect(audioContext.destination);

        source.start();
        return visualizer;
    };

    static async init(audioData: ArrayBuffer) {
        const audioContext = new (window.AudioContext ||
            (window as any).webkitAudioContext)();
        const FFT_SIZE = 4096;
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = FFT_SIZE;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        analyser.minDecibels = -90;
        analyser.maxDecibels = 0;
        analyser.smoothingTimeConstant = 0.0;
        const visualizer = await Main.initAudio(
            audioData,
            audioContext,
            analyser
        );

        const main = new Main(
            audioContext,
            analyser,
            bufferLength,
            dataArray,
            visualizer
        );

        main.startRenderer();
    }

    static handleFileSelect = (event: Event) => {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];
        if (file == null) {
            return alert('File was null');
        }
        const reader = new FileReader();
        reader.onload = function (event) {
            if (
                event.target != null &&
                event.target.result != null &&
                typeof event.target.result !== 'string'
            ) {
                Main.init(event.target.result);
            } else {
                return alert('File reader did not return a valid result');
            }
        };
        reader.readAsArrayBuffer(file);
    };

    startRenderer = () => {
        requestAnimationFrame(() => this.startRenderer());
        this.visualizer.render();
    };
}

audioFileInput.addEventListener('change', Main.handleFileSelect, false);
