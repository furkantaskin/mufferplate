import fs from "node:fs";
import path from "node:path";
import url from "node:url";

import postcss from "postcss";
import purgecss from "@fullhuman/postcss-purgecss";

// @ts-ignore
import sortMediaQueries from "postcss-sort-media-queries";

import pc from "picocolors";

import { userConfig } from "./globals";

import type { UserPurgeConfig } from "../types/types";
import { logResult } from "./io_functions";
import { calculateSize } from "./file_operations";
import { bundleCode } from "./lightning_functions";

export async function purgeCss(getConfig: UserPurgeConfig = {}) {
  const startTime = performance.now();
  console.log(pc.cyan("Purging CSS..."));
  const purgeConfig = { ...userConfig.purge, ...getConfig };
  const inputFile = purgeConfig.file as string;
  const outputFile = (purgeConfig.output ? purgeConfig.output : purgeConfig.file) as string;

  const prevSize = calculateSize(inputFile);

  console.log(purgeConfig, "\n============\n", userConfig.purge, "\n============\n", getConfig);

  const purgeCssConfig = purgeConfig.purgeCss;

  const sortConfig = {
    sort: purgeConfig.desktopFirst ? "desktop-first" : "mobile-first",
  };

  const postCssPlugins = [
    purgecss(purgeCssConfig),
    sortMediaQueries(sortConfig),
  ];

  await postcss(postCssPlugins)
    .process(fs.readFileSync(inputFile, "utf-8"), {
      from: inputFile,
      to: outputFile ?? inputFile,
    })
    .then((result) => {
      bundleCode(result.css, outputFile, false);
      console.log(
        pc.green(`Purge process completed in ${(
          (performance.now() - startTime) /
          1000
        ).toFixed(2)}s    ${pc.cyan('(' + prevSize + ' -> ' + calculateSize(outputFile) + ')')}`)
      );
    })
    .catch((err) => {
      logResult(
        `Error while compiling ${pc.bold(inputFile)}: \n${err}`,
        "error"
      );
    });
}
