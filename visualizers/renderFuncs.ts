import AudioProcessor from './audioProcessor';
import ColorThemes from './colorThemes';

export const RENDER_FUNCS = {
    bars: (
        audio: AudioProcessor,
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D
    ) => {
        const data = audio.freqArray;
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const numBars = data.length;

        // Calculate logarithmic positions for each bar
        let totalLog = 0;
        const logWidths = [];

        let cumulativeWidth = 0;

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

        // Draw each bar with logarithmically adjusted widths
        for (let i = 0; i < numBars; i++) {
            const logWidth = (logWidths[i] / totalLog) * canvasWidth;

            const barHeight = (data[i] * canvasHeight) / 20;
            const something = ColorThemes.getTheme();
            ctx.fillStyle = ColorThemes.getTheme().primary;
            ctx.fillRect(
                cumulativeWidth,
                canvasHeight - barHeight,
                logWidth,
                barHeight
            );
            cumulativeWidth += logWidth;
        }
    },
    line: (
        audio: AudioProcessor,
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D
    ) => {
        const data = audio.freqArray.map((val) => {
            return Math.log10(val + 1);
        });
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const numBars = data.length;

        // Clear the canvas
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

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

        ctx.beginPath();
        for (let i = 0; i < numBars; i++) {
            const logWidth = (logWidths[i] / totalLog) * canvasWidth;

            const x = cumulativeWidth + logWidth / 2;
            const y = canvasHeight - (data[i] * canvasHeight) / 2;

            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }

            cumulativeWidth += logWidth;
        }
        ctx.strokeStyle = ColorThemes.getTheme().primary;
        ctx.lineWidth = 2;
        ctx.stroke();
    },
};
