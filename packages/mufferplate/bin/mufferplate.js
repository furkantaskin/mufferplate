#!/usr/bin/env node

import esbuild from 'esbuild';
import path from 'path';
import fs from 'node:fs';
import { fileURLToPath } from 'url';


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

console.log(fileURLToPath(import.meta.url));