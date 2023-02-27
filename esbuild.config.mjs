import * as esbuild from 'esbuild';
import { URL } from 'url';

const startTime = new Date().getTime();
const outdir = new URL(`./theme/assets/js/`, import.meta.url)
  .pathname;

function mergeFiles(filePaths) {
  return filePaths.map(
    (filePath) =>
      new URL(`./src/pages/${filePath}`, import.meta.url).pathname
  );
}

await esbuild
  .build({
    entryPoints: mergeFiles(['index.js']),
    bundle: true,
    minify: true,
    treeShaking: true,
    sourcemap: 'external',
    outdir: outdir,
  })
  .then(() =>
    console.log(
      `Bundling is done in ${
        (new Date().getTime() - startTime) / 1000
      } s and outdir is ${outdir}`
    )
  )
  .catch((error) => console.log(`Error: ${error}`));
