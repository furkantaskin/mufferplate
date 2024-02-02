/** @type {import('mufferplate').UserConfig} */
export default {
  js: {
    enable: true,
  },
  sass: {
    enable: true,
    dev: {
      inputFile: 'src/css/main.scss',
    },
    build: {
      inputFile: 'src/css/main.scss',
    }
  },
  tailwind: {
    enable: false,
  },
};
