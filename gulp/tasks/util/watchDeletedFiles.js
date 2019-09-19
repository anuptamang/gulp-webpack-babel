const del = require('del');
const globby = require('globby');
const showDeletedFiles = require('./message--deleted');
const showError = require('./message--error');

module.exports = (source, destination) =>
  Promise.all([globby(source), globby(destination)])
    .then(paths => {
      const srcPaths = paths[0];
      const destPaths = paths[1];
      const unusedFiles = [];
      let folderIsExist = false;

      // check for folders
      destPaths.forEach(destPath => {
        const directory = destPath.replace(/dist\//, '').replace(/images\//, '');
        const tempName = 'folder';
        let matchFolder;

        if (/^([A-Za-z\d]*\/w*)/.test(directory) && !folderIsExist) {
          directory.replace(/^([A-Za-z\d]*\/w*)/, tempName);
          matchFolder = directory.substr(0, tempName.length);
          srcPaths.push(`src/${matchFolder}`);
          destPaths.push(`dist/${matchFolder}`);
          folderIsExist = true;
        }
      });

      // todo: folder deleting

      destPaths.forEach(destPath => {
        const unusedFilesFiltered = destPath.replace(/dist/, 'src');

        if (srcPaths.indexOf(unusedFilesFiltered) === -1) {
          unusedFiles.push(destPath);
        }
      });

      return unusedFiles;
    })
    .then(unusedFiles => {
      if (!unusedFiles.length) return;

      del.sync(unusedFiles);
      showDeletedFiles(unusedFiles);
    })
    .catch(error => {
      showError(error);
    });
