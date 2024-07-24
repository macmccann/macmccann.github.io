import { colorThemeSelect } from './documentElements.js';
import Options from './options.js';

export type ColorThemeName = 'foam' | 'fire' | 'bubblegum' | 'galaxy';

type ColorTheme = {
    primary: string;
    secondary: string;
};

type ColorThemesConst = { [key in ColorThemeName]: ColorTheme };

const COLOR_THEMES: ColorThemesConst = {
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

export default class ColorThemes {
    static getTheme(): ColorTheme {
        const theme = Options.getOption('theme');
        return COLOR_THEMES[theme];
    }

    static setTheme(newTheme: ColorThemeName) {
        Options.setOption('theme', newTheme);
    }
}
