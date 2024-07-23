const setThemeSideEffect = (newTheme) => {
    document.documentElement.setAttribute('data-theme', newTheme);
    document.getElementById('colorThemeSelect').value = newTheme;
};

const setVisualizerSideEffect = (newVisualizer) => {
    document.getElementById('modeSelect').value = newVisualizer;
};

export default class Options {
    static init() {
        this.opts = {
            theme: 'foam',
            visualizer: 'line',
        };
        this.sideEffects = (key) => {
            if (key === 'theme') {
                setThemeSideEffect(this.opts.theme);
            }
            if (key === 'visualizer') {
                setVisualizerSideEffect(this.opts.visualizer);
            }
        };
        for (const key in this.opts) {
            if (localStorage.getItem(key) != null) {
                this.opts[key] = localStorage.getItem(key);
                this.sideEffects(key);
            }
        }
    }

    static getOption(key) {
        return this.opts[key];
    }

    static setOption(key, value) {
        this.opts[key] = value;
        localStorage.setItem(key, value);
    }
}

(() => {
    Options.init();
})();
