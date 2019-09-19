const chalk = require('chalk');

module.exports = files => {
  // eslint-disable-next-line no-console
  console.log(chalk.bgCyan.black.bold(' Deleted: '), chalk.magenta.bold(files.join('\n')));
};
