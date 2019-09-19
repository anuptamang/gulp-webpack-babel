const chalk = require('chalk');
const paths = require('./tasks/util/paths');

const prod = 'production';
const dev = 'development';
let env = process.env.NODE_ENV;

const config = {
  environment: 'development',
  cssOutput: 'expanded',
  src: {
    root: paths.src.root,
    sass: paths.src.sass,
    js: paths.src.js,
    images: paths.src.images,
    fonts: paths.src.fonts,
    video: paths.src.video,
    ajaxIncludes: paths.src.ajaxIncludes
  },
  dest: {
    root: paths.dest.root,
    css: paths.dest.css,
    js: paths.dest.js,
    images: paths.dest.images,
    fonts: paths.dest.fonts,
    video: paths.dest.video,
    ajaxIncludes: paths.dest.ajaxIncludes
  },
  setCssOutput: output => {
    this.cssOutput = output;
  },
  getCssOutput: () => this.cssOutput,
  setEnvironment: environment => {
    this.environment = environment;
    env = environment;
  },
  getEnvironment: () => this.environment,
  development: () => this.environment === dev,
  production: () => this.environment === prod,
  showEnvironment: () => {
    if (env === dev) {
      /* eslint-disable no-console */
      console.log(chalk.red('------------------------------------------'));
      console.log(chalk.yellow('Environment: ') + chalk.white.bgRed.bold(env));
      console.log(chalk.red('------------------------------------------'));
    }

    if (env === prod) {
      console.log(chalk.green('------------------------------------------'));
      console.log(chalk.green('Environment: ') + chalk.white.bgGreen.bold(`${env}--${this.cssOutput}`));
      console.log(chalk.green('------------------------------------------'));
    }
  }
};

module.exports = config;
