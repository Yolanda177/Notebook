# rollup

> [rollup](https://github.com/rollup/rollup)

对于前端项目来说，因为有静态资源（如图片、字体等）加载与按需加载的需求，所以使用 `webpack` 是不二选择，但对于第三方库来说，其实还有更好的选择：`rollup`。

webpack 在打包成第三方库的时候只能导出 `amd/commonjs/umd`，而 rollup 能够导出 `amd/commonjs/umd/es6`。使用 rollup 导出 es6 模块，就可以在使用这个库的项目中构建时使用 `tree-shaking` 功能。

对于有样式文件（css、less、scss）、静态资源文件（图片、字体）的前端组件来说，可以使用 `rollup-plugin-postcss` 插件配合 rollup 处理样式文件与静态资源文件。

## 基础

### 一：什么是Rollup?

rollup是一款用来es6模块打包代码的构建工具(支持css和js打包)。当我们使用ES6模块编写应用或者库时，它可以打包成一个单独文件提供浏览器和Node.js来使用

**Rollup最主要的优点是** 它是基于ES2015模块的，相比于webpack或Browserify所使用的CommonJS模块更加有效率，因为Rollup使用一种叫做
tree-shaking的特性来移除模块中未使用的代码，这也就是说当我们引用一个库的时候，我们只用到一个库的某一段的代码的时候，它不会把所有的代码打包进来，而仅仅打包使用到的代码(webpack2.0+也引入了tree-shaking)

### 二：如何使用Rollup来处理并打包JS文件？

1. 安装 `yarn add rollup --dev`
2. 创建 `rollup.config.js`配置文件(有点类似webpack)

rollup.config.js 文件内容：
```js
export default {
  input: './src/main.js',
  output: {
    file: './dist/js/main.min.js',
    format: 'iife'
  }
}
```
以上配置的含义：
**input**： rollup先执行的入口文件。
**output**：rollup 输出的文件。
**output.format**: rollup支持的多种输出格式(有amd,cjs, es, iife 和 umd, 具体看 http://www.cnblogs.com/tugenhua0707/p/8150915.html)

接着在 `ppackage.json`配置，这样当我们执行 `yarn rollupBuild`即可完成打包
```js
  "scripts": {
    "rollupBuild": "rollup -c",
  },
```

## 进阶

## 原理

## 不提供热更新

可以下载 `npm-run-all` 以及 `live-server` 来加载浏览器。

## 参考资料

- [Rollup.js 教程](https://www.zcfy.cc/article/how-to-bundle-stylesheets-and-add-livereload-with-rollup) —— 比较详细的系列教程。