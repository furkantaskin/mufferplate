#!/usr/bin/env node

import esbuild from "esbuild";
import { red, cyan, lightYellow, lightGreen, lightGray } from "kolorist";
import process from "node:process";
import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import JavaScriptObfuscator from 'javascript-obfuscator';


/** Returns string with space in the beginning
 * @param {string} inputtext
 *  @returns {string}
 */
function returnWithSpace(inputtext) {
  return `    ${inputtext}`;
}

/** @type {Array<string>} */
const CONFIG_FILE_LIST = [
  "mufferplate.config.js",
  "mufferplate.config.mjs",
  "mufferplate.config.cjs",
  "mf.config.js",
  "mf.config.mjs",
  "mf.config.cjs",
];

/** @type {string} */
const ROOT_DIR = process.cwd();

/** @type {string} */
let getEnv = "";

/** @type {boolean} */
let isExist = false;

let customConfig = {};

let getPath = "";

let startTime;

/**
 * Reads config from pre-defined diectories
 * @returns {undefined}
 */
async function readConfig() {
  for (const filename of CONFIG_FILE_LIST) {
    getPath = path.resolve(ROOT_DIR, filename);
    if (!fs.existsSync(getPath)) continue;
    isExist = true;
    break;
  }
  if (isExist) {
    const userConfig = await import(`file://${getPath}`);
    customConfig = await userConfig.default;
  }
}

// Starter
console.clear();
console.log(lightGreen("🗲    MUFFERPLATE    🗲\n\n"));

// Get mode
if (process.argv.includes("build")) {
  getEnv = "build";
} else {
  if (!process.argv.includes("dev")) {
    console.log(
      lightYellow("[warning]"),
      returnWithSpace("No mode detected. Working in dev mode as default")
    );
  }
  getEnv = "dev";
}

const watchPlugin = {
  name: "watch-plugin",
  setup(build) {
    build.onStart(() => {
      startTime = performance.now();
    });
    build.onEnd((result) => {
      const getTime = (performance.now() - startTime).toFixed(2);
      if (result.errors.length > 0) {
        console.log(
          red(`[error]    Build failed. Error: ${result.error[0].text}`)
        );
      } else {
        const currentTime = new Date().toLocaleTimeString("en-GB", {
          hour12: false,
        });
        console.log(
          lightGray(`[${currentTime}]`),
          returnWithSpace("Rebuilt"),
          cyan(`(${getTime}ms)`)
        );
      }
    });
  },
};

/**
 * Returns the list of entry points with absolute path
 * @param {string[] | null} [filePaths=null]
 * @returns {string[]}
 */
function mergeFiles(filePaths = null) {
  let getDir = "";
  let files;
  for (const filePath of filePaths) {
    if (!fs.existsSync(path.join(ROOT_DIR, filePath))) {
      console.log(
        lightYellow(`[warning]`),
        returnWithSpace(`No file exists such: ${filePath}`)
      );
    } else {
      if (!fs.statSync(filePath).isFile()) {
        getDir = filePath;
        console.log(
          cyan("[info]"),
          returnWithSpace(
            "Directory detected in entryPoints. Other file declarations will be ignored."
          )
        );
        break;
      }
    }
  }
  try {
    if (filePaths !== null) {
      let newMap;
      if (getDir !== "") {
        files = fs
          .readdirSync(path.join(ROOT_DIR, getDir))
          .filter(
            (file) =>
              path.extname(file) === ".js" || path.extname(file) === ".ts"
          );
        newMap = files.map((filePath) => path.join(ROOT_DIR, getDir, filePath));
      } else {
        newMap = filePaths.map((file) => path.join(ROOT_DIR, file));
      }
      return newMap;
    }
  } catch (err) {
    console.log(
      red(`[error]`),
      returnWithSpace(
        `Caught error on getting directory information. Error: ${err}`,
        err
      )
    );
    return null;
  }
}

function emptyDir(dir) {
  if (!fs.existsSync(dir)) {
    return;
  }
  for (const file of fs.readdirSync(dir)) {
    if (file === ".git") {
      continue;
    }
    fs.rmSync(path.resolve(dir, file), {
      recursive: true,
      force: true,
    });
  }
}

