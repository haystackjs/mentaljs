import { XStyleFactoryRegistry } from './XStyleFactory';
import { XStyles } from './XStyles';
import { prepareStyles } from './utils/prepareStyles';
import { extractModifier } from './utils/extractModifier';
import { stylesMap } from './utils/stylesMap';

// Our styles cache. Can it be faster?
const stylesCache = new Map<string, string>();

export function calculateStyles(styles: XStyles, selected: boolean = false) {
    const factory = XStyleFactoryRegistry.factory;

    // Load styles
    let src = styles;
    let srcHover = extractModifier('hover', styles);
    if (selected) {
        src = prepareStyles({ ...src, ...extractModifier('selected', styles) });
        srcHover = prepareStyles({ ...srcHover, ...extractModifier('selectedHover', styles) });
    }
    src = prepareStyles(src);
    srcHover = prepareStyles(srcHover);

    // Building CSS class names
    let css: string[] = ['x'];
    for (let k of Object.keys(src)) {
        // if (stylesMap[k]) {
        let v = src[k];
        let key = k + ': ' + v;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, factory.createStyle(v));
        }
        css.push(stylesCache.get(key)!);
        // } else {
        //     console.warn('unable to find ' + k);
        // }
    }
    for (let k of Object.keys(srcHover)) {
        // if (stylesMap[k]) {
        let v = srcHover[k];
        let key = 'hover-' + k + ': ' + v;
        if (!stylesCache.has(key)) {
            stylesCache.set(key, factory.createStyle({
                '&:hover, &:focus': v
            }));
        }
        css.push(stylesCache.get(key)!);
        // }
    }

    return css.join(' ');
}
