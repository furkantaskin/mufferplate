const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const purgecss = require('gulp-purgecss');
const minimist = require('minimist');
const sourcemaps = require('gulp-sourcemaps');

const args = minimist(process.argv.slice(2));
const fileName = args.file.split('/').at(-1).split('.')[0];
let reference = '';
if (fileName === 'cart') {
  reference = 'sepet.php';
} else if (fileName === 'proddetail') {
  reference = 'urundetay.php';
} else if (fileName === 'prods') {
  reference = 'urunler.php';
} else if (fileName === 'home') {
  reference = 'index.php';
}

gulp.task('compile-sass', function () {
  console.log(args, fileName);
  return gulp
    .src(args.file)
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('theme/assets/css'));
});

gulp.task(
  'optimize-css',
  gulp.series('compile-sass', function () {
    console.log('Optimizing file: ', fileName + '.css');
    return gulp
      .src(`theme/assets/css/${fileName}.css`)
      .pipe(sourcemaps.init())
      .pipe(cssnano())
      .pipe(
        autoprefixer({
          cascade: false,
        })
      )
      .pipe(gulp.dest('theme/assets/css'));
  })
);

gulp.task(
  'purge-css',
  gulp.series('optimize-css', function () {
    console.log('Purging file: ', fileName + '.css');
    return gulp
      .src(`theme/assets/css/${fileName}.css`)
      .pipe(
        purgecss({
          content: [
            `theme/${reference}`,
            'theme/header.php',
            'theme/footer.php',
            `theme/assets/js/${fileName}.js`,
          ],
        })
      )
      .pipe(gulp.dest('theme/assets/css'));
  })
);

gulp.task(
  'default',
  gulp.series('purge-css', function (done) {
    done();
  })
);
