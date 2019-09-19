const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task('linters', () => runSequence('htmlhint', 'sass-lint', 'eslint'));
