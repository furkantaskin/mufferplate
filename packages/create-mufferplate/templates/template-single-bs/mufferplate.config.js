/** @type {import('mufferplate').UserConfig} */
export default {
  js: {
    enable: true,
  },
  sass: {
    enable: true,
    dev: {
      inputFile: 'src/css/main.scss',
      depsDir: 'src/css/**/*.scss',
    },
    build: {
      inputFile: 'src/css/main.scss',
      depsDir: 'src/css/**/*.scss',
    }
  },
  tailwind: {
    enable: false,
  },
};
