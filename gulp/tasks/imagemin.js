const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');
const plumber = require('gulp-plumber');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');
const imageminPngquant = require('imagemin-pngquant');
const config = require('../config');

gulp.task('imagemin', ['clean:images'], () => {
  gulp
    .src(`${config.src.images}/**/*.*`)
    .pipe(changed(config.dest.images))
    .pipe(
      plumber({
        handleError: err => {
          // eslint-disable-next-line no-console
          console.log(err);
          this.emit('end');
        }
      })
    )
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imageminJpegRecompress({
          progressive: true,
          max: 80,
          min: 70
        }),
        imageminPngquant({ quality: '80' }),
        imagemin.svgo({ plugins: [{ removeViewBox: true }] })
      ])
    )
    .pipe(gulp.dest(config.dest.images));
});

gulp.task('imagemin:watch', () => {
  gulp.watch(`${config.src.images}/**/*`, ['imagemin']);
});
