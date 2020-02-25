# 工程化

## 使用 ESLint + Prettier 统一代码风格

![使用 ESLint + Prettier 统一代码风格](../.vuepress/public/images/codeFormat.png)

> 参考资料：https://juejin.im/post/5b27a326e51d45588a7dac57

## webpack require.context()

你还可以通过 require.context() 函数来创建自己的 context。

可以给这个函数传入三个参数：一个要搜索的目录，一个标记表示是否还搜索其子目录， 以及一个匹配文件的正则表达式。

```js
require.context(directory, useSubdirectories = false, regExp = /^\.\//);
```

demo
```js
require.context('./test', false, /\.test\.js$/);
// （创建出）一个 context，其中文件来自 test 目录，request 以 `.test.js` 结尾。
require.context('../', true, /\.stories\.js$/);
// （创建出）一个 context，其中所有文件都来自父文件夹及其所有子级文件夹，request 以 `.stories.js` 结尾。
```

### Vue 全局组件

### 首字母大写

### 利用require.context遍历目录所有图片

### 加载所有的图片

## Webpack sourceMap 的作用

## 读懂eslint配置文件
```
// .eslintrc.js

module.exports = {
  root: true, // 告诉 eslint 找当前配置文件不能往父级找
  env: {
    node: true // 指定环境的全局变量，下面的配置指定 node 环境
  },
  extends: ['plugin:vue/essential', '@vue/airbnb'], // 扩展插件：配置风格
  rules: { // 核心的语法规则 0-off关闭规则、1-warn作为警告、2-error作为错误
    'no-console': 0,
    'no-debugger': 0,
    // 在这里自定义修改
    'linebreak-style': 0,
    semi: [2, 'never'], // 不加分号
    'no-unused-expressions': [2, {
      allowShortCircuit: true,
      allowTernary: true
    }], // 允许三元
    'no-plusplus': 0, // 开启i++
    'comma-dangle': [2, 'never'], // 结尾不使用逗号
    'import/no-unresolved': [2, {
      ignore: ['esri', 'dojo']
    }], // 解决import esri/xxx编译不通过
    'import/extensions': 0,
    // 'no-console': 0,
    'arrow-parens': [2, 'as-needed'], // 箭头函数参数只有一个时无需加括号
    'no-param-reassign': [2, {
      props: false
    }],
    'no-mixed-operators': 0,
    // 'max-len': [2, {"code": 120} ],
    'vue/no-parsing-error': [2, {
      'x-invalid-end-tag': false
    }]
  },
  parserOptions: {
    parser: 'babel-eslint' // 指定 eslint 的解析器，解析器必须符合规则， babel-eslint 解析器是对 babel 解析器的包装，使其与 eslint 解析
  }
}
```