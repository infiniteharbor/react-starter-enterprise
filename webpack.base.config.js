// Core
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// Utils
import { devOrProd, getAliasesForDir } from './webpack.utils';

const aliases = getAliasesForDir('./app/src/');
aliases['lodash'] = __dirname + '/node_modules/lodash';
aliases['moment'] = __dirname + '/node_modules/moment';

const babelRule = {
  test: /\.jsx?$/,
  use: [ { loader: 'babel-loader' } ],
  exclude: /(node_modules|vendor)/
};

const styleRule = {
  test: /\.(s*)css$/,
  use: [].concat([
    {
      loader: 'css-loader',
      options: devOrProd(
        { importLoaders: 1, sourceMap: true },
        { sourceMap: false, discardComments: { removeAll: true }, options: { minimize: true } }
      )
    },
    {
      loader: 'sass-loader',
      options: devOrProd( { sourceMap: true }, { sourceMap: false } )
    }
  ])
};

const imagesRule = {
  test: /\.(png|jpe?g|gif)$/,
  loader: 'url-loader?name=[name].[hash].[ext]',
  options: { limit: 15 * 1024 } // files smaller than 15kb (15240 bytes)
};

const otherImagesRule = {
  test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
  loader: 'file-loader',
  options: { publicPath: '' },
  exclude: ['node_modules']
};

const typescriptRule = {
  test: /\.(ts|tsx)$/,
  exclude: /node_modules/,
  loader: 'ts-loader',
  query: {
    ignoreDiagnostics: [ 1232, 2306, 2307, 2339, 2345, 2551, 6143 ]
  }
};

const svgRule = {
  test: /node_modules(\\|\/).*.(svg)$/,
  loader: 'file-loader',
  options: { publicPath: '' }
};


module.exports = {
  devtool: devOrProd('inline-source-map', 'cheap-module-source-map'),
  context: __dirname,
  entry: {
    app: [ './app/src/main.tsx' ],
    styles: [ './app/assets/styles/main.scss' ]
  },
  resolve: {
    modules: [ 'node_modules', 'vendor', 'src' ],
    extensions: [ '.js', '.jsx', '.json', '.ts', '.tsx', '.scss', '.css' ],
    alias: aliases
  },
  output: {
    path: path.join(__dirname, 'dist/'),
    filename: devOrProd('[name].[hash].js', '[name].[chunkhash].js'),
    chunkFilename: devOrProd('[name].[hash].js', '[name].[chunkhash].js'),
    publicPath: '/'
  },
  module: {
    rules: [ babelRule, styleRule, imagesRule, otherImagesRule, typescriptRule, svgRule ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production'), VERSION: JSON.stringify(new Date()) },
      VERSION: JSON.stringify(require('./package.json').version)
    }),
    new webpack.NamedModulesPlugin(),
    new CleanWebpackPlugin(['dist', 'build'], {}),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      filename: 'index.html',
      template: './app/src/index.html.ejs',
      chunks: [ 'app', 'vendor', 'styles' ],
      chunksSortMode: 'none'
    }),
    new MiniCssExtractPlugin({ filename: '[name].[chunkhash].css', chunkFilename: '[name].[chunkhash].css' }),
    new CopyWebpackPlugin([{ from: 'app/assets/images', to: 'images' }])
  ],
  optimization: {
    noEmitOnErrors: true,
    splitChunks: {
      cacheGroups: {
        test: /[\\/]node_modules[\\/].*.js$/,
        chunks: 'initial',
        name: 'vendor',
        priority: 10,
        enforce: true
      }
    }
  },
  stats: {
    errors: true,
    errorDetails: true,
    moduleTrace: true
  }
};