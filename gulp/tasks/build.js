const gulp = require('gulp');
const runSequence = require('run-sequence');
const config = require('../config');

const build = cb => runSequence('clear', 'copy', 'imagemin', 'webpack', 'sass', 'serve', cb);

gulp.task('build', cb => {
  config.setEnvironment('development');
  config.setCssOutput('expanded');
  config.showEnvironment();
  build(cb);
});

gulp.task('dist', cb => {
  config.setEnvironment('production');
  config.setCssOutput('expanded');
  config.showEnvironment();
  build(cb);
});

gulp.task('compact', cb => {
  config.setEnvironment('production');
  config.setCssOutput('compact');
  config.showEnvironment();
  build(cb);
});

gulp.task('compressed', cb => {
  config.setEnvironment('production');
  config.setCssOutput('compressed');
  config.showEnvironment();
  build(cb);
});

gulp.task('nested', cb => {
  config.setEnvironment('production');
  config.setCssOutput('nested');
  config.showEnvironment();
  build(cb);
});
