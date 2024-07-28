import { ColorThemeName } from './colorThemes';
import { colorThemeSelect, modeSelect } from './documentElements';
import { VisualizerMode } from './visualizer';

type OptionName =
    | 'theme'
    | 'visualizer'
    | 'attenuationRateDown'
    | 'attenuationRateUp';

type TOptions = {
    theme: ColorThemeName;
    visualizer: VisualizerMode;
    attenuationRateDown: string;
    attenuationRateUp: string;
};

const opts: TOptions = {
    theme: 'foam',
    visualizer: 'line',
    attenuationRateDown: '0.2',
    attenuationRateUp: '0.8',
};

export default class Options {
    static init() {
        for (const key in opts) {
            if (localStorage.getItem(key) != null) {
                // @ts-ignore - TODO: write error handling for local storage keys
                opts[key] = localStorage.getItem(key);
                Options.sideEffects(key as keyof TOptions);
            }
        }
    }

    static getOption<K extends keyof TOptions>(key: K): TOptions[K] {
        return opts[key];
    }

    static setOption<T extends keyof TOptions>(key: T, value: TOptions[T]) {
        opts[key] = value;
        localStorage.setItem(key, value.toString());
        Options.sideEffects(key);
    }

    static sideEffects<T extends keyof TOptions>(key: T): void {
        if (key === 'theme') {
            Options.setThemeSideEffect(opts.theme);
        }
        if (key === 'visualizer') {
            Options.setVisualizerSideEffect(opts.visualizer);
        }
    }

    static setThemeSideEffect = (newTheme: ColorThemeName) => {
        document.documentElement.setAttribute('data-theme', newTheme);
        colorThemeSelect.value = newTheme;
    };

    static setVisualizerSideEffect = (newVisualizer: VisualizerMode) => {
        modeSelect.value = newVisualizer;
    };
}

(() => {
    Options.init();
})();
