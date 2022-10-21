import { initFunc } from './init.mjs';
import { syncFunc } from './sync.mjs';
import { compileWithZ88DKFunc } from './compileWithZ88DK.mjs';
import { compileTapeFunc } from './compileTape.mjs';

export const init = (name, vars) => {
    initFunc(name, vars);
}

export const sync = (name, paths) => {
    syncFunc(name, paths);
}

export const compileWithZ88DK = (path) => {
    compileWithZ88DKFunc(path);
}

export const compileTape = (pathBasicFile, pathTapeBlocksFile) => {
    compileTapeFunc(pathBasicFile, pathTapeBlocksFile);
}