export default class Options {
    static init() {
        this.opts = {
            theme: 'foam',
            visualizer: 'line',
        };
        for (const key in this.opts) {
            if (localStorage.getItem(key) != null) {
                this.opts[key] = localStorage.getItem(key);
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
