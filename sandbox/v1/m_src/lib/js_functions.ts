import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
import JavaScriptObfuscator from "javascript-obfuscator";

/* 3rd Party Modules */
import esbuild from "esbuild";
import pc from "picocolors";

/* Custom Modules */
import { logResult } from "./io_functions.js";
import { mergeFiles } from "./file_operations.js";
import { userConfig } from "./globals.js";
import { emptyDir } from "./file_operations.js";

/* Types */
import type { UserJsBaseConfig, UserJsOptions } from "../types/types.js";
import { JS_BANNER, ROOT_DIR } from "./constants.js";
import { stringify } from "node:querystring";

export async function devJs(getConfig: UserJsOptions) {
  let rebuildCounter = 0;
  let devJsConfig = {...userConfig?.js, ...getConfig };
  let startTime = 0;


  if (devJsConfig !== undefined && devJsConfig.dev !== undefined){
    devJsConfig.dev.entryPoints = getConfig.entryPoints ?? devJsConfig.dev?.entryPoints ?? devJsConfig.entryPoints;
    devJsConfig.dev.outdir = getConfig.outdir ?? devJsConfig.dev?.outdir ?? devJsConfig.outdir;
  }



  const watchPlugin: esbuild.Plugin = {
    name: "watch-plugin",
    setup(build) {
      build.onStart(() => {
        console.log(pc.yellow("\nProcessing JS files..."));
        startTime = performance.now();
      });
      build.onEnd(async (result) => {
        const getTime = (performance.now() - startTime).toFixed(2);
        if (result.errors.length > 0) {
          logResult(`Build failed. Error: ${result.errors[0].text}`, "error");
        } else {
          console.log(
            rebuildCounter === 0 ? "Built" : "Rebuilt",
            pc.cyan(`(${getTime}ms)\n`)
          );
          rebuildCounter += 1;
          if (devJsConfig.dev?.metafile) {
            console.log(
              await esbuild.analyzeMetafile(result.metafile as esbuild.Metafile)
            );
            fs.writeFileSync('bundlemeta.json', JSON.stringify(result.metafile))
          }
        }
      });
    },
  };

  //@ts-ignore
  devJsConfig.dev.entryPoints = mergeFiles(devJsConfig.dev.entryPoints);

  //@ts-ignore
  let ctx = await esbuild.context({ ...devJsConfig.dev, plugins: [watchPlugin] });
  
  ctx.watch();
}

export async function buildJs(getConfig: UserJsOptions) {
  let buildJsConfig = { ...userConfig.js, ...getConfig};
  const currentDir = path.dirname(fileURLToPath(import.meta.url));
  let obfuscate = false;


  if (buildJsConfig !== undefined && buildJsConfig.build !== undefined){
    buildJsConfig.build.entryPoints = getConfig.entryPoints ?? buildJsConfig.build?.entryPoints ?? buildJsConfig.entryPoints;
    buildJsConfig.build.outdir = getConfig.outdir ?? buildJsConfig.build?.outdir ?? buildJsConfig.outdir;
  }

  buildJsConfig = buildJsConfig.build as UserJsBaseConfig;

  //@ts-ignore
  buildJsConfig.entryPoints = mergeFiles(buildJsConfig.entryPoints);

  if (buildJsConfig.splitting) {
    logResult("Splitting is enabled. Module is converted to esm.", "info");
    logResult("Clearing old chunk files...", "info");
    emptyDir(buildJsConfig.outdir as string, ["chunks"]);
    buildJsConfig.format = "esm";
  }
  if (buildJsConfig.signed) {
    buildJsConfig.inject = [path.join(currentDir, "signature.js")];
  }
  if (buildJsConfig.obfuscate) {
    obfuscate = true;
  }

  buildJsConfig.banner = {
    js: JS_BANNER,
  };

  delete buildJsConfig.signed;
  delete buildJsConfig.obfuscate;

  //@ts-ignore
  let result = await esbuild.build(buildJsConfig);

  if (buildJsConfig.metafile) {
    console.log(
      await esbuild.analyzeMetafile(result.metafile as esbuild.Metafile)
    );
    fs.writeFileSync('bundlemeta.json', JSON.stringify(result.metafile))
  }

  if (obfuscate) {
    const directoryPath = path.join(ROOT_DIR, buildJsConfig.outdir as string);
    await fs.promises
      .readdir(directoryPath)
      .then((files) => {
        files.forEach(async (file) => {
          const filePath = path.join(directoryPath, file);

          try {
            console.log("\nObfuscating", file, "\n");
            const fileContent = await fs.promises.readFile(filePath, "utf8");

            const obfuscatedCode = await JavaScriptObfuscator.obfuscate(
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

            await fs.promises.writeFile(filePath, obfuscatedCode, "utf8");
            logResult(
              `${pc.yellow(file)} obfuscated successfully. Total size is ${(
                fs.statSync(filePath).size / 1024
              ).toFixed(3)} kB`,
              "success"
            );
          } catch (err) {
            logResult(`Error obfuscating file ${file}: ${err}`, "error");
          }
        });
      })
      .catch((err) => {
        logResult(`Error reading directory ${directoryPath}: ${err}`, "error");
      });
  }
}
