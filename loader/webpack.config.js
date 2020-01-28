const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.jpg$/,
        use: {
          loader: 'file-loader', // 文件处理loader
          options: {
            // placeholder 占位符
            name: '[name]_[hash].[ext]', // 导出的名字：原名+原扩展名
            outputPath: 'images/'
          }
        }
      }
    ]
  }
};
