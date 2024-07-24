import ColorThemes, { ColorThemeName } from './colorThemes';
import { colorThemeSelect, modeSelect } from './documentElements';
import Options from './options';

colorThemeSelect.addEventListener('change', (event: any) => {
    ColorThemes.setTheme(event.target.value as ColorThemeName);
});

modeSelect.addEventListener('change', (event: any) => {
    Options.setOption('visualizer', event.target.value);
});
