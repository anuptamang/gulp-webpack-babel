const gulp = require('gulp');
const sassLint = require('gulp-sass-lint');
const config = require('../config');

gulp.task('sass-lint', () => {
  gulp
    .src([
      `${config.src.sass}/**/*.{scss,sass}`,
      `!${config.src.sass}/vendors/*.scss`,
      `!${config.src.sass}/_bootstrap-custom.scss`
    ])
    .pipe(
      sassLint({
        configFile: '.sass-lint.yml'
      })
    )
    .pipe(sassLint.format());
});

// gulp.task('sass-lint:watch', ['sass-lint']);
