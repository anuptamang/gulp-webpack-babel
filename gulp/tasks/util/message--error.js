const chalk = require('chalk');

module.exports = error => {
  // eslint-disable-next-line no-console
  console.log(chalk.bgRed.white.bold(error));
};
