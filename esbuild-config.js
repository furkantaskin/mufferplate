import esbuild from 'esbuild';
import path from 'path';
import { config } from 'dotenv';

config();

let startTime;

console.log(
  `\x1b[96m Running under ${process.env.NODE_ENV} build. Don't forget to change NODE_ENV to production for final bundling. \x1b[039m`
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
          })}]  `
        );
      }
    });
  },
};

function mergeFiles(filePaths) {
  const sourceFolder = 'src/pages';
  return filePaths.map((filePath) =>
    path.join(sourceFolder, filePath)
  );
}

let ctx = await esbuild.context({
  entryPoints: mergeFiles(['index.js']),
  bundle: true,
  minify: process.env.NODE_ENV === 'production' ? true : false,
  logLevel: 'warning',
  treeShaking: true,
  sourcemap: process.env.NODE_ENV === 'production' ? false : 'inline',
  color: true,
  outdir: 'theme/assets/js',
  plugins: [watchPlugin],
});

await ctx.watch();
