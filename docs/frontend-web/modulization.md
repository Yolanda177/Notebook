## 模块化

**什么是模块化？**

将一个复杂的程序依据一定的规范封装成几个块（文件），并组合在一起；块的内部数据与实现是私有的，只是向外部暴露一些接口（方法）与外部其他模块通信

通行的JavaScript模块规范有两种：CommonJS 和 AMD

**为什么服务端需要模块化？**

因为服务端需要与操作系统和其他应用程序互动，如果没有模块化是没办法编程

**为什么客户端需要模块化？**

嵌入网页的JS代码越来越庞大、复杂，模块化编程成为一个迫切的需求

### CommonJS

**概述** Node应用由模块组成，采用 CommonJS 模块规范。每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类都是私有的，对其他文件不可见。*在服务端，模块的加载时运行时同步加载的；在浏览器端，模块需要提前编译打包好

**特点**
- 所有代码都运行在模块作用域，不会污染全局作用域
- 模块可以多次加载，但只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载就直接读取缓存结果；要想让模块再次运行，必须清除缓存
- 模块加载的顺序，按照其在代码中出现的顺序

**基本语法**
- 暴露模块 `module.exports = value`或 `exports.xxx = value`
- 引入模块 `require(xxx)` 如果是第三方模块，xxx为模块名；如果是自定义模块，xxx为模块文件路径

*require命令*加载模块文件，基本功能是读入并执行一个JavaScript文件，返回该模块的exports对象，如果没有找到指定模块会报错

**加载机制**：输入的是被输出的值的拷贝。也就是说，一旦输出一个值，模块内部的变化就影响不到这个值

eg:

```js
// math.js
const counter = 0;
const add = (a) => {
  counter += a
  console.log('add')
}
module.exports = {
  counter,
  add
}

// main.js
const counter = require('./math').counter
const add = require('./math').add
console.log(counter) // 0
add(2) // add
console.log(counter) // 0

```

虽然以上代码实现了模块化，但应用于浏览器环境，是有局限性的：第十五行代码`console.log(counter)`必须在第十四行代码`const add = require('./math').add`加载完成后才能执行，如果加载时间很长，就会导致浏览器处于'假死'状态.因此浏览器模块不能采用以上的'同步加载'方式，只能采用'异步加载'模块，这就是AMD规范诞生的背景

### AMD

**AMD**(Asyncchromous Module Definition)：意思是异步模块定义，它采用异步方式加载模块，模块的加载不影响后面的语句执行，所有依赖这个模块的语句，都定义在一个回调函数中，等加载完成后这个回调函数才调用

**基本语法**
- 定义模块 `define(['m1', 'm2'], function(m1, m2) { return 模块})`
- 加载模块 `require(['m1', 'm2'], function(m1, m2) { // 使用m1、m2})`


**实现异步加载**：
eg: 以一个流行库 require.js 主要用于客户端的模块管理

文件结构目录：
```
|-js
  |-libs
    |-require.js
  |-modules
    |-alerter.js
    |-dataService.js
  |-main.js
|-index.html
```

**依赖模块**
```js
// dataService.js文件
define(function() {
  let msg = 'www.baidu.com'
  const getMsg = () => {
    return msg.toUpperCase()
  }
  return { getMsg }
})

// aletr.js文件
define(['dataService'], function(dataService) {
  let name = 'Tom'
  const showMsg = () => {
    alert(`${dataService.getMsg()},${name}`)
  }
})
```
**主模块**
```js
  // main.js文件
  (function() {
    require.config({
      baseUrl: 'js/',
      paths: {
        alerter: './modules/alerter',
        dataService: './modules/dataService'
      }
    })
    reuqire(['alerter'], function(alerter) {
      alerter.showMsg()
    })
  })()
```

**index.html**
```
// index.html文件
<!DOCTYPE html>
<html>
  <head>
    <title>Modular Demo</title>
  </head>
  <body>
    <!-- 引入require.js并指定js主文件的入口 -->
    <script data-main="js/main" src="js/libs/require.js"></script>
    <!-- data-main指定主模块文件 -->
  </body>
</html>
```

`require.config()`方法可以自定义模块加载行为，就写在主模块main.js的头部
```js
  require.config({
    paths: { // 指定各个模块的加载路径 假设这些文件都与main.js在同一个目录(js子目录)
      'jQuery': 'jquery.min',
      'underscore': 'underscore.min',
      'backbone': 'backbone.min'
    }
  })
   //  假设这些文件都与main.js不在同一个目录
  require.config({
    baseUrl: 'js/lib',
    paths: {
      'jQuery': 'jquery.min', // 或者改成 'lib/jquery.min' 去掉baseUrl
      'underscore': 'underscore.min',
      'backbone': 'backbone.min'
    }
  })

```

**注意**：如果需要加载不符合规范的模块，可以采用`require.config()`进行改造，利用`require.config()`中的`shim`属性定义一些特征：
eg:
```js
  require.config({
    shim: {
      'underscore': {
        export: '_'
      },
      'backbone': {
        deps: ['underscore', 'jquery'],   // 表明这个模块的依赖性
        export: 'Backbone'                // 定义这个模块外部调用时的名称
      }
    }
  })
```

## CMD