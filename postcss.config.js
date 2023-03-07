import fs from 'fs';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import purgecss from '@fullhuman/postcss-purgecss';

const themeFolder = './theme';

const cssFiles = fs.readdirSync(`${themeFolder}/assets/css`);
const templates = fs.readdirSync(`${themeFolder}`);

const content = {};
console.log('\x1b[93m Processing CSS files: \x1b[39m');
cssFiles.forEach((cssFile) => {
  console.log(`\x1b[35m ${cssFile} \x1b[39m`);
  const cssFilename = cssFile.replace('.css', '');
  content[cssFile] = templates.filter((template) => {
    return template.endsWith('php') && template.includes(cssFilename);
  });
  content[cssFile] = [
    `${themeFolder}/header.php`,
    `${themeFolder}/footer.php`,
    ...content[cssFile].map(
      (template) => `${themeFolder}/${template}`,
      `${themeFolder}/assets/js/${cssFilename}.js`
    ),
  ];
});

const postcssConfig = {
  plugins: [
    autoprefixer,
    cssnano({
      preset: 'default',
    }),
    purgecss({
      content: Object.values(content).flat(),
      safelist: [],
    }),
  ],
};
export default postcssConfig;
