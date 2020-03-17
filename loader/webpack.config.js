const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js',
    sub: './src/sub.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'http://cdn.com.cn'
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
            outputPath: 'images/', // 存放目录，相对于dist
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
      {
        // 处理字体文件, 仅做搬运的工作
        test: /\.(eot|ttf|svg|woff)$/,
        use: {
          loader: 'file-loader'
        }
      }
    ]
  },
  // 在webpack运行到某个时刻的时候，帮你做一些事
  plugins: [
    // HtmlWebpackPlugin 能够为每次打包生成一个html文件，并引入打包后的js
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    // 第三方插件：会在每次打包前运行，清理/PROJECT_DIR/dist/下的文件夹
    new CleanWebpackPlugin()
  ]
};
