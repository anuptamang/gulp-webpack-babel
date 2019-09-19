const gulp = require('gulp');
const webpack = require('webpack');
const browserSync = require('./browserSync');
const config = require('../config');
const webpackConfig = require('../../webpack.config');

gulp.task('webpack', ['eslint'], () => {
  webpackConfig.mode = config.getEnvironment();
  browserSync.reload();
  webpack(webpackConfig, () => {
    // if error do something here such as gutil error, function receiving (err, stats)
  });
});
