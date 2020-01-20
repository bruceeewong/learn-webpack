# Lesson 2-4 webpack 配置

## Webpack CLI

the tool that makes sure we can use `webpack / npx` in command line.

## webpack usage

global

- webpack index.js // use global webpack to work

local

- npx webpack index.js // use local webpack to work
- npm run bundle -> webpack // use local webpack through npm script

## webpack.config.js

- entry: the entry js file which webpack starts to bundle
- output:
  - filename: the name of the final bundle file
  - path: the output path
