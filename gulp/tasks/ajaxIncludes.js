const gulp = require('gulp');
const config = require('../config.js');

gulp.task('ajaxIncludes', ['clean:ajaxIncludes'], () =>
  gulp.src(`${config.src.ajaxIncludes}/**/*.*`).pipe(gulp.dest(config.dest.ajaxIncludes))
);

gulp.task('ajaxIncludes:watch', () => {
  gulp.watch(`${config.src.ajaxIncludes}/*.*`, ['ajaxIncludes']);
});
