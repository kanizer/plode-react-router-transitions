const webpack           = require('webpack');
const path              = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const DEV = process.env.NODE_ENV === 'dev';

module.exports = {
  debug: true,
  devtool: 'source-map',
  entry: {
    main: './src/scripts/index.js'
  },
  output: {
    path: path.join(__dirname, './build'),
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
          plugins: ['babel-plugin-transform-object-assign']
        },
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'autoprefixer', 'resolve-url', 'sass?sourceMap']
      },
      {
        test: /\.jpg$/,
        loader: 'file-loader'
      },
      {
        test: /\.html$/,
        loader: 'raw-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: DEV,
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'dev') }
    }),
    new CopyWebpackPlugin([
      { from: 'src/index.html' },
      { from: 'src/assets', to: 'assets' }
    ], {
      ignore: []
    })
  ]
};
