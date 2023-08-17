const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { copySync } = require('fs-extra');

const rootDir = path.normalize(process.argv[2] || '');
const themeDir = path.join(rootDir, 'theme');
const distDir = path.join(rootDir, 'dist');

console.log(`\x1b[96m Generating HTML bundle from PHP files. \x1b[039m`);
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const phpFiles = fs
  .readdirSync(themeDir, { withFileTypes: true })
  .filter((file) => file.isFile() && path.extname(file.name) === '.php')
  .map((file) => path.join(themeDir, file.name));

for (const phpFile of phpFiles) {
  const fileName = path.basename(phpFile, '.php');

  if (['header', 'footer', 'header-auth'].includes(fileName)) {
    continue;
  }

  const contents = fs.readFileSync(phpFile, 'utf8');
  const output = execSync(`php -f ${phpFile}`, { encoding: 'utf8' });

  const htmlFile = path.join(distDir, fileName + '.html');
  fs.writeFileSync(htmlFile, output, 'utf8');
}

const assetsDir = path.join(themeDir, 'assets');
const distAssetsDir = path.join(distDir, 'assets');
if (fs.existsSync(assetsDir)) {
  copySync(assetsDir, distAssetsDir);
}
