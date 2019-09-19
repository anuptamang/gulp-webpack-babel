const gulp = require('gulp');
const eslint = require('gulp-eslint');
const config = require('../config.js');

gulp.task('eslint', () => {
  gulp
    .src([
      `${config.src.js}/**/*.js`,
      '!node_modules/**',
      `!${config.src.js}/ES5/*.js`,
      `!${config.src.js}/vendors/*.js`
    ])
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('eslint:watch', () => {
  gulp.watch(`${config.src.js}/**/*.js`, ['eslint']);
});
