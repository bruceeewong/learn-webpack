# Learn Webpack

跟慕课网 Dell 老师的课程学习 Webpack4 基础与实战

地址: [从基础到实战 手把手带你掌握新版 Webpack4.0](https://coding.imooc.com/learn/list/316.html)

---

[TOC]

---

## Lesson 2-4 webpack 配置

### Webpack CLI

本地命令行工具, 允许我们使用全局`webpack / npx`命令

### webpack 几种用法

全局

```js
webpack index.js // 调用全局的 webpack
```

本地

```js
npx webpack index.js // 调用本地的 webpack
npm run bundle -> webpack // 通过 npm script 调用本地的 webpack
```

### webpack.config.js

- entry: webpack 开始打包的入口 js 文件
- output:
  - filename: 最终输出的打包文件名字
  - path: 最终输出的路径
