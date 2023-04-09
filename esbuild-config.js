import esbuild from 'esbuild';
import path from 'path';
import { config } from 'dotenv';

config();

const sourceDir = 'src/pages';
const outDir = 'theme/assets/js';
let startTime;

console.log(
  `\x1b[96m Running under ${process.env.NODE_ENV} build. \x1b[039m`
);

const watchPlugin = {
  name: 'watch-plugin',
  setup(build) {
    build.onStart(() => {
      startTime = new Date().getTime();
      console.log(`\x1b[33m Build started. \x1b[039m`);
    });
    build.onEnd((result) => {
      if (result.errors.length > 0) {
        console.log(
          `\x1b[31m Build failed. Error: ${result.errors[0].text} \x1b[039m`
        );
      } else {
        console.log(
          `\x1b[32m Build completed in ${
            new Date().getTime() - startTime
          }ms.  [${new Date().toLocaleTimeString('en-GB', {
            hour12: false,
          })}]  \x1b[039m`
        );
      }
    });
  },
};

function mergeFiles(filePaths) {
  const sourceFolder = sourceDir;
  return filePaths.map((filePath) =>
    path.join(sourceFolder, filePath)
  );
}

let ctx = await esbuild.context({
  entryPoints: mergeFiles(["index.js"]),
  bundle: true,
  minify: process.env.NODE_ENV === "production",
  logLevel: "warning",
  treeShaking: process.env.NODE_ENV === "production",
  sourcemap: process.env.NODE_ENV === "production" ? false : "inline",
  color: true,
  outdir: outDir,
  plugins: [watchPlugin],
});

await ctx.watch();
