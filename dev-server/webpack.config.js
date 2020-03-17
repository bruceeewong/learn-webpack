const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map', // 最佳实践
  // devtool: 'source-map', // 最全面的提示，速度慢
  entry: {
    main: './src/index.js',
  },
  output: {
    publicPath: '/',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: './dist', //
    open: true, // 自动打开页面
    port: 9528,
    hot: true, // 开启Hot Module Replacement
    // hotOnly: true // 不让浏览器自动刷新
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        // options: {
          // presets: [
          //   [
          //     '@babel/preset-env',
          //     {
          //       targets: {
          //         chrome: '67' // 对于chrome>67不使用polyfill
          //       },
          //       useBuiltIns: 'usage' // 仅仅用到的特性才polyfill
          //     }
          //   ]
          // ]
        // }
      },
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
          'postcss-loader'
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
    new CleanWebpackPlugin(),
    // 使用 HotModuleReplacementPlugin
    new webpack.HotModuleReplacementPlugin()
  ]
};
