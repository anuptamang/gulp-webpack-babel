const gulp = require('gulp');
const config = require('../config.js');

gulp.task('fonts', ['clean:fonts'], () => {
  gulp.src(`${config.src.fonts}/**/*.*`).pipe(gulp.dest(config.dest.fonts));
});

gulp.task('fonts:watch', () => {
  gulp.watch(`${config.src.fonts}/**/*.*`, ['fonts']);
});