(async () => {
  await readConfig();

  if (
    !customConfig.entryPoints &&
    !customConfig.dev?.entryPoints &&
    !customConfig.build?.entryPoints
  ) {
    console.log(
      lightYellow("[warning]"),
      returnWithSpace("No entry points detected, it will read src/js directory")
    );
  }

  if (
    !customConfig.outdir &&
    !customConfig.dev?.outdir &&
    !customConfig.build?.outdir
  ) {
    console.log(
      lightYellow("[warning]"),
      returnWithSpace(
        "No output directory detected, it will generate the output to theme/assets/js directory"
      )
    );
  }

  if (
    (customConfig.dev?.splitting || customConfig.build?.splitting) &&
    !customConfig.chunkDir
  )
    console.log(
      lightYellow("[warning]"),
      returnWithSpace(
        "Splitting should be defined outside dev or build objects. It will be false as default"
      )
    );
  if (
    (customConfig.dev?.chunkNames || customConfig.build?.chunkNames) &&
    !customConfig.chunkDir
  )
    console.log(
      lightYellow("[warning]"),
      returnWithSpace(
        "Chunk directory should be defined outside dev or build objects. It will be 'chunks' directory as default"
      )
    );

  let watchConfig = {
    bundle: true,
    color: true,
    logLevel: "warning",
    treeShaking:
      customConfig.dev?.treeShaking ?? customConfig.treeShaking ?? true,
    sourcemap:
      customConfig.dev?.sourcemap ?? customConfig.sourcemap ?? "inline",
    outdir:
      customConfig.dev?.outdir ?? customConfig.outdir ?? "theme/assets/js",
    minify: customConfig.dev?.minify ?? customConfig.minify ?? false,
    splitting: customConfig.dev?.splitting
      ? false
      : customConfig.splitting ?? false,
    chunkNames: `${customConfig.chunkDir ?? "chunks"}/[name]-[hash]`,
    plugins: [watchPlugin],
  };

  let buildConfig = {
    bundle: true,
    color: true,
    logLevel: "info",
    treeShaking:
      customConfig.build?.treeShaking ?? customConfig.treeShaking ?? true,
    sourcemap: customConfig.build?.sourcemap ?? customConfig.sourcemap ?? false,
    outdir:
      customConfig.build?.outdir ??
      customConfig.dev?.outdir ??
      customConfig.outdir ??
      "theme/assets/js",
    minify: customConfig.build?.minify ?? customConfig.minify ?? true,
    splitting: customConfig.build?.splitting
      ? false
      : customConfig.splitting ?? false,
    chunkNames: `${customConfig.chunkDir ?? "chunks"}/[name]-[hash]`,
    banner: {
      js: `/*!\n**********\n\n${new Date().toLocaleDateString()}\nMade with mufferplate\nVisit: https://github.com/furkantaskin/mufferplate\n\n**********\n!*/`,
    },
    metafile: customConfig.build?.meta ?? customConfig.meta ?? false,
  };

  if (watchConfig.splitting) watchConfig.format = "esm";
  if (buildConfig.splitting) buildConfig.format = "esm";
  if (customConfig.signed)
    buildConfig.inject = ["./node_modules/mufferplate/bin/signature.js"];

  !isExist &&
    console.log(
      lightYellow("[warning]"),
      returnWithSpace(
        "No config file detected. Running under default configuration"
      )
    );

  if (getEnv !== "build") {
    watchConfig.entryPoints = mergeFiles(
      customConfig.dev?.entryPoints ?? customConfig.entryPoints ?? "src/js"
    );
    let ctx = await esbuild.context(watchConfig);
    ctx.watch();
  } else {
    buildConfig.entryPoints = mergeFiles(
      customConfig.build?.entryPoints ??
        customConfig.dev?.entryPoints ??
        customConfig.entryPoints ??
        "src/js"
    );
    if (buildConfig.splitting) {
      console.log(
        cyan("[info]"),
        returnWithSpace("Splitting is enabled. Clearing the old chunk files...")
      );
      emptyDir(buildConfig.outdir);
    }
    let result = await esbuild.build(buildConfig);

    buildConfig.metafile &&
      console.log(await esbuild.analyzeMetafile(result.metafile));

    if (customConfig.obfuscate) {
      const directoryPath = path.join(ROOT_DIR, buildConfig.outdir);
      fs.promises
        .readdir(directoryPath)
        .then((files) => {
          files.forEach(async (file) => {
            const filePath = path.join(directoryPath, file);

            try {
              const fileContent = await fs.promises.readFile(filePath, "utf8");

              // Obfuscate the content
              const obfuscatedCode = JavaScriptObfuscator.obfuscate(
                fileContent,
                {
                  compact: true,
                  controlFlowFlattening: true,
                  controlFlowFlatteningThreshold: 1,
                  numbersToExpressions: true,
                  simplify: true,
                  shuffleStringArray: true,
                  splitStrings: true,
                  stringArrayThreshold: 1,
                }
              ).getObfuscatedCode();

              // Write the obfuscated content back to the file
              await fs.promises.writeFile(filePath, obfuscatedCode, "utf8");
              console.log(
                lightGreen("\n[success]"),
                returnWithSpace(`${lightGray(file)} obfuscated successfully. Total size is ${cyan((fs.statSync(filePath).size / 1024).toFixed(1) + ' kB')}`)
              );
            } catch (err) {
              console.log(
                red("[error]"),
                returnWithSpace(`Error obfuscating file ${file}:`, err)
              );
            }
          });
        })
        .catch((err) => {
          console.error("Unable to scan directory:", err);
        });
    }
  }
})();
