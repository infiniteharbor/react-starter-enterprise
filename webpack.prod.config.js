// Core
const webpack = require('webpack');
const lodashCloneDeep = require('lodash/fp/cloneDeep');
const webpackBaseConfig = require('./webpack.base.config');
const path = require('path');
const uglifyJs = require('uglify-es');
const defaultUglifyJsOptions = uglifyJs.default_options();

// Plugins
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyser').BundleAnalyzerPlugin;
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// Extend the base config and define Production level configurations
module.exports = ((baseConfig) => {
  const config = cloneDeep(baseConfig);
  
  // Compression
  const compress = defaultUglifyJsOptions.compress;
  for ( const option in compress ) {
    compress[option] = false;
  }
  compress.unused = true;
  compress.dead_code = true;

  // Additional Plugins
  config.plugins = config.plugins.concat([
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new BundleAnalyzerPlugin({ analyzerMode: 'static', reportFilename: 'bundleAnalysis.html', openAnalyzer: false }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      canPrint: true,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: [
          'default', 
          {
            discardComments: {
              removeAll: true
            }
          }
        ]
      },
    })
  ]);
  
  // Additional Optimization
  config.optimization.minimize = true;
  config.optimization.nodeEnv = 'production';
  config.optimization.minimizer = [
    new UglifyJsPlugin({
      uglifyOptions: {
        compress,
        mangle: false,
        ecma: 6,
        output: {
          ascii_only: true,
          beautify: false,
          comments: false
        }
      }
    })
  ]

  config.mode = 'production';
})(webpackBaseConfig);