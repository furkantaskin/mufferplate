#!/usr/bin/env node

import esbuild from 'esbuild';
import {red, cyan, green, lightYellow, lightGreen, magenta, lightGray,dim} from "kolorist";
import process from "node:process";
import fs from "node:fs";
import path from "node:path"
import {performance} from "node:perf_hooks"



/** @type {Array<string>} */
const CONFIG_FILE_LIST = [
    "mufferplate.config.js",
    "mufferplate.config.mjs",
    "mufferplate.config.cjs",
    "mf.config.js",
    "mf.config.mjs",
    "mf.config.cjs"
]

/** @type {string} */
const ROOT_DIR = process.cwd()


/** @type {string} */
let getEnv = "";

/** @type {boolean} */
let isExist = false;

let customConfig = {};

let getPath = "";

let startTime;
async function readConfig(){
    for(const filename of CONFIG_FILE_LIST){
        getPath = path.resolve(ROOT_DIR, filename);
        if (!fs.existsSync(getPath)) continue;
        isExist = true;
        break;
    }
    if (isExist){
    const userConfig = await import(`file://${getPath}`);
    customConfig =  await userConfig.default
    }
}


// Starter
console.clear();
console.log(lightGreen("🗲    MUFFERPLATE    🗲\n\n"));


// Get mode
if (process.argv.includes("build")){
    getEnv = "build"
} else{
    if(!process.argv.includes("dev")){
        console.log(lightYellow("[warning]    No mode detected. Working in dev mode as default"));
    }
    getEnv = "dev";
}

const watchPlugin = {
    name: 'watch-plugin',
    setup(build) {
      build.onStart(() => {
        startTime = performance.now();
      });
      build.onEnd((result) => {
        const getTime = (performance.now() - startTime).toFixed(2);
        if (result.errors.length > 0) {
            console.log(red(`[error]    Build failed. Error: ${result.error[0].text}`))
        } else {
            const currentTime = new Date().toLocaleTimeString('en-GB', {hour12: false})
            console.log(cyan(`${lightGray(`[${currentTime}]`)}    Rebuilt (${getTime}ms)`))
        }
      });
    },
  };

  const buildPlugin = {
    name: 'build-plugin',
    setup(build) {
      build.onStart(() => {
        startTime = performance.now();
        console.log(cyan("\nBuilding JS files for production."))
      });
      build.onEnd((result) => {
        let getTime = performance.now() - startTime;
        if (result.errors.length > 0) {
            console.log(red(`[error]    Build failed. Error: ${result.error[0].text}`))
        } else {
            console.log(green(`\nAll JS files are built in ${getTime.toFixed(2)}ms.`))
        }
      });
    },
  };

function mergeFiles(filePaths = null) {
    let getDir = "";
    let files;
    for(const filePath of filePaths){
        if(!fs.existsSync(path.join(ROOT_DIR, filePath))){
            console.log(lightYellow(`[warning]    No file exists such: ${filePath}`))
        } else{
            if(!fs.statSync(filePath).isFile()){
                getDir = filePath;
                console.log(cyan("[info]    Directory detected in entryPoints. Other file declarations will be ignored."))
                break;
            }
        }
    }
    try {
        if(filePaths !== null){
            let newMap;
            if (getDir !== ""){
                files = fs.readdirSync(path.join(ROOT_DIR, getDir)).filter(file => path.extname(file) === ".js");
                newMap = files.map((filePath) =>
        path.join(ROOT_DIR, getDir, filePath)
      );
      

            } else{
                newMap = filePaths.map(file => path.join(ROOT_DIR, file));
            }
      return newMap;

        }
  
    } catch (err) {
      console.log(red(`[error]   Caught error on getting directory information. Error: ${err}`, err));
      return null;
    }
  }

