const path = require('path');

module.exports = {
  outputDir: path.resolve(__dirname, '../server/public'),
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000'
      }
    }
  },
  chainWebpack: config => {
    config
      .entry('app')
      .clear()
      .add('./client/src/main.js')
      .end();
    config.resolve.alias
      .set('@', path.join(__dirname, './client'));
  }
};
