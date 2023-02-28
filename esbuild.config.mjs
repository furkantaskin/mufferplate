import esbuild from 'esbuild';
import path from 'path';

let startTime;

const watchPlugin = {
  name: 'watch-plugin',
  setup(build) {
    build.onStart(() => {
      startTime = new Date().getTime();
      console.log(`Build started.`);
    });
    build.onEnd((result) => {
      if (result.errors.length > 0) {
        console.log('Build failed. Error: ', result.errors[0].text);
      } else {
        console.log(
          `Build completed in ${new Date().getTime() - startTime}ms.`
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
  minify: true,
  treeShaking: true,
  sourcemap: 'external',
  outdir: 'dist',
  plugins: [watchPlugin],
});

await ctx.watch();
