const plumber = require('gulp-plumber');
const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const notify = require('gulp-notify');
const mqpacker = require('css-mqpacker');
const perfectionist = require('perfectionist');
const csso = require('postcss-csso');
const gulpif = require('gulp-if');
const cssDeclarationSorter = require('css-declaration-sorter');
const browserSync = require('./browserSync');
const config = require('../config');

const processors = [
  autoprefixer({
    cascade: false,
    browsers: ['last 2 versions', 'IE 11']
  }),
  mqpacker({
    sort: true
  })
];

gulp.task('sass', ['sass-lint'], () =>
  gulp
    .src([
      `${config.src.sass}/*.{scss,sass}`,
      `!${config.src.sass}/vendors/*.scss`,
      `!${config.src.sass}/_bootstrap-custom.scss`
    ])
    .pipe(gulpif(config.development(), sourcemaps.init()))
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(
      sass({
        outputStyle: config.getCssOutput()
      })
    )
    .pipe(
      gulpif(
        config.getCssOutput() === 'expanded',
        postcss([
          cssDeclarationSorter({ order: 'smacss' }),
          perfectionist({
            cascade: false,
            colorShorthand: false,
            indentSize: 2,
            maxSelectorLength: false,
            maxAtRuleLength: false,
            maxValueLength: false
          })
        ])
      )
    )
    .pipe(postcss(processors))
    .pipe(gulpif(config.getCssOutput() === 'compressed', postcss(csso)))
    .pipe(gulpif(config.development(), sourcemaps.write('.')))
    .pipe(gulp.dest(config.dest.css))
);

gulp.task('sass:watch', () => {
  gulp.watch(`${config.src.sass}/**/*.{scss,sass}`, ['sass']).on('change', browserSync.reload);
});
