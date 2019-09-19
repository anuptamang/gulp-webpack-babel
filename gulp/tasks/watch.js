const gulp = require('gulp');

gulp.task('watch', [
  'copy:watch',
  'imagemin:watch',
  'fonts:watch',
  'html:watch',
  'ajaxIncludes:watch',
  'video:watch',
  'sass:watch'
]);
