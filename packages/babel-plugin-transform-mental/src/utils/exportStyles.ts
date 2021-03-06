import { cssFor, css } from 'glamor';
import * as fs from 'fs';
import * as path from 'path';
import * as mkdirp from 'mkdirp';
import { extractStyles } from 'mental-styles';

export function exportStyles(styles: any) {
    styles = extractStyles(styles);
    let cssValue = cssFor(styles);
    let fname = css(styles).toString();
    let root = path.join(process.cwd(), 'node_modules', '.cache', 'mentaljs', 'styles');
    let fpath = path.join(root, fname) + '.css';
    mkdirp.sync(root);
    if (!fs.existsSync(fpath)) {
        fs.writeFileSync(fpath, cssValue);
    }
    return {
        path: fpath, key: fname
    };
}