# webpack

## 基础

使用 webpack4，至少只需要安装 webpack 和 webpack-cli。新版本的 webpack 4.35.* 必须同步安装 webpack-cli

webpack 支持 `es6`，`CommonJS`，`AMD`

### 打包 JS

**如何运行 webpack ？**
- 安装 webpack 后，找到 package.json 文件，增加 "scripts":{ "build": "webpack ./webpack.config.js"}
- 命令行敲 yarn build 就能打包我们需要的 bundle.js 文件

```js
{
  "name": "my-webpack-demo",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "build": "webpack ./webpack.config.js"
  },
  "devDependencies": {
    "webpack": "4.15.1",
    "webpack-cli": "^3.3.11"
  },
  "dependencies": {
    "babel-polyfill": "6.26.0",
    "babel-runtime": "6.26.0"
  }
}
```

### 编译 ES6

安装所需包：
1. `babel-loader`: 负责`es6`语法转化
2. `babel-preset-env`: 包含`es6`、`es7`等版本的语法转化规则
3. `babel-polyfill`: `es6`内置方法和函数转化垫片
4. `babel-plugin-transform-runtime`: 避免`polyfill`污染全局变量


为什么需要这些依赖呢？

因为在我们的项目中，不可避免地使用到`es6`的语法和API，我们需要对这些代码进行转化保证能在低版本的浏览器上运行，而`babel`就是这个作用，帮助我们将`es6`的语法转化

**`babel-loader`和`babel-polyfill`的区别：**

`babel-loader`和`babel-polyfill`的区别是，前者负责语法转化，如箭头函数；后者负责内置方法和函数，如 `new Set()`而单独使用一个`babel-loader`是不够的，需要配合`babel-polyfill`、`babel-preset-env`、`babel-runtime`使用

`babel-polyfill`会模拟一个`es2015+`环境，用于应用程序的开发而不是库文件，可以使用`Promise`之类的新的内置组件、`Array.from`和`Object.assigh`等静态方法，以及一些`Array.prototype.includes`实例方法、`polyfill`将添加到全局范围和本地原型中，导致污染全局变量

**引入`babel-polyfill`的四种方式：**
1. 直接在`main.js`顶部使用: ```import "@babel/polyfill"```
2. 设置`.babelrc`: 
```js
{
  "presets": [
      [
        "@babel/preset-env",
        {
          "useBuiltIns": "entry",
          "corejs": 2
        }
      ]
    ]
}
```
并在`main.js`顶部使用```import "@babel/polyfill"```
3. 设置`.babelrc`:
```js
{
  "preset": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": false
      }
    ]
  ]
}
```
然后在`webpack.config.js`中入口配置：
```js
entry: {
  app: [
    "@babel/polyfill",
    "./main.hs:
  ]
}
```
4. 设置`.babelrc`，无需再引用`@babel/polyfill`(按需引入，前三种是全部引入)
```js
{
  "preset": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "corejs": 2
      }
    ]
  ]
}
```
该配置会自动加载项目中需要的`polifill`，而不是全部引入

**`babel-runtime`和`babel-plugin-transform-runtime`**
`babel-runtime`为生产依赖而`babel-plugin-transform-runtime`为开发依赖，`babel-runtime`包含了所有的核心帮助函数，举个栗子，当我们需要使用`Promise`时，就需要在项目文件中引入所需要的帮助函数：
```js
import Promise from "babel-runtime/core.js/promise"
let promise = new Promise(function(resolve, reject) {
  console.log('Promise)
  resolve() 
})
promise.then(function() {
  console.log('resolved')
})
```
但手动引入是比较繁琐的，就需要`babel-transform-runtime`插件，帮助我们分析项目代码，自动引入所需的垫片API，使用方式：在`.babelrc`设置：
```
  {
    "plugins: [
      [
        "@babel/plugin-transform-runtime",
        {
          "corejs": 2 // 默认值为 false，为达到自动引入的效果需要改成 2
        }
      ]
    ]
  }
```
并安装依赖`npm install --save @babel/runtime-corejs2`
需要注意的是，`babel-runtime`不能模拟实例方法，即内置对象原型上的方法，如`Array.prototype.concat`，如果`babel`版本 >= 7.4.0，设置`"corejs": 3`，同样需要安装依赖`npm install --save @babel/runtime-corejs3`就能正常使用实例方法了



### 多页面解决方案——提取公共代码

### Webpack 环境配置

## 进阶

### 分析打包结果

