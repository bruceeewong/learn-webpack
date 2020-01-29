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
      },
      {
        // CSS解析配置
        test: /\.css$/,
        use: [
          'style-loader', // 将css写到head的style中
          'css-loader', // 解析css语法
        ]
      },
      {
        // SCSS解析配置
        test: /\.scss$/,
        use: [
          'style-loader', // 将css写到head的style中
          {
            loader: 'css-loader',
            options: {
              modules: true, // 开启css module
              importLoaders: 2 // 使scss文件中的@import的文件也走下面两个loaders
              // 0 => no loaders (default);
              // 1 => postcss-loader;
              // 2 => postcss-loader, sass-loade
            }
          }, // 解析css语法
          'postcss-loader', // 预处理器
          'sass-loader', // 解析scss语法
        ]
      },
    ]
  }
};
