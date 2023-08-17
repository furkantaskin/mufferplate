import esbuild from 'esbuild';
import path from 'path';
import fs from 'node:fs';


let getEnv = null;
const sourceDir = 'src/js/pages';
const outDir = 'theme/assets/js';
let startTime;

const scssTemplate = `@use '../main' as m;
@use '../layout/header';
@use '../layout/footer';
`;

const jsTemplate = `import { mobileMenu, setTitle } from '../lib/common';

mobileMenu();
setTitle();
`;

console.log(import.meta.url);