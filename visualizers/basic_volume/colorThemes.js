import Options from './options.js';

const COLOR_THEMES = {
    foam: {
        primary: '#abffca',
        secondary: '#000000',
    },
    fire: {
        primary: '#ff0000',
        secondary: '#000000',
    },
    bubblegum: {
        primary: '#ffffff',
        secondary: '#ffa1ee',
    },
    galaxy: {
        primary: '#e8daed',
        secondary: '#755b7d',
    },
};

class ColorThemes {
    static getTheme() {
        return COLOR_THEMES[Options.getOption('theme')];
    }

    static setTheme(newTheme) {
        Options.setOption('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    }
}

export default ColorThemes;