设置 devtool 属性改为 `source-map`。
源文件中的所有 `import` 和 `export` 都会转换成对应的辅助函数。
```js
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("PackDataStructuresAlogrithms", [], factory);
	else if(typeof exports === 'object')
		exports["PackDataStructuresAlogrithms"] = factory();
	else
		root["PackDataStructuresAlogrithms"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/data-structures/stack-array.js":
/*!***********************************************!*\
  !*** ./src/js/data-structures/stack-array.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return StackArray; });
// LIFO：只能用 push, pop 方法添加和删除栈中元素，满足 LIFO 原则
class StackArray {
  constructor() {
    this.items = [];
  }
  /**
   * @description 向栈添加元素，该方法只添加元素到栈顶，也就是栈的末尾。
   * @param {*} element 
   * @memberof Stack
   */


  push(element) {
    this.items.push(element);
  }
  /**
   * @description 从栈移除元素
   * @returns 移出最后添加进去的元素
   * @memberof Stack
   */


  pop() {
    return this.items.pop();
  }
  /**
   * @description 查看栈顶元素
   * @returns 返回栈顶的元素
   * @memberof Stack
   */


  peek() {
    return this.items[this.items.length - 1];
  }
  /**
   * @description 检查栈是否为空
   * @returns
   * @memberof Stack
   */


  isEmpty() {
    return this.items.length === 0;
  }
  /**
   * @description 返回栈的长度
   * @returns
   * @memberof Stack
   */


  size() {
    return this.items.length;
  }
  /**
   * @description 清空栈元素
   * @memberof Stack
   */


  clear() {
    this.items = [];
  }

}

/***/ }),

/***/ "./src/js/data-structures/stack.js":
/*!*****************************************!*\
  !*** ./src/js/data-structures/stack.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Stack; });
/**
 * @description 创建一个基于 JavaScript 对象的 Stack 类
 * 使用 JavaScript 对象来存储所有的栈元素，保证它们的顺序并且遵循 LIFO 原则。
 * @class Stack
 */
class Stack {
  constructor() {
    this.count = 0; // 记录栈的大小，以及帮助我们从数据结构中添加和删除元素。保证顺序

    this.items = {};
  }
  /**
   * @description 向栈中插入元素
   * @param {*} element
   * @memberof Stack
   */


  push(element) {
    this.items[this.count] = element;
    this.count++;
  }
  /**
   * @description 从栈中弹出元素
   * @returns 移出最后添加进去的元素
   * @memberof Stack
   */


  pop() {
    if (this.isEmpty()) {
      // {1}检验栈是否空
      return undefined; // 如果为空，则返回 undefined
    }

    this.count--; // 如果栈不为空的话，我们会讲 count 属性减1

    const result = this.items[this.count]; // 保存栈顶的

    delete this.items[this.count]; // 删除该属性

    return result;
  }
  /**
   * @description 返回栈的长度
   * @returns
   * @memberof Stack
   */


  size() {
    return this.count;
  }
  /**
   * @description 检查栈是否为空
   * @returns
   * @memberof Stack
   */


  isEmpty() {
    return this.count === 0;
  }
  /**
  * @description 查看栈顶元素
  * @returns 返回栈顶的元素
  * @memberof Stack
  */


  peek() {
    if (this.isEmpty()) {
      return undefined;
    }

    return this.items[this.count - 1];
  }
  /**
   * @description 清空栈元素
   * @memberof Stack
   */


  clear() {
    this.items = {};
    this.count = 0; // 或者 LIFO 原则
    // while (!this.isEmpty()) { this.pop(); }
  }
  /**
   * @description 打印栈的内容
   * @returns
   * @memberof Stack
   */


  toString() {
    if (this.isEmpty()) {
      return ''; // 如果栈是空的，我们只需返回一个空字符串
    }

    let objString = `${this.items[0]}`; // 如果不是空的，就用它底部的第一个元素作为字符串的初始值

    for (let i = 1; i < this.count; i++) {
      // 迭代整个栈的键
      objString = `${objString},${this.items[i]}`;
    }

    return objString;
  }

}

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! exports provided: StackArray, Stack, decimalToBinary */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _data_structures_stack_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data-structures/stack-array */ "./src/js/data-structures/stack-array.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StackArray", function() { return _data_structures_stack_array__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _data_structures_stack__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data-structures/stack */ "./src/js/data-structures/stack.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Stack", function() { return _data_structures_stack__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _others_base_converter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./others/base-converter */ "./src/js/others/base-converter.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "decimalToBinary", function() { return _others_base_converter__WEBPACK_IMPORTED_MODULE_2__["decimalToBinary"]; });

// stack





/***/ }),

/***/ "./src/js/others/base-converter.js":
/*!*****************************************!*\
  !*** ./src/js/others/base-converter.js ***!
  \*****************************************/
/*! exports provided: decimalToBinary */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decimalToBinary", function() { return decimalToBinary; });
/* harmony import */ var _data_structures_stack__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data-structures/stack */ "./src/js/data-structures/stack.js");

function decimalToBinary(decNumber) {
  const remStack = new _data_structures_stack__WEBPACK_IMPORTED_MODULE_0__["default"]();
  let number = decNumber; // 十进制数字

  let rem; // 余数

  let binaryString = '';

  while (number > 0) {
    // 当结果不为0，获得一个余数
    rem = Math.floor(number % 2);
    remStack.push(rem); // 入栈

    number = Math.floor(number / 2);
  }

  while (!remStack.isEmpty()) {
    binaryString += remStack.pop().toString();
  }

  return binaryString;
}

/***/ })

/******/ });
});
//# sourceMappingURL=PackDataStructuresAlogrithms.min.js.map
```
- import 对应 `__webpack_require`
- export 对应 `__webpack_exports__['defalut']` 直接赋值和 `__webpack_require__.d`。

整理一下整个流程：
1. 定义 `__webpack_require__`及其辅助函数。
2. 使用 `__webpack_require__`引入入口模块。
3. `__webpack_require__`函数载入模块，将模块放到模块缓存。
4. 调用模块
   1. 同样使用 `__webpack_require__`读取依赖（回到第3步）。
   2. 运行模块内部功能。
   3. 使用`__webpack_exports__['default']` 直接赋值和 `__webpack_require__.d`输出。
5. 运行结束。

### 优化打包速度

### 长缓存优化

### 优化

## 原理

## 参考资料

- [四大维度解锁Webpack3.0前端工程化](https://coding.imooc.com/class/chapter/171.html#Anchor) -- 由浅入深 webpack。
- [webpack 最简打包结果分析](https://segmentfault.com/a/1190000018205656) -- 清晰明了，说明 webapck 的打包文件流程。