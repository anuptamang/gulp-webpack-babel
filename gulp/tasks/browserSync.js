const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const config = require('../config');

// Static server
gulp.task('serve', () =>
  browserSync.init({
    server: {
      baseDir: `./${config.dest.root}`,
      index: 'index.html',
      directory: true
    },
    files: [
      `${config.dest.root}/*.html`,
      `${config.dest.css}/*.css`,
      `${config.dest.js}/*.js`,
      `${config.dest.img}/**/*`
    ],
    logFileChanges: true,
    logLevel: 'info',
    ghost: false

    // if need to take a look from outside
    // tunnel: true

    // Append '.xip.io' to the hostname. (eg: http://192.168.0.4.xip.io:3002). useful for services such as Typekit as it allows you to configure domains such as *.xip.io in your kit settings
    // xip: true
  })
);

module.exports = browserSync;
