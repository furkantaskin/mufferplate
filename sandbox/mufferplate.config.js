/** @type {import('mufferplate').MufferConfig} */
export default {
  js: {
    enable: true,
    entryPoints: [ 'target/src/js' ],
    outdir: 'target/theme/assets/js',
    dev: {
      entryPoints: [ 'target/src/js' ],
      bundle: true,
      logLevel: 'warning',
      splitting: false,
      format: 'iife',
      chunkNames: 'chunks/[name]-[hash]',
      treeShaking: false,
      metafile: false,
      sourcemap: 'inline',
      minify: false,
      legalComments: 'none'
    },
    build: {
      entryPoints: [ 'target/src/js' ],
      bundle: true,
      logLevel: 'info',
      splitting: false,
      format: 'iife',
      chunkNames: 'chunks/[name]-[hash]',
      treeShaking: true,
      metafile: false,
      sourcemap: false,
      minify: true,
      legalComments: 'eof',
      signed: true,
      obfuscate: false
    }
  },
  sass: {
    enable: true,
    inputFile: 'target/src/css/main.scss',
    outputFile: 'target/theme/assets/css/main.css',
    depsDir: [ 'target/src/css/**/*.scss' ],
    dev: {
      inputFile: 'target/src/css/main.scss',
      outputFile: 'target/theme/assets/css/main.css',
      depsDir: [ 'target/src/css/**/*.scss' ],
      polling: 10,
      watchDeps: true,
      sourcemap: true,
      style: 'expanded',
      charset: false,
      verbose: false,
      signed: false
    },
    build: {
      inputFile: 'target/src/css/main.scss',
      outputFile: 'target/theme/assets/css/main.css',
      depsDir: [ 'target/src/css/**/*.scss' ],
      polling: 10,
      watchDeps: true,
      sourcemap: false,
      style: 'compressed',
      charset: false,
      verbose: false,
      signed: true
    }
  },
  tailwind: {
    enable: false,
    postConfigPath: 'mf_config/postcss.config.js',
    twInputFile: 'target/src/css/app.css',
    twOutputFile: 'target/theme/assets/css/app.css',
    useScss: false,
    sass: {
      inputFile: 'target/src/css/main.scss',
      outputFile: 'target/src/css/libs.css',
      depsDir: [ 'target/src/css/**/*.scss' ]
    }
  },
  purge: {
    file: 'target/theme/assets/css/main.css',
    output: false,
    purgeCss: {
      content: [
        './target/theme/*.php',
        './target/theme/template/*.php',
        './target/theme/assets/js/*.js',
        './inc/*.php'
      ],
      safelist: {
        standard: [ 'swiper-pagination-bullet', /svg$/ ],
        deep: [ /purgeignore$/ ]
      },
      fontFace: false,
      keyframes: false,
      defaultExtractor: (content) => content.match(/[\w-/:.-]+/g) || []
    },
    desktopFirst: true
  }
}