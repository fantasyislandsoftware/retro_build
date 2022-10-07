import { syncFunc } from './sync.mjs';
import { compileWithZ88DKFunc } from './compileWithZ88DK.mjs';

export const sync = (paths) => {
    syncFunc(paths);
}

export const compileWithZ88DK = (path) => {
    compileWithZ88DKFunc(path);
}