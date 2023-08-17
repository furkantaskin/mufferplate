import esbuild from 'esbuild';
import path from 'path';
import fs from 'fs';
import { config } from 'dotenv';

let getEnv = null;
const sourceDir = 'src/js/pages';
const outDir = 'theme/assets/js';
let startTime;

const scssTemplate = `@use '../main' as m;
@use '../layout/header';
@use '../layout/footer';
`;

const jsTemplate = `import { mobileMenu, setTitle } from '../lib/common';

mobileMenu();
setTitle();
`;

config();


process.argv.forEach((val) => {
  if (val === 'production') {
    getEnv = val;
  } else {
    getEnv = process.env.NODE_ENV || 'development';
  }
});


if (getEnv !== undefined) {
  console.log(`\x1b[33m Running under ${getEnv} build. \x1b[039m`);
} else {
  console.log(
    `\x1b[31m WARNING! No environment found. Running under development build as default. You can create .env file or manually declare NODE_ENV \x1b[039m`
  );
}



const watchPlugin = {
  name: 'watch-plugin',
  setup(build) {
    build.onStart(() => {
      startTime = new Date().getTime();
      console.log(`\x1b[96m Build started. \x1b[039m`);
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

function generateFiles() {
  const phpDir = 'theme';
  const jsDir = 'src/js/pages';
  const scssDir = 'src/css/pages';
  const phpFiles = fs
    .readdirSync(phpDir)
    .filter(
      (file) =>
        path.extname(file) === '.php' &&
        !['header.php', 'footer.php', 'header-page.php'].includes(
          file
        )
    );

  phpFiles.forEach((file) => {
    const jsFilePath = path.join(
      jsDir,
      path.basename(file, '.php') + '.js'
    );
    const scssFilePath = path.join(
      scssDir,
      path.basename(file, '.php') + '.scss'
    );

    if (!fs.existsSync(jsFilePath)) {
      console.log(`\x1b[96m Generating JS file ${jsFilePath}. \x1b[039m`);
      fs.writeFileSync(jsFilePath, jsTemplate);
    }
    if (!fs.existsSync(scssFilePath)) {
      console.log(`\x1b[96m Generating SCSS file ${scssFilePath}. \x1b[039m`);
      fs.writeFileSync(scssFilePath, scssTemplate);
    }
  });
}

function mergeFiles(filePaths = null) {
  try {
    let files;
    if (filePaths !== null) {
      files = filePaths;
    } else {
      if (getEnv !== 'production') {
        generateFiles();
      }
      files = fs.readdirSync(sourceDir);
      files = files.filter((file) => path.extname(file) === '.js');
    }

    const newMap = files.map((filePath) =>
      path.join(sourceDir, filePath)
    );
    return newMap;
  } catch (err) {
    console.log('Error getting directory information. Reason:', err);
    return null;
  }
}

const options = {
  entryPoints: mergeFiles(),
  bundle: true,
  minify: getEnv === 'production',
  logLevel: 'warning',
  treeShaking: getEnv === 'production',
  sourcemap: getEnv === 'production' ? false : 'inline',
  color: true,
  outdir: outDir,
  plugins: [watchPlugin],
};


if (getEnv !== 'production') {
  let ctx = await esbuild.context(options);
  ctx.watch();
} else {
  await esbuild.build(options);
}
