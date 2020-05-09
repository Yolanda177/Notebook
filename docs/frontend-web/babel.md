### Babel

#### Babel的功能？

Babel是一个JS编译器，主要用于将ECMAScript 2015+版本的代码转换为向后兼容的JavaScript语法，以便代码能够运行在当前和旧版本的浏览器或其他环境中

Babel能做的事情：
- 语法转换
- 通过`Polyfill`在目标环境中添加缺失的特性
- 源码转换

接下来，通过新建一个项目**babel-temp**逐步探讨插件和预设的作用

#### 新建项目

我的vue-cli版本是 4.3.1，新建项目后，会自动安装好`core-js`、`@babel/cli`、`@babel/core`等依赖

- @babel/core: Babel的核心功能就包含在`@babel/core`模块中，`core`意味着核心，所以不安装`@babel/core`，无法使用babel进行编译

- @babel/cli: 提供命令行工具，主要是提供babel这个命令，安装后就能使用babel进行编译

接着，在新项目中的pageage.json文件中配置命令：
```js
  "scripts": {
    ...
    "compiler": "babel src --out-dir lib --watch"
  },
```

配置好命令后，新建一个测试文件，创建 `src/index.js`
```js
const func = () => {
    console.log('Hello')
}
```

这时候，我们在命令行敲`yarn compiler`编译，会发现生成的文件与原文件并没有什么不同，是因为我们还没有配置任何插件，编译前后的代码是完全一样的。如果想要Babel进行语法转换，需要为其添加插件**plugin**

#### 插件Plugin

Babel的插件分为两种：语法插件和转换插件

- 语法插件：只允许Babel**解析**特定类型的语法(不是转换)，可以在**AST**转换时使用，以支持解析新语法

- 转换插件：转换插件会启用相应的语法插件，不需要同时指定这两种插件

**插件的使用**：

在我们新建的项目里，会有一个`babel.config.js`文件(如果没有就自己新建一个)，如下配置：
```js
module.exports = {
  plugins: ["@babel/plugin-transform-arrow-functions"]
}
```

这时候再执行`yarn compiler`，会发现，箭头函数已经被编译成功了，`lib/index.js`结果是：
```js
const func = function () {
  console.log('object');
};
```

现在，项目仅支持转换箭头函数，如果想将其他新的JS特性转换成低版本，需要使用其他对应的**plugin**。如果一个个去配置是很繁琐的，这显然非常不便，为了解决这个问题，**preset**出现了

#### 预设Preset

通过使用一个preset即可轻松使用一组插件，例使用`@babel/preset-env`

`@babel/preset-env`主要作用是对我们使用的并且目标浏览器中缺失的功能进行代码转换和加载`polyfill`，在不尽兴任何配置的情况下，`@babel/preset-env`所包含的插件将支持最新的JS特性，将其转换成ES5代码，如下配置
```js
module.exports = {
  presets: ["@babel/preset-env"]
  // plugins: ["@babel/plugin-transform-arrow-functions"]
}
```
需要注意的是，`@babel/preset-env`会根据配置的目标环境，生成插件列表来编译。对于基于浏览器或`Electron`的项目，官方推荐使用`.browserslistrc`文件来指定目标环境。默认情况下，如果没有在Babel的配置文件`babel.config.js`中设置`targets`或者`ignoreBrowserslistConfig`，`@babel/preset-env`会使用`.browserslistrc`配置源。

如果不是要兼容所有的浏览器和环境，建议设置指定的目标环境，这样编译代码能够保持最小，例如配置`.browserslistrc`:
```js
last 2 Chrome versions
```
再执行`yarn compiler`会发现，箭头函数没有被编译成ES5，这是因为chrome的最新2个版本都能够支持箭头函数

现在，我们修改一下`src/index.js`文件
```js
 const fn = () => {
    console.log('object');
}
 const isHas = [1,2,3].includes(2);

 const p = new Promise((resolve, reject) => {
    resolve(100);
});
```
`yarn compiler`编译后的结果是：
```js
var fn = function fn() {
  console.log('object');
};

var isHas = [1, 2, 3].includes(2);
var p = new Promise(function (resolve, reject) {
  resolve(100);
});
```

乍一看似乎没什么问题，但是这个编译出来的代码在低版本的浏览器使用的话，显然会报错，因为在低版本浏览器中数组实例上还没有`includes`方法，也没有`Promise`构造函数。

