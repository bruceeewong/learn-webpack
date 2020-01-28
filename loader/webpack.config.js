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
        // 图片文件的打包配置
        test: /\.(png|jpe?g|gif)$/i,
        use: {
          loader: 'url-loader', // 文件处理loader
          options: {
            // placeholder 占位符
            name: '[name]_[hash].[ext]', // 导出的名字：原名+原扩展名
            outputPath: 'images/',
            limit: 20480 // 如果小于20kb(2048字节)，以base64放到js中；否则以图片文件打包到目录中。
          }
        }
      }
    ]
  }
};
