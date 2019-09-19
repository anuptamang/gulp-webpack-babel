const gulp = require('gulp');
const htmlhint = require('gulp-htmlhint');
const config = require('../config');

gulp.task('htmlhint', () => {
  gulp
    .src(`${config.src.root}/*.html`)
    .pipe(htmlhint('.htmlhintrc'))
    .pipe(htmlhint.reporter());
});