为什么呢？因为Babel的语法转换只是将高版本的语法转换成低版本的，但是新的内置函数、实例方法无法转换。这时，就需要`polyfill`，`polyfill`的中文意思是垫片，也就是垫平不同浏览器或不同环境下的差异，让新的内置函数、实例方法等在低版本浏览器中也可以使用

#### Polyfill

`@babel/polyfill`模块包括`core-js`和`regenerator runtime`模块，可以模拟完整的ES2015+环境，这意味着我们可以使用诸如`Promise`新的内置组件，`Array.form`或`Object.assign`之类的**静态方法**、`Array.prototype.includes`的**实例方法**以及**生成器函数**(前提是使用了`@babel/plugin-transform-regenerator`插件)。为了添加这些功能，`@babel/polyfill`将添加到全局范围和类似`String`这样的内置原型(会对全局环境造成污染)

首先，安装`@babel/polyfill`依赖，这是一个需要在源码之前运行的垫片，所以需要安装在**生产环境**`yarn add @babel/polyfill`，需要在代码运行前加载垫片，所以修改`src/index.js`：
```js
import '@babel/polyfill';

 const fn = () => {
    console.log('object');
}
 const isHas = [1,2,3].includes(2);

 const p = new Promise((resolve, reject) => {
    resolve(100);
});
```
现在，不管是在低版本还是高版本的浏览器(或是node环境)中代码都能正常运行了，不过，很多时候我们未必需要完整的`@babel/polyfill`，这会导致我们最终构建出的包体积增大。为此，Babel给**预设**增加了`useBuiltIns`参数，可以实现仅增加对应特性的`polyfill`功能，避免引入无用代码

`@babel/preset-env`提供了一个`useBuiltIns`参数，设置值为**usage**时，就只会包含代码所需要的`polyfill`。有一点需要注意的是：配置该参数的值为`usage`时，必须同时设置`corejs`，如果不设置，会给出警告，默认使用的是`"corejs": 2`(这时需要安装`@babel/polyfill`，会默认安装`"corejs": 2`)
```js
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {   
        "useBuiltIns": "usage",
        "corejs": 2
      }
    ]
  ]
  // plugins: ["@babel/plugin-transform-arrow-functions"]
}
```
建议使用`corejs@3`，因为`corejs@2`分支已经不再添加新特性，新特性都会加到`corejs@3`，且`corejs@3`支持原型方法，不**污染原型**

修改配置后我们再编译一次文件，Babel会检查所有代码，然后仅仅把需要的`polyfill`包含进来：
```js
"use strict";

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es7.array.includes");

var fn = function fn() {
  console.log('object');
};

var isHas = [1, 2, 3].includes(2);
var p = new Promise(function (resolve, reject) {
  resolve(100);
});
```
前面说到，在使用`useBuiltIns`的时候，需要安装`@babel/polyfill`，虽然看起来代码转换中没有用到，但却使用了`corejs@2`；如果我们源码中使用到`async/await`，那么编译出来的代码就需要`require("regenerator-runtime/runtime")`，这个模块已经在我们安装`@babel/polyfill`的依赖中

**补充**：7.4.0版本开始，`@babel/polyfill`已经废弃，改用安装`core-js`和`regenerator runtime`模块()

假如，我们的代码是这样：
```js
class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    getName() {
        return this.name
    }
}

let Tom = new Person('Tom', 22)
```
编译后的代码是：
```js
require("core-js/modules/es6.function.name");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Person = /*#__PURE__*/function () {
  function Person(name, age) {
    _classCallCheck(this, Person);

    this.name = name;
    this.age = age;
  }

  _createClass(Person, [{
    key: "getName",
    value: function getName() {
      return this.name;
    }
  }]);

  return Person;
}();

var Tom = new Person('Tom', 22); 
```

Babel会使用很小的辅助函数来实现类似`_createClass`等公共方法，默认情况下，它将会被**inject**到需要它的每个文件中。如果我们有五个文件都使用了这个`Class`，意味着`_classCallCheck`、`_defineProperties`、`_createClass`等这些方法被`inject`了五次。这显然会导致**包体积变大**，最关键的是，我们不需要它`inject`多次，这时候，就需要插件`@babel/plugin-transform-runtime`插件，使用这个插件，所有帮助程序都将引用模块`@babel/runtime`，这样就能避免编译后的代码中出现重复的帮助程序，有效减少包体积

