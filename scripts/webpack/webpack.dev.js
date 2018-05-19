/*const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const extractStyles = new ExtractTextPlugin('main.[md5:contenthash:hex:20].css');

module.exports = () => {
  const NODE_ENV = process.env.NODE_ENV;
  const NGROK_WEB = process.env.NGROK_WEB;
  const CALLER_VERSION = process.env.CALLER_VERSION;

  let _mode = null;
  let _output = null;

  const _entry = ['../src/javascripts/index.js', '../src/stylesheets/main.scss'];

  const _devtool = 'source-map';

  const _target = 'web';

  const _context = __dirname;

  const _resolve = {
    modules: ['node_modules', path.resolve(__dirname, '../src/javascripts')],
    extensions: ['.js', '.json', '.jsx', '.scss']
  };

  const _plugins = [
    extractStyles,
    new HtmlWebpackPlugin({
      title: 'Aircall Caller',
      template: '../src/templates/layout.html'
    }),
    new webpack.DefinePlugin({
      ENV: JSON.stringify(NODE_ENV),
      API_URL: JSON.stringify(NGROK_WEB),
      VERSION: JSON.stringify(CALLER_VERSION)
    }),
    new CopyWebpackPlugin([
      {
        from: '../src/assets',
        to: 'assets'
      }
    ])
  ];

  const _module = {
    rules: [
      {
        test: /\.jsx?$/,
        include: [path.resolve(__dirname, '../src')],
        enforce: 'pre',
        enforce: 'post',

        loader: 'babel-loader',

        options: {
          presets: ['es2015']
        }
      },
      {
        test: /\.scss$/,
        use: extractStyles.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?sourceMap&root=' + path.resolve(__dirname, '../dist/assets'),
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                includePaths: ['node_modules']
              }
            }
          ]
        })
      },
      {
        test: /\.(gif|jpe?g|png|svg|woff2?|ttf|eot)$/,
        loader: 'url-loader?limit=10000&name=[name].[ext]'
      }
    ]
  };

  if (NODE_ENV === 'development') {
    _output = {
      path: path.resolve(__dirname, '../dist'),
      filename: 'main.js'
    };

    _mode = 'development';
  } else {
    _output = {
      path: path.resolve(__dirname, '../dist'),
      filename: 'main.[hash].js'
    };

    _mode = 'production';
  }

  return {
    entry: _entry,
    output: _output,
    module: _module,
    resolve: _resolve,
    devtool: _devtool,
    plugins: _plugins,
    mode: _mode,
    target: _target,
    context: _context
  };
};
*/
