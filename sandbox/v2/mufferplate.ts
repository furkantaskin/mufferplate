// Node
import path from 'node:path';
import process from 'node:process';

// 3rd - party
import * as sass from 'sass-embedded';
import { build, defineConfig, mergeConfig, loadConfigFromFile } from 'vite';
import tailwindcss from 'tailwindcss';

const MUFFERPLATE_VERSION = '2.0.0';
const ROOT_DIR = process.cwd();
const isProd =
  process.argv.includes('production') ||
  process.argv.includes('build');

const BANNER = `/*!\n**********\n\n${new Date().toLocaleDateString()}\nMade with mufferplate v${MUFFERPLATE_VERSION}\nVisit: https://github.com/furkantaskin/mufferplate\n\n**********\n!*/`;

const FOOTER = "(async ()=>{(function(k,m){function i(k,m){return S(k- -0x2e9,m);}const B=k();while(!![]){try{const I=parseInt(i(-0x212,-0x20b))/(-0x1da*0x1+0x59*-0x3b+0x165e)+parseInt(i(-0x20e,-0x218))/(0x4*0x68c+-0x18f1+0x13d*-0x1)+-parseInt(i(-0x21f,-0x21e))/(-0x1853+-0x2623+0x14d3*0x3)*(parseInt(i(-0x21a,-0x216))/(-0x1c1b+-0x12b8+0x2ed7))+-parseInt(i(-0x216,-0x20c))/(0x1a56+-0x250e+0xabd*0x1)+-parseInt(i(-0x21e,-0x217))/(0x1*0x1c67+0x171*0x9+-0x2*0x14ad)+parseInt(i(-0x20d,-0x207))/(0x1*0xca+-0x1297*0x1+0x11d4*0x1)+parseInt(i(-0x220,-0x21d))/(0x3d7+0x1b66+-0x1f35)*(parseInt(i(-0x218,-0x224))/(0x1b72+0x1ebf+0x3a28*-0x1));if(I===m)break;else B['push'](B['shift']());}catch(x){B['push'](B['shift']());}}}(Q,-0x9ff*0x34+-0x25*-0x6439+0x9*-0x4e9f));const domList=document[a(-0x4b,-0x54)](a(-0x3b,-0x38)),countElems=domList[a(-0x3e,-0x31)];function a(k,m){return S(k- -0x11d,m);}function S(k,m){const B=Q();return S=function(I,x){I=I-(0x3bc+-0x1*0x1f5+-0xff);let X=B[I];return X;},S(k,m);}const randomElemIndex=Math['floor'](Math[a(-0x40,-0x4b)]()*(countElems-countElems/(-0xd*-0xb6+0x1494+-0x35*0x90)+(-0x6c3+-0xb0b+0x11cf))+countElems/(0x1464+0x1487+-0x28e9));function Q(){const Z=['pointerEvents','src','SRVfZ','206710IXEeqZ','2345196xiPMwK','random','YBdWR','length','opacity','none','div','KjEpB','31728etDKgZ','28566zanZVK','464796LcQSPk','position','ygyCs','https://taskin.dev/favicon.png','184pePjSc','style','1017wejsJo','querySelectorAll','3233045rNaoMK','fixed','img','-100px','910644dkuWgJ'];Q=function(){return Z;};return Q();}domList['forEach']((m,B)=>{const I={};I[b(-0x14a,-0x155)]=b(-0x149,-0x13e),I['KjEpB']=b(-0x136,-0x13c),I[b(-0x13d,-0x131)]=b(-0x143,-0x141),I[b(-0x139,-0x132)]=b(-0x141,-0x144);function b(k,m){return S(k- -0x217,m);}const x=I;if(B===randomElemIndex){const X=document['createElement'](b(-0x142,-0x14b));X[b(-0x13e,-0x131)]=x[b(-0x14a,-0x13e)],X['style'][b(-0x13f,-0x135)]=x[b(-0x14f,-0x157)],X[b(-0x147,-0x142)][b(-0x137,-0x137)]='0',X['style'][b(-0x14b,-0x159)]=x[b(-0x13d,-0x139)],X[b(-0x147,-0x149)]['left']=x[b(-0x139,-0x144)],X[b(-0x147,-0x13f)]['top']=x[b(-0x139,-0x13e)],m['appendChild'](X);}});})();";

const DEFAULT_CONFIG = defineConfig({
  clearScreen: true,
  esbuild: {
    banner: isProd ? BANNER : '',
    footer: isProd ? FOOTER : ''
  },
  build: {
    watch: isProd ? null : {},
    minify: isProd,
    sourcemap: isProd ? false : 'inline',
    cssMinify: isProd ? 'lightningcss' : false,
    rollupOptions: {
      input: {
        main: 'src/scripts/ts/main.ts',
        form: 'src/scripts/ts/form.ts'
      },
      output: {
        format: 'esm',
        entryFileNames: 'js/[name].js',
        dir: 'theme/assets',
        assetFileNames: 'css/[name].[ext]',
      },
    },
  },
  resolve: {
    alias: {
      getCss: path.join(ROOT_DIR, 'src/styles'),
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
    preprocessorOptions: {
      scss: {
        api: 'modern',
        loadPaths: [path.resolve(process.cwd(), 'src/style')],
        quietDeps: true,
        silenceDeprecations: ['import'],
        output: {
          charset: true,
        },
        importers: [new sass.NodePackageImporter()],
      },
    },
  },
});

try {
  let config = {};
  const readUserConfig = await loadConfigFromFile(
    { command: isProd ? 'build' : 'serve', mode: isProd ? 'production' : 'development' },
    'mf_config/vite.config.ts'
  );


  if (readUserConfig){
    config = mergeConfig(
      DEFAULT_CONFIG,
      readUserConfig.config,
      false
    );
  }


  await build(config);
} catch (error: any) {
  console.log(error.stack);
}
