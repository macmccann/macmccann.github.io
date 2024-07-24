import { ColorThemeName } from './colorThemes';
import { colorThemeSelect, modeSelect } from './documentElements';
import { VisualizerMode } from './visualizer';

type OptionName = 'theme' | 'visualizer';

type TOptions = {
    theme: ColorThemeName;
    visualizer: VisualizerMode;
};

const opts: TOptions = {
    theme: 'foam',
    visualizer: 'line',
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
        localStorage.setItem(key, value);
        Options.sideEffects(key);
    }

    static sideEffects = (key: OptionName) => {
        if (key === 'theme') {
            Options.setThemeSideEffect(opts.theme);
        }
        if (key === 'visualizer') {
            Options.setVisualizerSideEffect(opts.visualizer);
        }
    };

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
