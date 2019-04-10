const path = require('path');

module.exports = {
  entry: './src/index.js',//指定打包的入口文件
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
};