(async () => {
    await readConfig();

    if(!customConfig.entryPoints && !customConfig.dev?.entryPoints && !customConfig.build?.entryPoints){
        console.log(lightYellow("[warning]    No entry points detected, it will read src/js directory"))
    }

    if(!customConfig.outDir && !customConfig.dev?.outDir && !customConfig.build?.outDir){
        console.log(lightYellow("[warning]    No output directory detected, it will generate the output to theme/assets/js directory"))
    }

    if((customConfig.dev?.splitting || customConfig.build?.splitting) && !customConfig.chunkDir) console.log(lightYellow("[warning]    Splitting should be defined outside dev or build objects. It will be false as default"))
    if((customConfig.dev?.chunkNames || customConfig.build?.chunkNames) && !customConfig.chunkDir) console.log(lightYellow("[warning]    Chunk directory should be defined outside dev or build objects. It will be 'chunks' directory as default"))

    let watchConfig = {
        bundle: true,
        color: true,
        logLevel: 'warning',
        treeShaking: customConfig.dev?.treeShaking ?? customConfig.treeShaking ?? true,
        sourcemap: customConfig.dev?.sourcemap ?? customConfig.sourcemap ?? 'inline',
        outdir: customConfig.dev?.outDir ?? customConfig.outDir ?? 'theme/assets/js',
        minify: customConfig.dev?.minify ?? customConfig.minify ?? false,
        splitting: customConfig.dev?.splitting ? false : customConfig.splitting ?? false,
        chunkNames: `${customConfig.chunkDir ?? 'chunks'}/[name]-[hash]`,
        plugins: [watchPlugin],
    }


    let buildConfig = {
        bundle: true,
        color: true,
        logLevel: 'warning',
        treeShaking: customConfig.build?.treeShaking ?? customConfig.treeShaking ?? true,
        sourcemap: customConfig.build?.sourcemap ?? customConfig.sourcemap ?? false,
        outdir: customConfig.build?.outDir ?? customConfig.dev?.outDir ?? customConfig.outDir ?? 'theme/assets/js',
        minify: customConfig.build?.minify ?? customConfig.minify ?? true,
        splitting: customConfig.build?.splitting ? false : customConfig.splitting ?? false,
        chunkNames: `${customConfig.chunkDir ?? 'chunks'}/[name]-[hash]`,
        banner: {
          js: customConfig.signed ? '/*! Made with mufferplate !*/' : ''
        },
        plugins: [buildPlugin],
    }

    if (watchConfig.splitting) watchConfig.format = "esm"
    if (buildConfig.splitting) buildConfig.format = "esm"
    if (customConfig.signed) buildConfig.inject = ['./node_modules/mufferplate/bin/signature.js']

    !isExist && console.log(lightYellow("No config file detected. Running under default configuration"));

    if (getEnv !== 'build') {
      watchConfig.entryPoints = mergeFiles(customConfig.dev?.entryPoints ?? customConfig.entryPoints ?? "src/js");
        let ctx = await esbuild.context(watchConfig);
        ctx.watch();
      } else {
        buildConfig.entryPoints = mergeFiles(customConfig.build?.entryPoints ?? customConfig.dev?.entryPoints ?? customConfig.entryPoints ?? "src/js");
        await esbuild.build(buildConfig);

        let fileCounter = 0;
        let getFile = fs.readdirSync(path.join(ROOT_DIR, buildConfig.outdir));
        for(let i = 0; i<getFile.length; i++){
          fs.statSync(path.join(ROOT_DIR, buildConfig.outdir, getFile[i])).isFile() && fileCounter++;
        }
        console.log(`\nTotal ${fileCounter} files generated`)
        for(const outputFile of getFile){
           fs.statSync(path.join(ROOT_DIR, buildConfig.outdir, outputFile)).isFile() && console.log(`${dim(lightGray(buildConfig.outdir+"/"))}${green(outputFile)}    ${dim(lightGray((fs.statSync(path.join(ROOT_DIR,buildConfig.outdir,outputFile)).size / 1024).toFixed(2) +" kB"))}`)
        }
        if(buildConfig.splitting){
          console.log("\nChunk files are generated");
            let chunkDir = path.join(ROOT_DIR, buildConfig.outdir, buildConfig.chunkNames.split("/")[0]);
            for (const chunkFiles of fs.readdirSync(chunkDir)){
              console.log(`${dim(lightGray(buildConfig.outdir + "/" + buildConfig.chunkNames.split("/")[0]))+"/"}${magenta(chunkFiles)}    ${dim(lightGray((fs.statSync(path.join(chunkDir, chunkFiles)).size / 1024).toFixed(2) +" kB"))}`);
            }
        }
      }
      
})();
