# Webpack 高级概念

承接基础部分，定义了：

- 入口文件
- 输出目录及文件名
- 定义了`module`规则
    - js
    - css
    - scss
- 配置了 `DevServer`
- 配置了 `devtool` - `sourcemap`
- 配置了 `babel` ES6语法转译，引入 `polyfill`
- 配置了 `HtmlWebpackPlugin`
- 配置了 `CleanWebpackPlugin`
- 配置了 `webpack.HotModuleReplacementPlugin` 热更新插件

## 配置 Babel

安装babel loader与核心代码

```
npm i -D babel-loader @babel/core
```

配置 js 规则

```
// webpack.config.js
module: {
    rules: [
          {
            test: /.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
          }
    ]
}
```

babel-loader 仅仅是webpack与babel通信，不会转译，还需借助:
- `@babel/preset-env` 工具， 包含所有 ES6语法 转 ES5 的规则
- `@babel/polyfill` 工具， 为低版本浏览器填充ES6新特性，如`Promise`

如果直接在代码里引入 `@babel/polyfill`， 会让代码体积变大， 希望使用了新特性来按需polyfill，则在@babel/preset-env配置：

```
{
    "presets": [
        ['@babel/preset-env', { useBuiltIns: 'usage' } ]
    ]
}
```

如果你写的是一个库代码，为了不让polyfill污染全局环境，要安装 `@babel/plugin-transform-runtime` ，他创造沙盒环境，以闭包的方式引入：

安装 `@babel/runtime-corejs2` 指定Polyfill的标准库版本

```
{
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "absoluteRuntime": false,
        "corejs": 2, // corejs是JS标准库, polyfill用
        "helpers": true,
        "regenerator": true,
        "useESModules": false,
        "version": "7.0.0-beta.0"
      }
    ]
  ]
}
```

将配置提取至根目录的 `.babelrc` 即可

## Tree Shaking

只将 `ES 模块` 中 被使用到的代码进行打包，其他无关的抖掉，以减小代码体积。

> 注意， 只对 ES Module 有效; 生产环境会自动 tree shaking

在 mode: development 情况下, 加

```
optimization: {
    usedExports: true
}
```

## Code Splitting

手动分割 第三方库与业务代码为多份文件，然后在 entry 中定义多个入口(相当于打包后，通过script写到html中) 

webpack 自动代码分割， 在 webpack.common.js 中配置

```
optimization : {
    splitChunks: {
        chunks: 'all'
    }  
}
```

webpack 遇到公用类库，自动分割出 vendors~main.bundle.js

