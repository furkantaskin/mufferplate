/** @type {import('mufferplate').MufferConfig} */
export default {
  js:{
    enable: true,
    entryPoints: ["src/js"],
    build: {
      treeShaking: false,
        signed: true,
        obfuscate: false,
        metafile: true
    }
  }, 
  sass: {
    enable: true,
    inputFile: 'src/styles/index.scss'
  },
  tailwind: {
    enable: false,
    useScss: false
  }
};
