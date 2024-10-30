import fs from "node:fs";
import path from "node:path";
import url from "node:url";

import postcss from "postcss";
import tailwindcss from "tailwindcss";
import { bundle } from "lightningcss";

import chokidar from "chokidar";
import pc from "picocolors";

import { userConfig } from "./globals";
import { ROOT_DIR } from "./constants";
import { bundleCode } from "./lightning_functions";

import type { UserConfig, UserTwConfig } from "../types/types";
import { logResult } from "./io_functions";
import { compileSass } from "./sass_functions";
import { calculateSize } from "./file_operations";

let sassResult: any;

async function compileTailwind(
  getTwConfig: UserTwConfig,
  scssTrigger: boolean,
  isBuild: boolean
) {

  const startTime = performance.now();
  const inputFile = getTwConfig.twInputFile as string;
  const outputFile = getTwConfig.twOutputFile as string;

  console.log(pc.cyan(`Processing ${pc.bold(getTwConfig.twInputFile)}`));
  if (scssTrigger) {
    const startTime = performance.now();
    sassResult = await compileSass(
      getTwConfig.sass,
      isBuild,
      scssTrigger as boolean
    );
    sassResult &&
      console.log(
        pc.magenta(
          `SCSS precompiled in ${(performance.now() - startTime).toFixed(
            2
          )}ms\n`
        )
      );
  }

  const lightningResult = bundle({
    filename: inputFile,
    minify: isBuild,
    sourceMap: !isBuild,
    inputSourceMap: sassResult?.map ? sassResult.map.toString() : undefined,
    analyzeDependencies: true,
    projectRoot: path.join(ROOT_DIR, path.dirname(inputFile)),
  });

  let sourceList: string[] = [];

  const sourceCode = lightningResult.code.toString();
  let sourceMap:
    | undefined
    | {
        version: number;
        sources: string[];
        sourceRoot: null;
        mappings: string;
        sourcesContent: string[];
      }
    | string = lightningResult.map?.toString();

  if (sourceMap !== undefined) {
    sourceMap = JSON.parse(sourceMap);
    if (typeof sourceMap === "object") {
      sourceMap.sources = sourceMap.sources.map(
        (source: string, index: number) => {
          sourceList.push(source);
          return index === 0 ? source.replace(/^.*[\\\/]/, "") : source;
        }
      );
      sourceMap = JSON.stringify(sourceMap);
    }
  }
  try {
    await postcss([tailwindcss])
      .process(sourceCode as string, {
        from: inputFile,
        to: outputFile,
        map: sourceMap
          ? {prev: sourceMap, inline: true, sourcesContent: false }
          : false,
      })
      .then((result) => {
        isBuild
          ? bundleCode(result.css, outputFile)
          : fs.writeFileSync(outputFile, result.css, {encoding: 'utf-8', flag: "w" });
      })
      .catch((err) => {
        logResult(
          `Error while compiling ${pc.bold(inputFile)}: \n${err}`,
          "error"
        );
      });
  } catch (err) {
    logResult(`Error while reading ${pc.bold(inputFile)}: \n${err}`, "error");
    process.exit(1);
  }
  let endTime: string | number = performance.now() - startTime;
  endTime =
    endTime < 1000
      ? `${endTime.toFixed(2)} ms`
      : `${(endTime / 1000).toFixed(2)}1 s`;
  console.log(
    pc.green(`${pc.bold(inputFile)} compiled in ${pc.bold(endTime)}    ${pc.cyan('(' + await calculateSize(outputFile) + ')')}`)
  );
}

export async function devTailwind(getConfig: UserTwConfig = {}, useScss: boolean) {
  let twConfig = { ...userConfig.tailwind, ...getConfig };
  const readTwConfig = await import(`file://${ROOT_DIR}/tailwind.config.cjs`);
  let fileList: string[] = [];
  twConfig.sass = { ...userConfig.sass?.dev, ...twConfig.sass };

  await compileTailwind(twConfig, useScss, false);

  console.log(pc.dim("\nWaiting for file changes..."));

  fileList = useScss
    ? [
        ...readTwConfig.default.content,
        twConfig.twInputFile,
        twConfig?.sass?.inputFile,
        ...twConfig?.sass?.depsDir as string[],
      ]
    : [...readTwConfig.default.content, twConfig.twInputFile];

  const watcher = chokidar.watch(fileList as string[], {
    awaitWriteFinish: {
      stabilityThreshold: 50,
    },
  });

  watcher.on("change", async (file) => {
    await compileTailwind(twConfig, file.split(".").pop() === "scss", false);
    console.log(pc.dim("\nWaiting for file changes...\n"));
  });
}

export async function buildTailwind(getConfig: UserConfig = {}, useScss: boolean) {
  let twConfig = { ...userConfig.tailwind, ...getConfig };
  twConfig.sass = { ...userConfig.sass?.build, ...twConfig.sass };
  await compileTailwind(twConfig, useScss, true);
}
