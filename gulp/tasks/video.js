const gulp = require('gulp');
const config = require('../config.js');

gulp.task('video', ['clean:video']);

gulp.task('video:watch', () => {
  gulp.watch(`${config.src.video}/**/*.*`, ['video']);
});
