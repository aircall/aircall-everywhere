const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = () => {
  let _mode = null;
  let _output = null;

  const demoPath = path.join(__dirname, '../../demo_v2');
  const demoDistPath = path.join(__dirname, '../../demo_v2_dist');

  const _entry = {
    demo: [`${demoPath}/demo.js`],
    'aircall-everywhere': [path.join(__dirname, '../../index.js')],
  };

  const _devtool = 'source-map';

  const _target = 'web';

  const _context = __dirname;

  const _resolve = {
    modules: ['node_modules', './'],
    extensions: ['.js'],
    alias: {
      'aircall-everywhere': path.resolve(__dirname, '../../index.js'),
    },
  };

  const _devServer = {
    contentBase: demoDistPath,
    compress: true,
    port: 8081,
  };

  const _plugins = [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: true,
      template: `${demoPath}/index.html`,
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
      patterns: [{ from: `${demoPath}/images`, to: 'images/' }],
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
    path: demoDistPath,
    filename: '[name].js',
  };

  _mode = 'development';

  return {
    devServer: _devServer,
    entry: _entry,
    output: _output,
    module: _module,
    resolve: _resolve,
    devtool: _devtool,
    plugins: _plugins,
    mode: _mode,
    target: _target,
    context: _context,
    watch: true,
  };
};
