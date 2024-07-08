import { performance } from "node:perf_hooks";
import fs, { WriteFileOptions } from "node:fs";

import pc from "picocolors";
import * as sass from "sass-embedded";
import chokidar from "chokidar";

import { UserConfig, UserSassOptions } from "../types/types";
import { logResult } from "./io_functions";

import { bundleCode } from "./lightning_functions";
import { calculateSize } from "./file_operations";
import { userConfig } from "./globals";


export async function compileSass(
  config: UserConfig["sass"],
  isBuild: boolean,
  preCompile: boolean = false
) {
  let result = null;
  const startTime = performance.now();

  const inputFile = (isBuild ? config?.inputFile ?? config?.build?.inputFile : config?.inputFile ?? config?.dev?.inputFile) as string;
  const outputFile = (isBuild ? config?.outputFile ?? config?.build?.outputFile : config?.outputFile ?? config?.dev?.outputFile) as string;

  console.log(
    pc.magenta(
      `${preCompile ? "\nPrecompiling SCSS. " : ""}Processing ${pc.bold(
        inputFile
      )}`
    )
  );
  try {
    let annotationMap: string = "";
    if (isBuild) {
      result = await sass.compileAsync(inputFile, {
        charset: true,
        importers: [new sass.NodePackageImporter()],
        style: "compressed",
        sourceMap: config?.build?.sourcemap ?? false,
      });
      !preCompile && bundleCode(result.css, outputFile, true);
    } else {
      result = await sass.compileAsync(inputFile, {
        charset: true,
        importers: [new sass.NodePackageImporter()],
        style: "expanded",
        sourceMap: config?.dev?.sourcemap ?? true,
        sourceMapIncludeSources: false,
      });
      annotationMap = config?.sourcemap
        ? "\n/*# sourceMappingURL=data:application/json;utf-8," +
          encodeURIComponent(JSON.stringify(result.sourceMap)) +
          " */\n"
        : "";
      fs.writeFileSync(
        outputFile,
        `${result.css.toString() + annotationMap}`,
        {encoding: 'utf-8', flag: 'w'}
      );
    }
    if (preCompile) {
      if (isBuild) {
        fs.writeFileSync(
          outputFile,
          `${result.css.toString() + annotationMap}`,
          {encoding: 'utf-8', flag: 'w'}
        );
      }
      return {
        code: result.css.toString(),
        map: result.sourceMap,
      };
    }

    let endTime: string | number = performance.now() - startTime;
    endTime =
      endTime < 1000
        ? `${endTime.toFixed(2)} ms`
        : `${(endTime / 1000).toFixed(2)}1 s`;
    console.log(
      pc.green(`${pc.bold(inputFile)} compiled in ${pc.bold(endTime)}    ${!preCompile && pc.cyan('(' + calculateSize(outputFile) + ')')}`)
    );
    return true;
  } catch (err: any) {
    if (err?.sassMessage) {
      logResult(
        `Error while compiling ${pc.bold(inputFile)}: \n${pc.red(
          err.sassMessage
        )}\n ${pc.red(err.sassStack)}`,
        "error"
      );
    } else {
      logResult(
        `Error while compiling ${pc.bold(inputFile)}: \n${err}`,
        "error"
      );
    }
  }
}

export async function devSass(getConfig: UserSassOptions = {}) {
  let devScssConfig = { ...userConfig?.sass, ...getConfig?.dev };

  await compileSass(devScssConfig, false);

  console.log(pc.dim("\nWatching SCSS files for changes..."));

  const watcher = chokidar.watch(devScssConfig?.depsDir as string[], {
    awaitWriteFinish: {
      stabilityThreshold: 50,
      pollInterval: devScssConfig?.polling ?? 100,
    },
  });

  watcher.on("change", async () => {
    await compileSass(devScssConfig, false);
    console.log(pc.dim("\nWaiting for file changes...\n"));
  });
}

export async function buildSass(getConfig: UserSassOptions = {}) {
  let buildScssConfig = { ...userConfig?.sass, ...getConfig?.build };
  await compileSass(buildScssConfig, true);
}
