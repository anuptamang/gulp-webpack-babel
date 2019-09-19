const ErrorsPlugin = require('friendly-errors-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TimeFixPlugin = require('time-fix-plugin');
const notifier = require('node-notifier');
const webpack = require('webpack');
const gulpif = require('gulp-if');
const path = require('path');
const config = require('./gulp/config');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const pluginsConfiguration = {
  ProvidePlugin: {
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery'
  },
  SourceMapDevToolPlugin: {
    test: [/\.js$/],
    filename: 'app.js.map',
    exclude: path.resolve(__dirname, 'node_modules'),
    append: '//# sourceMappingURL=[url]',
    moduleFilenameTemplate: 'webpack://[namespace]/[resource-path]?[loaders]',
    fallbackModuleFilenameTemplate: '[resource-path]'
  },
  ErrorsPlugin: {
    onErrors: (severity, errors) => {
      if (severity !== 'error') {
        return;
      }
      const error = errors[0];
      notifier.notify({
        title: 'Webpack error',
        message: `${severity}:${error.name}`,
        subtitle: error.file || ''
      });
    },
    clearConsole: false
  }
};

const ASSET_PATH = 'js/';

const webpackConfig = {
  mode: 'development',
  context: path.join(__dirname, config.src.js),
  entry: {
    app: ['./app.js']
  },
  output: {
    path: path.resolve(__dirname, config.dest.js),
    filename: '[name].js',
    chunkFilename: '[name].[contenthash].bundle.js',
    publicPath: ASSET_PATH,
  },
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  plugins: config.production()
    ? [
        new TimeFixPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.ProvidePlugin(pluginsConfiguration.ProvidePlugin),
        new ErrorsPlugin(pluginsConfiguration.ErrorsPlugin)
      ]
    : [
        new TimeFixPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.ProvidePlugin(pluginsConfiguration.ProvidePlugin),
        new webpack.SourceMapDevToolPlugin(pluginsConfiguration.SourceMapDevToolPlugin),
        new ErrorsPlugin(pluginsConfiguration.ErrorsPlugin)
      ],
  resolve: {
    extensions: ['.js'],
    alias: {
      jquery: path.resolve('node_modules', 'jquery'),
    }
  },
  optimization: gulpif(
    config.production(),
    {
      minimizer: [
        new UglifyJsPlugin({
          sourceMap: false,
          uglifyOptions: {
            compress: {
              inline: false,
              warnings: false,
              drop_console: true,
              unsafe: true
            }
          }
        })
      ]
    },
    {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true
        })
      ]
    }
  ),
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'prettier-loader',
        exclude: /node_modules/,
        options: {
          parser: 'flow'
        }
      }
    ]
  }
};

module.exports = webpackConfig;
