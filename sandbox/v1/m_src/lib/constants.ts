import process from "node:process";

export const CONFIG_FILE_LIST = [
    'mufferplate.config.js',
    'mufferplate.config.mjs',
    'mufferplate.config.cjs',
    'mf.config.js',
    'mf.config.mjs',
    'mf.config.cjs',
]




export const JS_BANNER = `/*!\n**********\n\n${new Date().toLocaleDateString()}\nMade with mufferplate\nVisit: https://github.com/furkantaskin/mufferplate\n\n**********\n!*/`;

export const SASS_BANNER = `/*!\n**********\n\n${new Date().toLocaleDateString()}\nMade with mufferplate\nVisit: https://github.com/furkantaskin/mufferplate\n\n**********\n!*/`

export const ROOT_DIR = process.cwd();