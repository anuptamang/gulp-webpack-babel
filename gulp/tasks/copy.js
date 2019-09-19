const gulp = require('gulp');
const changed = require('gulp-changed');
const config = require('../config');

gulp.task('copy:fonts', () => {
  gulp
    .src(`${config.src.fonts}/**/*.{ttf,svg,eot,woff,woff2}`)
    .pipe(changed(config.dest.fonts))
    .pipe(gulp.dest(config.dest.fonts));
});

gulp.task('copy:images', () => {
  gulp
    .src(`${config.src.images}/**/*.{jpg,png,jpeg,svg,gif}`)
    .pipe(changed(config.dest.images))
    .pipe(gulp.dest(config.dest.images));
});

gulp.task('copy:ajaxIncludes', () => {
  gulp
    .src(`${config.src.ajaxIncludes}/*.*`)
    .pipe(changed(config.dest.ajaxIncludes))
    .pipe(gulp.dest(config.dest.ajaxIncludes));
});

gulp.task('copy:rootfiles', () => {
  gulp
    .src(`${config.src.root}/*.*`)
    .pipe(changed(config.dest.root))
    .pipe(gulp.dest(config.dest.root));
});

gulp.task('copy:video', () => {
  gulp
    .src(`${config.src.video}/**/*.*`)
    .pipe(changed(config.dest.video))
    .pipe(gulp.dest(config.dest.video));
});

gulp.task('copy', ['copy:images', 'copy:rootfiles', 'copy:fonts', 'copy:video', 'copy:ajaxIncludes']);

gulp.task('copy:watch', () => {
  gulp.watch(`${config.src.images}/**/*.{jpg,png,jpeg,svg,gif}`, ['copy:images']);
  gulp.watch(`${config.src.fonts}/**/*.{ttf,svg,eot,woff,woff2}`, ['copy:fonts']);
  gulp.watch(`${config.src.ajaxIncludes}/*.*`, ['copy:ajaxIncludes']);
  gulp.watch(`${config.src.root}/*.*`, ['copy:rootfiles']);
  gulp.watch(`${config.src.video}/**/*.*`, ['copy:video']);
});
