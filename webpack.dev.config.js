
const webpackBaseConfig = require('./webpack.base.config');

// Extend the base config and define Development level configurations
module.exports = ((baseConfig) => {
  baseConfig['devServer'] = {
    contentBase: 'src',
    compress: true,
    hot: true,
    port: 4200,
    stats: 'minimal',
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        secure: false
      }
    }
  }
  baseConfig.mode = 'development';
})(webpackBaseConfig);