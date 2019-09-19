const gulp = require('gulp');
const del = require('del');
const showDeletedFiles = require('./util/message--deleted');
const config = require('../config');

gulp.task('clear', () =>
  del(config.dest.root).then(paths => {
    showDeletedFiles(paths);
  })
);
