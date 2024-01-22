import { performance } from 'node:perf_hooks';
import fs from 'node:fs';
import process from 'node:process';
import chokidar from 'chokidar';
import path from 'node:path';
import * as sass from 'sass-embedded';
import pc from 'picocolors';

console.clear();
console.log(pc.magenta('🗲    MUFFMASS    🗲\n\n'));

const CONFIG_FILE_LIST = [
  'muffmass.config.js',
  'muffmass.config.mjs',
  'muffmass.config.cjs',
  'mm.config.js',
  'mm.config.mjs',
  'mm.config.cjs',
];

const ROOT_DIR = process.cwd();

let getEnv = '';
let customConfig = {};
let isExist = false;

function returnWithSpace(inputtext) {
  return `    ${inputtext}`;
}

async function readConfig() {
  let getPath = '';
  for (const filename of CONFIG_FILE_LIST) {
    getPath = path.resolve(ROOT_DIR, filename);
    if (!fs.existsSync(getPath)) {
      getPath = path.resolve(ROOT_DIR, 'mf_config', filename);
      if (!fs.existsSync(getPath)) {
        continue;
      }
    }
    isExist = true;
    break;
  }
  if (isExist) {
    console.log();
    const userConfig = await import(`file://${getPath}`);
    customConfig = userConfig.default;
  }
}

async function compileSass(file, inputFile, outputFile, isBuild) {
  console.log(pc.magenta(`\nProcessing ${pc.bold(inputFile)}`));
  const startTime = performance.now();
  let result = null;
  try {
    if (isBuild) {
      result = sass.compile(inputFile, {
        charset: false,
        style: 'compressed',
      });
    } else {
      result = sass.compile(inputFile, {
        charset: false,
        sourceMap: true,
      });
    }
  } catch (err) {
    if (err.sassMessage) {
      console.log(
        pc.red(
          pc.bold(
            `Error while compiling ${pc.bold(inputFile)}: \n${pc.red(
              err.sassMessage
            )}\n${pc.red(err.sassStack)}`
          )
        )
      );
    } else {
      pc.red(`Error while compiling ${pc.bold(inputFile)}: ${e}`);
    }
  }
  result &&
    fs.writeFile(outputFile, result.css, (err) => {
      if (err) {
        console.log(pc.red(err));
      }
      let endTime = performance.now() - startTime;
      endTime =
        endTime < 1000
          ? `${endTime.toFixed(2)} ms`
          : `${(endTime / 1000).toFixed(2)} s`;
      console.log(
        pc.green(`${pc.bold(inputFile)} compiled in ${pc.bold(endTime)}`)
      );
    });
}

(async () => {
  await readConfig();

  if (process.argv.includes('build')) {
    getEnv = 'build';
  } else {
    if (!process.argv.includes('dev')) {
      console.log(
        pc.yellow(
          `[warning]${returnWithSpace(
            'No mode detected. Working in dev mode as default'
          )}`
        )
      );
    }
    getEnv = 'dev';
  }

  if (getEnv === 'dev') {
    let isBuild = false;
    const watcher = chokidar.watch(customConfig.depsDir, {
      awaitWriteFinish: {
        stabilityThreshold: 50,
        pollInterval: 10,
      },
    });

    watcher.on('change', (file) => {
      compileSass(
        file,
        customConfig.inputFile,
        customConfig.outputFile,
        isBuild
      );
    });
  } else {
    let isBuild = true;
    compileSass(
      customConfig.inputFile,
      customConfig.inputFile,
      customConfig.outputFile,
      isBuild
    );
  }
})();
