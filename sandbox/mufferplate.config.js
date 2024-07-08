/** @type {import('mufferplate').MufferConfig} */
export default {
  js: {
    enable: true,
    entryPoints: [ 'src/js' ],
    outdir: 'theme/assets/js',
    dev: {
      entryPoints: [ 'src/js' ],
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
      entryPoints: [ 'src/js' ],
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
    inputFile: 'src/css/scss/main.scss',
    outputFile: 'theme/assets/css/main.css',
    depsDir: [ 'src/css/scss/**/*.scss' ],
    dev: {
      inputFile: 'src/css/scss/main.scss',
      outputFile: 'theme/assets/css/main.css',
      depsDir: [ 'src/css/scss/**/*.scss' ],
      polling: 10,
      watchDeps: true,
      sourcemap: true,
      style: 'expanded',
      charset: false,
      verbose: false,
      signed: false
    },
    build: {
      inputFile: 'src/css/scss/main.scss',
      outputFile: 'theme/assets/css/main.css',
      depsDir: [ 'src/css/scss/**/*.scss' ],
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
    twInputFile: 'src/css/app.css',
    twOutputFile: 'theme/assets/css/app.css',
    useScss: false,
    sass: {
      inputFile: 'src/css/scss/main.scss',
      outputFile: 'src/css/libs.css',
      depsDir: [ 'src/css/scss/**/*.scss' ]
    }
  },
  purge: {
    file: 'theme/assets/css/main.css',
    output: false,
    purgeCss: {
      content: [
        './theme/*.php',
        './theme/template/*.php',
        './theme/assets/js/*.js',
        './inc/*.php'
      ],
      safelist: [ 'swiper-pagination-bullet', /svg$/ ],
      fontFace: false,
      keyframes: false,
      defaultExtractor: (content) => content.match(/[w-/:.-]+/g) || []
    },
    desktopFirst: true
  }
}