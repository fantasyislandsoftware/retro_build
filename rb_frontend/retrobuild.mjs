import { func_sync } from './sync.mjs';
import { func_compile } from './compile.mjs';

export const sync = (paths) => {
    func_sync(paths);
}

export const compile = (path) => {
    func_compile(path);
}