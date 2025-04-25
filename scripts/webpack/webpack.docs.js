const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = () => {
  let _mode = null;
  let _output = null;

  const _entry = {
    demo: [path.join(__dirname, '../../demo/demo.js')],
    // Uses the published version of the library 1.8.0 (phone)
    // 'aircall-everywhere': [path.join(__dirname, '../../index.js')],
  };

  const _devtool = 'source-map';

  const _target = 'web';

  const _context = __dirname;

  const _resolve = {
    modules: ['node_modules', './'],
    extensions: ['.js'],
  };

  const _plugins = [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: true,
      template: path.join(__dirname, '../../demo/index.html'),
      chunks: ['demo'],
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: path.join(__dirname, '../../demo/images'), to: 'images/' }],
    }),
  ];

  const _module = {
    rules: [
      {
        test: /\.jsx?$/,
        include: [path.resolve(__dirname, '../src')],
        enforce: 'post',

        loader: 'babel-loader',

        options: {
          presets: ['@babel/preset-env'],
        },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'sass-loader', // compiles Sass to CSS
            options: {
              implementation: require('sass'), // Use Dart Sass instead of Node Sass
            },
          },
        ],
      },
    ],
  };

  _output = {
    path: path.resolve(__dirname, '../../demo_dist'),
    filename: '[name].js',
  };

  _mode = 'development';

  return {
    entry: _entry,
    output: _output,
    module: _module,
    resolve: _resolve,
    devtool: _devtool,
    plugins: _plugins,
    mode: _mode,
    target: _target,
    context: _context,
  };
};
