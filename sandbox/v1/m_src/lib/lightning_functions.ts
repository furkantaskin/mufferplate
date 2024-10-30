import fs from "node:fs";

import { transform } from "lightningcss";
import pc from "picocolors";

import { logResult } from "./io_functions";
import { SASS_BANNER } from "./constants";

export function bundleCode(
  getCode: string,
  outputFile: string,
  useBanner: boolean = true
): boolean {
  let code_banner;
  try {
    let { code } = transform({
      filename: "",
      code: Buffer.from(getCode),
      minify: true,
      sourceMap: false,
      inputSourceMap: undefined,
    });

    const code_banner = useBanner ? SASS_BANNER + '\n' : '';


    const resultCode = `${code_banner + code.toString()}`;
    fs.writeFileSync(outputFile, resultCode, {encoding: 'utf-8', flag: 'w'});
  } catch (err: any) {
    logResult("Error while bundling: " + err, "error");
  }
  return true;
}