#### 插件 @babel/plugin-transform-runtime

`@babel/plugin-transform-runtime`是一个可以**重复使用**Babel注入的帮助程序，以节省代码大小的插件，另外，需要和`@babel/runtime`配合使用。通常`@babel/plugin-transform-runtime`仅在开发时使用，但运行时最终代码需要依赖`@babel/runtime`，所以`@babel/runtime`必须作为生产依赖安装

```
yarn add @babel/plugin-transform-runtime --dev
yarn add @babel/runtime
```

除了能减少编译后代码的体积外，使用这个插件还有一个优点，它可以为代码创建一个沙盒环境，如果使用`@babel/polyfill`及其提供的内置程序(例如Promise、Set或Map)，则它们会污染全局环境。虽然这对应用程序或命令行工具可能是可以的，但如果代码是发布供他人使用的库，则会成为一个问题。`@babel/plugin-transform-runtime`会将这些内置别名作为`corejs`的别名，因此可以无缝使用它们，无需使用polyfill

增加配置：
```js
  presets: [
    [
      "@babel/preset-env",
      {   
        "useBuiltIns": "usage",
        "corejs": 2
      }
    ]
  ],
  plugins: ["@babel/plugin-transform-runtime"]
```

重新编译后：
```js
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.function.name");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Person = /*#__PURE__*/function () {
  function Person(name, age) {
    (0, _classCallCheck2.default)(this, Person);
    this.name = name;
    this.age = age;
  }

  (0, _createClass2.default)(Person, [{
    key: "getName",
    value: function getName() {
      return this.name;
    }
  }]);
  return Person;
}();

var Tom = new Person('Tom', 22); 
```

可以发现，帮助程序不是直接`inject`到代码中，而是从`@babel/runtime`中引入。那`@babel/plugin-transform-runtime`是怎么**避免全局污染**的呢？

修改文件`src/index.js`:
```js
let isHas = [1,2,3].includes(2);

new Promise((resolve, reject) => {
    resolve(100);
});
```
编译后：
```js
require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

var isHas = [1, 2, 3].includes(2);
new Promise(function (resolve, reject) {
  resolve(100);
});
```
看起来和不使用`@babel/plugin-transform-runtime`是一样的，`Array.prototype`上新增了`includes`方法，并且新增了全局的`Promise`方法，污染了全局环境

如果想实现不污染全局环境，还需要修改配置文件及添加依赖`@babel/runtime-corejs3`，安装好依赖后修改配置文件：
```js
  presets: [
    [
      "@babel/preset-env"
    ]
  ],
  plugins: [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 3
      }
    ]
  ]
```
编译后：
```js
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));

var _includes = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/includes"));

var _context;

var isHas = (0, _includes.default)(_context = [1, 2, 3]).call(_context, 2);
new _promise.default(function (resolve, reject) {
  resolve(100);
});
```
可以看出，没有直接去修改`Array.prototype`，或者新增`Promise`方法，避免了全局污染。如果上面`@babel/plugin-transform-runtime`配置的`corejs`是2，其中不包含实例的polyfill需要单独引入。

注意：**如果我们配置的corejs是3的版本，那么不管是实例还是全局方法，都不会污染全局环境**

#### 补充

**顺序：**
- 插件Plugin在预设Preset前运行
- 插件执行的顺序是从左往右
- 预设执行的顺序是从右往左

例如：
```js
  presets: [
    "@babel/preset-env", "@babel/preset-react"
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties", "@babel/plugin-syntax-dynamic-import"

  ]
```
插件先执行`@babel/plugin-proposal-class-properties`后执行`@babel/plugin-syntax-dynamic-import`

预设先执行`@babel/preset-react`后执行`@babel/preset-env`


**参数：** 插件和预设都可以接受参数，参数由插件名或预设名和参数对象组成一个数组，如：
```js
  presets: [
    [
      "@babel/preset-env",
      {   
        "useBuiltIns": "usage"
      }
    ]
  ],
  plugins: [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 3
      }
    ]
  ]
```

**插件的短名称：**

- 如果插件名称为`@babel/plugin-XXX`，可以使用短名称`@babel/XXX`
- 如果插件名称为`@babel-plugin-XXX`，可以使用短名称`XXX`

**配置文件：**

- babel.config.js 一般是项目包使用
- .babellrc 一般是单个软件包，简单包使用
- package.json 在package.json 中配置