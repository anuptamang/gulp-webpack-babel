const gulp = require('gulp');
const deleteUnused = require('./util/watchDeletedFiles');
const config = require('../config');

gulp.task('clean:rootfiles', () => {
  deleteUnused(`${config.src.root}/*.{html}`, `${config.dest.root}/*.{html}`);
});

gulp.task('clean:fonts', () => {
  deleteUnused(`${config.src.fonts}/**/*`, `${config.dest.fonts}/**/*`);
});

gulp.task('clean:images', () => {
  deleteUnused(`${config.src.images}/**/*`, `${config.dest.images}/**/*`);
});

gulp.task('clean:video', () => {
  deleteUnused(`${config.src.video}/**/*.*`, `${config.dest.video}/**/*.*`);
});

gulp.task('clean:ajaxIncludes', () => {
  deleteUnused(`${config.src.ajaxIncludes}/**/*.*`, `${config.dest.ajaxIncludes}/**/*.*`);
});

gulp.task('clean:watch', ['clean']);

gulp.task('clean', ['clean:images', 'clean:rootfiles', 'clean:fonts', 'clean:video', 'clean:ajaxIncludes']);
