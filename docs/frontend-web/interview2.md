# 常见问题 2

## vue

### Vue中的父组件怎么监听子组件的生命周期？

**Vue2**
1. 使用 ref：
  ```
  // 父组件
  this.$refs.child.$on('hook:mounted', this.handleChildMounted);
  // 子组件
  mounted() {console.log('子组件已挂载');}
  ```
2. 子组件在生命周期钩子中触发自定义事件，父组件监听这些事件：
  ```<child @custom-event="handleEvent"/>```
3. 通过 provide 和 inject 实现跨层级组件通信

**Vue3**

### 什么是 MVVM ？

MVVM 是指 Model-View-ViewModel

- Model 是指数据层，负责管理应用数据和业务逻辑
- View 是指视图层，负责管理用户界面和各类 ui 组件，
- ViewModel 是指业务逻辑层，负责管理 Model 和 View 之间的通信，作为桥梁连接

MVVM 模式 是指 在 ViewModel 中有一个 Binder 或 Data-bingding 引擎的东西，处理 View 和 Model 之间的数据同步

- 我们只需要在 View 的模版上，**指令式**声明 View 上的哪部分需要和 Model 的哪一块数据绑定。
- 当 Model 变化了（比如使用 js 改变数据），Binder 会自动把数据更新到 View
- 当 View 变化了（比如用户操作界面改变数据），Binder 也会自动把数据更新到 Model

ViewModel 有两个主要部分：

- 监听器：**Observer** 对所有数据的属性进行监听
- 解析器：**Compiler** 对每个元素节点的指令进行解析，根据指令模版替换数据，绑定相应的更新函数

### SPA 应用 的首屏优化手段？

排查方向：

- 网络延时问题
- 资源文件体积过大
- 资源是否重复请求加载
- 加载脚本时渲染内容堵塞

解决：

- 减小入口文件体积
  - 路由懒加载
  - TerserPlugin 代码压缩
  - 开启 gzip 文件压缩 compression-webpack-plugin
- 采用 http 缓存策略，设置 cache-control，配合 last-modified 或 etag 响应头
- UI 框架按需加载

### Vue 在实例挂载过程做了什么？

vue 的\_init 函数分析 vue 初始化的时序，在`new Vue()`中，会执行`this._init()`

- **beforeCreate** 前，完成 初始化生命周期、事件系统、 render 方法

- **created** 前，初始化 inject、props、data、methods 和 provide

- **beforeMount** 前，完成模板编译，生成 render 函数

- **mounted** 前，生成 vnode，更新 dom 完成挂载

---

- initLifecycle(vm) 初始化生命周期

- initEvents(vm) 初始化事件系统

- initRender(vm) 初始化 render 方法，例如\$createElement

--- callHook(vm, 'beforeCreate') ---

- initInjections(vm) 初始化 inject

- initState(vm) 初始化 props、data、methods
- initProvide(vm) 初始化 provide

--- callHook(vm, 'created') ---

- 完成模板编译，生成 render 函数

--- callHook(vm, 'beforeMount') ---

- 生成 vnode

- 更新 dom 完成挂载

--- callHook(vm, 'mounted') ---

### Vue 实例挂载过程发生了什么？（或 Vue.\_init）【第 1 遍】

60 秒

1. 在 Vue 的构造函数中，会执行`this._init(options)` 函数，依次经历以下过程：

   init 初始化处理 `options` 的值 --> 调用 `$mount(vm.$options.el)` 挂载页面 --> 然后 compile 编译 template ->得到 render 函数 -> 再次调用 `mount` 方法，执行 `mountComponent` ，实例化`render Watcher`，调用 `updateComponent`以及 render 函数生成 vnode -> 然后 `_update` 更新 vnode 到 -> 真正的 dom 上。

2. 具体来说，通过生命周期分段：

- **beforeCreate** 前，完成 初始化生命周期、事件系统、 render 方法

  - initLifecycle(vm) 初始化生命周期
  - initEvents(vm) 初始化事件系统
  - initRender(vm) 初始化 render 方法，例如 \$createElement

- **created **前，初始化 inject、props、data、methods 和 provide

  - initInjections(vm) 初始化 inject
  - initState(vm) 初始化 props、data、methods

  - initProvide(vm) 初始化 provide

- **beforeMount **前，完成模板编译，生成 render 函数

- **mounted **前，生成 vnode，通过 patch 更新 dom 完成渲染

### 为什么 Vue 组件中的 data 必须是个函数？

- 在组件注册的时候，vue 会把这个组件传入的配置存下来，多次生成同一个组件的时候都会从存下来的配置中取值，然后通过 new 创建新的组件实例。
- 如果这时候 data 为对象 （引用类型的内存地址是一样的） ，那每次生成新的组件实例的 data 都指向了同一个内存区域，这时候其中一个同类型组件值更新了。其余的都会跟着一起更新
- 解决这个问题需要用函数的形式，这样每次实例化组件都通过 function 创建它们的独立作用域，返回一个新的对象

```
注册组件的本质实际上是建立一个组件构造器的引用，在使用时才会去实例化。也就是生成一个function。

实际上每个组件实例的data都会指向同个引用，所以需要用函数创建它们的独立作用域
```

### 说一下对 Vue 的生命周期的理解？

Vue 实例从创建到销毁的过程就是生命周期。就像一条流水线：从创建实例、初始化数据、编译模版、挂载 Dom、渲染、更新、卸载等一系列过程

生命周期钩子函数主要有：

beforeCreate > created > beforeMount > mounted > beforeDestory > destroyed

- beforeCreate：执行时组件实例还未创建，通常用于插件开发中执行一些初始化任务
- created：组件初始化完毕，各种数据可以使用，常用于异步数据获取
- beforeMount：未执行渲染、更新，dom 未创建
- mounted：初始化结束，dom 已创建，可用于获取访问数据和 dom 元素
- beforeUpdate：更新前，可用于获取更新前各种状态
- updated：更新后，所有状态已是最新
- beforeDestroy：销毁前，可用于一些定时器或订阅的取消
- destroyed：组件已销毁，作用同上

### 父子组件生命周期的执行顺序？

父子组件的生命周期执行顺序为：

1、父 beforeCreate => 父 created => 父 beforeMount

2、=> 子 beforeCreate => 子 created => 子 beforeMount => 子 mounted => 父 mounted

3、=> 父 beforeDestroy => 子 beforeDestroy => 子 destroyed => 父 destroyed

### 数据请求在 created 和 mouted 的区别?

created 和 mounted 都能拿到实例对象的属性和方法，区别在于 created 是在实例创建完成就调用，此时还没有渲染页面 dom 节点，而 mounted 是在页面 dom 节点渲染完成之后调用，如果把数据放进 mounted 请求 可能会出现页面闪动的情况，建议放在 created 中实现

### 🌟 Vue 组件之间的通信方式？

- 一般的父子组件可以用 props 和 emit 通信
- 层级比较深或者兄弟组件可以考虑用 eventBus 或者 vuex
- 当出现子组件以 slot 方式应用在父组件，或层级很深，可以用 provide/inject

### 🌟 如果不用 new Vue 的方式如何实现 eventBus？

通过 new class 创建一个 EventBus 类，里面用一个变量存储订阅的事件名和方法，实现 vue 里面的 $on 和 $emit 方法，相当于手动实现一个发布订阅的模式

````js
function EventBus(){
	this.msgQueues = []
}
EventBus.prototype = {
  on: function(msg, fn) {
    this.msgQueues[msg] = fn
  },
  emit: function(msg, data) {
    this.msgQueues[msg](data)
  },
  off: function(msg) {
    delete this.msgQueues[msg]
  }
}
​```
````

### Vue 组件和插件有什么区别？

- 组件就是将图形和逻辑组合成一个功能的概念。在 Vue 中一个 .vue 文件就可以看作是一个组件

- 插件通常用来为 `Vue` 添加全局功能，比如我们用到的 VueX、VueRouter

区别：

- 编写上，组件通常使用 .vue 单文件格式，而 插件通常是一个 js 文件并暴露 install 方法
- 注册方式上，组件使用 Vue.component 的方式注册，而插件使用 Vue.use() 的方式
- 使用场景，组件主要是构成业务模块，而插件主要是对 Vue 功能的扩展

### 讲一下 VueX

Vuex 是一个专为 Vue 应用程序开发的**状态管理模式**。它采用集中式存储管理应用的所有组件的状态，保证状态以一种可预测的方式发生变化

VueX 实现了一个单向数据流，

- 全局拥有一个 state 存放数据，并通过命名空间 Module 管理，通过 getters 访问（当访问多个 state 可以用 ...mapState）

- 更改状态的唯一方法是提交 mutation

  - 同步操作：通过 commit mutation 修改数据
  - 异步操作：通过 dispatch Action 再 commit mutation 修改数据

### computed 和 watch 的区别？

- computed 的本质是 computed watcher
- watch 的本质是 user watcher
- computed 适用于在模版渲染中，某个值是依赖了其他响应式对象或者是计算属性计算而来的；
- watch 适用于观测某个值的变化去实现一段复杂的业务逻辑

### 🌟 Keep-alive 组件的使用与普通组件有什么不同？

keep-alive 的应用场景：当我们不希望组件被重新渲染，并且能够缓存操作页面的时候，可以用 keep-alive 包裹住动态组件

与普通组件的区别：

- 是一个抽象组件，本身不会渲染 dom，也不会出现在父组件中
- 当组件在内被切换时，能缓存住不活动的组件实例，而不是销毁它们，当再次回到相同组件时，直接调用 activated 钩子函数而不是 created 函数，也就是说 被 keep-alive 包裹的组件，会多出两个生命周期钩子函数：activated、deactivated

### 🌟 vue 的动态组件如何使用？

使用 vue 内置的 component 组件，根据 is 属性值决定哪个组件被渲染

### 🌟 VueRouter 路由原理？

VueRouter 是什么？

VueRouter 是一个**路由管理器**，而 Vue 的单页面应用是基于路由和组件的。

路由描述了 ：

- URL 与 UI 之间的映射关系，
- 前端通过手动改变 URL，监听 URL 的变化来实现 UI 更新，但不会向后端发起请求

**Vue-Router**提供了两种模式：

- hash 模式，地址栏中带有 # 号，使用 `window.location.hash` 改变 hash 值， 通过 `window.onhashchange` 事件监听 hash 值的变化，重新渲染 routerView，
- history 模式，地址栏中没有 # 号，使用 history api，通过监听`window.onpopstate` 事件来实现页面组件渲染，`history.pushState` 和 `history.replaceState` 不会触发 `window.onpopState` 事件（只有浏览器的前进后退才会触发 popstate 事件，pushState、replaceState 时需要手动更新 UI）
- history 模式的 url 是真实 url，服务器会对 url 文件路径进行资源查找，找不到资源就会返回 404

VueRouter 提供的路由守卫主要是用来通过跳转或取消的方式守卫导航。路由守卫有三种：全局的、单个路由的、组件的

### 🌟 **全局路由守卫使用**

Vuerouter 提供的路由守卫主要是用来通过跳转或取消的方式守卫导航。路由守卫有三种：全局的、单个路由的、组件的

使用 router.beforeEach 注册

```js
const router = new VueRouter({...})
router.beforeEach((to, from, next) => {
  if (to.name !== "Login" && !isLogin) {
    next({name: "Login"})
  } else {
    next()
  }
})
```

全局守卫接收三个参数：

- to：即将要进入的目标 路由对象
- from： 当前导航正要离开的 路由对象
- next：必须调用来 resolve 钩子

**组件内的守卫**：

- beforeRouteEnter(to, from, next)：当守卫执行前，组件实例还没被创建，不能获取 this
- beforeRouteUpdate(to, from, next)：组件复用时执行，能访问 this
- beforeRouteLeave(to, from, next)：离开该组件时执行，能访问 this

### 导航解析流程（Router）？

1. 导航被触发
2. 在失活的组件里面调用 beforeRouteLeave 守卫
3. 调用*全局的 beforeEach 守卫*
4. 在复用的组件里面调用 beforeRouteUpdate 守卫
5. 在路由配置里面调用 beforeEnter
6. 解析异步路由组件
7. 在被激活的组件里面调用 beforeRouteEnter 守卫
8. 调用*全局的 beforeResolve 守卫*
9. 导航被确认
10. 调用*全局的 afterEach 守卫*
11. 触发 DOM 更新
12. 调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入

### 什么是 nextTick ？

将回调推迟到下一个 DOM 更新周期之后执行。在修改数据之后立即使用这个方法，获取更新后的 DOM。

可以理解成：Vue 在更新 DOM 时是异步执行的，当数据发生变化，Vue 将开启一个异步更新队列，视图需要等待队列中所有的数据变化完成后，再进行统一更新

```
// html
<div id="app">{{ message }}</div>
// vue
const vm = new Vue({
	el: "#app",
	data: {
	message: "原始值"
	}
})
// js 修改 message
this.message = "修改后的值1"
this.message = "修改后的值2"
this.message = "修改后的值3"
console.log(vm.$el.textContent) // 原始值

```

源于 Vue 文档上的解释：Vue 异步执行 DOM 更新。只要观察到数据变化，Vue 将开启一个队列，并缓冲在同一个事件循环中发生的所有数据改变。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作非常重要，然后在下一个事件循环 “tick” 中，Vue 刷新队列并执行实际的工作

为什么需要 异步更新？

假如是同步更新，会有以下的情况：

```js
this.message = "更新一次"; // DOM 更新一次
this.message = "更新一次"; // DOM 更新两次
this.message = "更新一次"; // DOM 更新三次
```

但事实上，我们只需要最后一次更新，而前两次 DOM 更新是可以省略的，我们只需要等待状态都修改好了之后再进行渲染就可以减少一些无用功

在 Vue2 中组件内部使用了 VirtualDOM 进行渲染，也就是说，组件内部实际是不关心哪个状态发生了变化，它只需要计算一次就可以得知哪些节点需要更新，如果改变了 N 个状态，其实只需要发送一个信号就可以将 DOM 更新到最新，比如：

```js
this.message = "更新";
this.age = 23;
this.name = "Yolanda";
```

这里我们分三次改变了三种状态，但实际上 Vue 只会更新渲染一次，因为 VirtualDOM 只需要一次就可以将整个组件的 DOM 更新到最新，它不关心更新信号到底是哪个具体状态发出

如何才能将渲染操作推迟到所有状态都修改完毕呢？很简单，**只需要将渲染操作推迟到本轮事件循环的最后或者下一轮事件循环**

也就是说，只需要在本轮事件循环的最后，等待前面更新状态语句都执行完之后，执行一次渲染操作，就可以无视前面各种更新状态的语法，只在最后渲染一次就可以了

Vue 在内部尝试对异步队列使用原生的 `Promise.then` 和 `MessageChannel`，将渲染操作推迟到本轮事件循环的最后，如果执行环境不支持，会采用 `setTimeout(fn, 0)` 代替，降级到下一轮。当同一轮事件循环中反复修改状态时，并不会反复向队列中添加相同的渲染操作

源码：

```js
export function nextTick(cb?: Function, ctx?: Object) {
  let _resolve;
  // 加入到队列中，前面都是执行更新 dom 的函数
  // 所以执行完更新 dom 的函数，这个 cb 就能拿到最新的 dom 值
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, "nextTick");
      }
    } else if (_resolve) {
      _resolve(ctx); // 执行 then 函数
    }
  });
  // 上锁 多次使用 nextTick 只需要把 cb 放进队列中
  if (!pending) {
    pending = true;
    timerFunc(); // 异步执行
  }
  if (!cb && typeof Promise !== "undefined") {
    return new Promise((resolve) => {
      _resolve = resolve;
    });
  }
}
```

写一个简单的 nextTick 函数

```js
let pending = false;
let callbacks = [];
function flushCallbacks() {
  pending = false;
  callbacks.forEach((cb) => cb());
  callbacks = [];
}
function nextTick(cb) {
  callbacks.push(cb);
  if (!pending) {
    pending = true;
    Promise.resolve().then(flushCallbacks);
    // 如果不支持 Promise
    // setTimeout(flushCallbacks, 0)
  }
}
console.log("start");
Promise.resolve().then(() => {
  console.log("promise.then1");
});
nextTick(() => {
  console.log("nextTick");
});
Promise.resolve().then(() => {
  console.log("promise.then2");
});
console.log("end");
// 结果为：
// start end promise1 nextTick promise2
// 如果将 nextTick 改成使用 setTimeout 则新结果为
// start end promise1 promise2 nextTick
```

### 为什么`vm.data = 'new value'`之后，不能拿到最新的值？

如果这么写，是不能拿到值的

```js
vm.data = "new value";
console.log(dom.data); // 旧值，dom异步更新
```

更新 dom 是异步的，所以上面写法不能拿到最新的值，所以必须使用 nextTick 来把`console.log(dom.data)`放到回调队列中后面，也就是 dom 更新函数的后面。

```js
div.innerHTML = "123";
console.log(div.innerHTML); // '123'
```

vue 为什么要使用异步更新队列？

避免频繁操作 dom，更新 dom

源于 vue 文档上的解释：Vue **异步**执行 DOM 更新。只要观察到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据改变。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作上非常重要。然后，在下一个的事件循环“tick”中(也不一定是下一个事件循环，用了 promise 就是同个循环)，Vue 刷新队列并执行实际 (已去重的) 工作。

当状态发生改变的时候，vue 采用异步执行 dom 更新

有篇文章写得很好，https://github.com/berwin/Blog/issues/22

主要是为了性能优化，减少无用的 dom 更新，例如

```js
vm.a = 1;
vm.a = 2;
vm.a = 3;
```

如果是每次数据改变，都要去更新 dom 的话，成本太高，其实用户要的只是最后一次更新，所以在同步任务中去用缓冲队列处理，然后通过异步来更新 dom。

Vue 优先将渲染操作推迟到本轮事件循环的最后，如果执行环境不支持会降级到下一轮

当同一轮事件循环中反复修改状态时，并不会反复向队列中添加相同的渲染操作，也就是 render watcher

### v-if 和 v-show 的区别

这两者的区别主要是：

- 控制手段：v-show 隐藏是通过为元素添加 css 属性 display:none ，dom 元素依然存在；v-if 隐藏则是将 元素整个删除
- 编译过程：v-if 切换会有一个局部编译或卸载的过程，即销毁或重建内部的事件监听和子组件；v-show 切换只是简单的 css 属性变化；v-if 由 false 变 true 会触发组件的生命周期钩子 而 v-show 不会
- 性能消耗：v-if 有更高的切换消耗，v-show 有更高的初始渲染消耗
- 如果需要频繁地切换，建议使用 v-show；如果运行时条件很少变化，建议使用 v-if

再深入点说的话：

- v-if 会调用 addIfCondition 方法，生成 vnode 的时候会忽略对应节点，render 的时候就不会渲染
- v-show 会生成 vnode，render 的时候会渲染成真实节点，只是 render 过程中会在节点的属性中修改 style 值

### v-if 和 v-for 的优先级是什么？为什么不建议在 v-for 中使用 v-if ？

- v-if 指令是指条件的渲染内容
- v-for 指令是指基于一个数组渲染一个列表

在 vue 模版编译时，会将指令系统转化成可执行的 render 函数

从 vue 源码的 genElement 函数可以知道 v-for 的优先级比 v-if 高

至于为什么不建议把 v-if 和 v-for 一起使用，

是因为会带来性能浪费==>每次渲染前都会先循环再进行条件判断

### 说一下编译、渲染和更新过程

首先使用 parse 函数 将模版抽象为 AST 语法树，然后使用 optimize 函数遍历语法树，做静态标记目的是优化响应式性能，然后通过 generate 函数将语法树转换成 render function string

首先谈下编译：

模板解析为 AST，优化 AST，将 AST 转化成 render function string，也就对应着 parse、optimize、generate 函数

```js
export const createCompiler = createCompilerCreator(function baseCompile(
  template: string,
  options: CompilerOptions
): CompiledResult {
  const ast = parse(template.trim(), options);
  if (options.optimize !== false) {
    optimize(ast, options);
  }
  const code = generate(ast, options);
  return {
    ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  };
});
```

**parse**

生成 ast

```js
{
    // 类型
    type: 1,
    // 标签
    tag,
    // 属性列表
    attrsList: attrs,
    // 属性映射
    attrsMap: makeAttrsMap(attrs),
    // 父节点
    parent,
    // 子节点
    children: []
}
```

**optimize**

遍历递归每个 ast 节点，标记静态的节点，这些节点是不需要 diff 的

**generate**

接收 ast，把 ast 转换成 render 字符串函数，比如`_c('div', [_c('span')])`

执行 render 函数，生成 vnode，挂载到 dom 上

```js
const vnode = vm._render();
updateComponent = () => {
  vm._update(vnode, hydrating);
};

vm._update = function() {
  vm.$el = vm.__patch__(prevVnode, vnode); // 挂载dom
};
```

顺便看看\$forceUpdate

原来\$forceUpdate 只会让当前组件的 render watcher 更新，仅仅影响实例本身和插入插槽内容的子组件，而不是所有子组件。

```js
Vue.prototype.$forceUpdate = function() {
  const vm: Component = this;
  if (vm._watcher) {
    vm._watcher.update();
  }
};
```

更新过程

数据改变，`watcher.run` -> `updateComponent` -> `vm._update(_vm.render())` -> `vm.__patch__` -> diff vnode -> 更新视图

### 如何实现双向绑定？

1. new Vue() 初始化时，会对 data 执行响应式处理，这个过程发生在 Observe
2. 同时，对模版进行编译，找到其中动态绑定的数据，从 data 中获取并初始化视图，这个过程发生在 Compile
3. 定义一个更新函数和 Watcher，将来数据变化时，Watcher 会调用更新函数
4. 因为 data 中的 key 可以在视图中出现多次，所以每个 key 都需要一个管家 Dep 管理多个 Watcher
5. 以后，data 中的数据一旦发生变化，会先找到对应的 Dep，通知所有的 Watcher 执行更新函数

### vue3的响应式原理？

1. 依赖收集
2. 依赖更新

**如何实现自动操作track和trigger？**

**vue2**使用 es5 的 Object.defineProperty() 实现
**vue3**使用 es6 的 Proxy 和 Reflect 实现

```javascript
// 1 初始化 targetMap 保存多个观察对象，每个对象作为单独的key
const targetMap = new WeakMap()
let activeEffect = null
const effect = eff => {
  activeEffect = eff
  activeEffect()
  activeEffect = null
}
// 2 收集依赖
const track = (target, key) => {
  if (!activeEffect) return
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    // 如果未保存过当前对象key，则添加观察对象作为key，值为待补充的map
    targetMap.set(target, (depsMap = new Map()))
  }
  let dep = depsMap.get(key)
  if (!dep) {
    // 如果该map无该属性的key键（值为副作用）
    depsMap.set(key, (dep = new Set()))
  }
  dep.add(activeEffect)
}
// 3 执行指定对象的指定属性的所有副作用
const trigger = (target, key) => {
  const depsMap = targetMap.get(target)
  if (!depsMap) return
  const dep = depsMap.get(key)
  if (!dep) return
  dep.forEach(effect => effect())
}

// 4 响应式处理
const reactive = (target) => {
  // 1 封装统一处理函数
  const handler = {
    get(target, key, receiver) {
      console.log('正在读取的数据：',key);
      const result = Reflect.get(target, key, receiver);
      track(target, key);  // 自动调用 track 方法收集依赖
      return result
    },
    set(target, key, value, receiver) {
      console.log('正在修改的数据：', key, ',值为：', value);
      const oldValue = target[key];
      const result = Reflect.set(target, key, value, receiver);
      if(oldValue !== result){
        trigger(target, key);  // 自动调用 trigger 方法执行依赖
      }
      return result
    }
  }
  // 2 统一调用 proxy 函数
  return new Proxy(target, handler)
}
const product = reactive({ price: 10, quantity: 2 })
let total = 0
// const effect = () => { total  = product.price * product.quantity }
console.log(`total: ${total}`); // total: 0
effect(() => {total = product.price * product.quantity})
console.log(`total: ${total}`); // total: 20
product.price = 20
console.log(`total: ${total}`); // total: 40
```

### 实现 vue3 的 ref 函数
```js
// 方式1 实现一个 ref
const ref = initialValue => reactive({value:initialValue})
const testRef = ref({a: 2})
console.log(testRef.value)

// 方式2
const ref2 = raw => {
  const r = {
    get value() {
      track(r, 'value')
      return raw
    },
    set value(newValue) {
      raw = newValue
      trigger(r, 'value')
    }
  }
  return r
}
const testRef2 = ref2(0)
console.log(testRef2.value)
```

### 实现 vue3 的 computed
```js

```

### 实现一个简单的响应式系统

步骤：

- 引入一个 Observer 类，将数据变成响应式，利用 Object.defineProperty() 对属性的 getter、setter 改写
- 在数据读取 getter 阶段进行依赖收集、在数据改写 setter 阶段进行依赖更新

```js
class MyVue {
  inieData(options) {
    if (!options.data) return;
    this.data = options.data;
    // 将数据重置 getter、setter
    new Observer(options.data);
  }
}
class Observer {
  constructor(data) {
    // 实例化时，执行 walk 对每个属性改写 getter、setter
    this.walk(data);
  }
  walk(obj) {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      // Object.defineProperty 处理
      defineReactive(obj, keys[i]);
    }
  }
}
```

**依赖本身 Watcher**

**依赖管理 Dep**

**依赖管理过程 defineReactive**

### Vue 的双向绑定原理？

vue 的双向绑定是通过**数据劫持**和**观察者模式**来实现的，Vue 提供了一个 Observer 类，这个类的目的是将数据变成响应式对象，利用了 Object.defineProperty() 方法遍历递归对象的属性，对每个属性的 getter、setter 方法进行改写。在数据读取，也就是 getter 阶段，会进行**依赖收集**，在数据改写，也就是 setter 阶段，会进行**依赖更新**

- 依赖收集就是订阅数据变化的 watcher 的收集，当这些响应式数据发生变化，触发了它们的 setter 时，应该通知哪些订阅者去做相应的逻辑处理
- 派发更新是当数据发生改变后，通知所有的订阅这个数据变化的 watcher 执行 update，会把所有要执行的 update 的 watcher 推入到队列中，在 nextTick 后执行 flush

![](../.vuepress/public/images/2021-07-19-16-37-34.png)

```
双向绑定由三个部分构成：

- Mode 数据层
- View 视图层
- ViewModel 业务逻辑层

专业名称为 MVVM 框架，核心功能是“数据双向绑定”，意思就是数据更新后更新视图，视图变化后更新数据
```

### 说一下 Object.defineProperty 的缺陷

- 无法监听通过下标方式修改数组和对象新增属性

- 数组是通过改变数组的原型链，然后重写'push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'这几个方法实现派发更新

- 可以使用 this.\$set 来解决这类问题

### vue 3 为什么用 proxy API 代替 vue2 的 defineProperty API？

响应式优化

- defineProperty API 的局限性是它只能针对单个属性做监听，无法监听通过下标方式修改数组和对象新增属性，我们在 vue2 中监听整个对象，实际上是 defineProperty 对属性做了遍历递归，重新定义了每个属性的 getter 和 setter 方法
- Proxy API 的监听是针对一个对象的，那么对这个对象的所有操作会直接进入监听操作
- Proxy API 实现的响应式是惰性的，它的处理是在 getter 中递归响应式，所以只有对象在访问到才会变成响应式；而 defineProperty 劫持对象内部深层次的变化，需要递归遍历整个对象，将每一层的数据都变成响应式，会有很大的性能消耗

监测数组的时候可能触发多次 get/set，如何防止触发多次呢？

答：可以判断 key 是否为当前被代理对象 target 的自身属性，也可以判断旧值和新值是否相等，只有满足以上两个条件之一，才有可能执行 trigger

### diff 算法

diff 算法 是一种通过同层树节点进行比较的高效算法，特点是：

- 比较只会在同层级比较，不会跨层级比较
- 在 diff 比较过程中，循环从两边向中间比较

应用：在 Vue 中，作用于 虚拟 DOM 渲染成真实 DOM 的新旧 VNode 节点比较

### 为什么要使用 diff 算法？

减少 dom 的更新量，找到最小差异部分的 dom，就是尽可能的复用旧节点，最后只更新新的部分即可，减少节点 dom 的新增和删除等操作

**diff 比较过程**

在 diff 过程中，首先需要判断两个节点是否是相同类型的节点，用 **sameVnode** 方法：

```js
function sameVnode(a, b) {
  return (
    a.key === b.key && // key 值
    ((a.tag === b.tag && // 标签类型
    a.isComment === b.isComment && // 是否为注释节点
    isDef(a.data) === isDef(b.data) && // 是否都定义了 data
      sameInputType(a, b)) || // 当标签类型为 input 时，type 必须相同
      (isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)))
  );
}
```

看看 patch 函数，也就是`Vue.prototype.__patch__`，源码`core/vdom/patch.js`

源码太长，精简一下

```js
function patch(oldVnode, vnode) {
  if (!oldVnode) {
    createElm(vnode);
  } else if (sameVnode(oldVnode, vnode)) {
    patchVnode(oldVnode, vnode);
  } else {
    createElm(vnode);
    removeVnodes(oldVnode);
  }

  return vnode.elm;
}
```

**patch** 函数 分为三个流程：

1. 没有旧节点，直接全部新建
2. 旧节点和新节点自身一样，则比较它们的的子节点
3. 旧节点和新节点不一样，则创建新节点，删除旧节点

当我们确定两个节点值得比较后(sameVnode)，会对两个节点执行 patchVnode 方法

```js
patchVnode (oldVnode, vnode) {
    const el = vnode.el = oldVnode.el
    let i, oldCh = oldVnode.children, ch = vnode.children
    if (oldVnode === vnode) return
    if (oldVnode.text !== null && vnode.text !== null && oldVnode.text !== vnode.text) {
        api.setTextContent(el, vnode.text)
    }else {
        updateEle(el, vnode, oldVnode)
        if (oldCh && ch && oldCh !== ch) {
            updateChildren(el, oldCh, ch)
        }else if (ch){
            createEle(vnode) //create el's children dom
        }else if (oldCh){
            api.removeChildren(el)
        }
    }
}
```

**patchVnode** 函数做了以下工作：

- 找到对应的真实 dom，称为 el
- 判断 Vnode 和 oldVnode 是否指向同一个对象，如果是直接 return
- 如果它们都有文本节点且不相等，则将 el 的文本节点设为 Vnode 的文本节点
- 如果 oldVnode 有子节点 而 Vnode 没有，则删除 el 子节点
- 如果 oldVnode 没有子节点 而 Vnode 有，则将 Vnode 的子节点真实化后添加到 el
- 如果两者都有子节点，则执行 updateChildren 函数 比较子节点

**updateChildren** 函数，循环对比：

简单概况就是：

1. 先找不需要移动的相同节点，比如新头旧头、新尾旧尾，消耗最小
2. 再找节点相同但需要移动的节点，比如新头旧尾、新尾旧头、单个查找，消耗第二小
3. 最后找不到，新建删除节点，保底处理

再细说下：

1. 新头旧头比较、新尾旧尾比较，如果一样则不移动
2. 旧头和新尾比较，一样则操作 dom，把旧头移动尾部
3. 旧尾和新头比较，一样则操作 dom，把旧尾移动头部
4. 拿新节点到旧节点数组中遍历，存在 sameVnode 为 true 就移动旧节点，不存在就新建节点
5. 如果新旧节点都有 key，那么会根据旧节点的 key 生成一个 hash 表，用新节点的 key 与 hash 表做匹配，匹配成功则判断是否为 sameVnode，满足 true 则进行 patchVnode，不满足则新建节点
6. 如果新节点遍历完了，旧节点还有剩余，就让 dom 逐个删除旧节点
7. 如果旧节点遍历完了，新节点还有剩余，全部新建节点

这样 diff 的原因，是为更高效找到和新节点一样的旧节点，然后只需要移动位置，避免了大量的创建或删除 dom

参考文章

[https://zhuanlan.zhihu.com/p/81752104](https://zhuanlan.zhihu.com/p/81752104)

[https://ustbhuangyi.github.io/vue-analysis/v2/reactive/component-update.html](https://ustbhuangyi.github.io/vue-analysis/v2/reactive/component-update.html)

### 为什么需要用 key？

key 的主要作用是为了高效的更新虚拟 DOM，原理是 Vue 在 patch 过程中，sameNode 函数有一项是通过 key 判断两个节点是否是同一个，从而避免频繁地更新不同的元素。如果没有 key 相当于全部组件节点都要重新创建和销毁，有了 key 如果新旧节点一样，最多只是移动位置，可以让整个 patch 过程更加高效，减少 dom 操作，提高性能

### 为什么不要用索引 index、随机数当 key？

答：对性能上的优化有影响，需要分情况讨论：

1. 如果渲染数组的顺序颠倒(reverse 方法)，index 值虽然不会改变，但节点内容变化了，如果是纯标签 li 这种，vue 就会直接改变元素内容，但如果是组件，有 props 的情况下，diff 过程会发现 props 的改变，然后触发组件视图的重新渲染，必然会导致 dom 的操作

2. 如果是数组[1,2,3] 中插入一个值，变成[1,4,2,3]，那么之前的 2，3 索引 key 值就会从 1，2 变成 2，3，key 变化了，sameVnode 肯定为 false，本来只需要新建一个组件，现在变成新建三个，更新成本增加了

3. 如果是数组[1,2,3] 使用 slice(0,1) 删除了第一个节点，那么之前的索引 key 从 0，1，2 变成 0，1，经过 vue 的比较，因为 key 都有 0，1 会认为前面两个节点都没有变，变的是少了 key 为 2 的节点，也就是最后一个，所以前面两个节点直接复用，把最后一个节点删了（如果是单纯的文本节点，patchVnode 会直接更新 dom，察觉不到 页面是删除最后一个节点，如果不是文本节点，就会有明显问题）

   ```vue
   // 非文本节点
   <li v-for="(val, idx) in arr" :key="idx">
      <comp :val="idx"/>
    </li>
   // 单纯文本节点
   <li v-for="(val, idx) in arr" :key="idx">{{idx}}</li>
   ```

随机数的情况

用随机数的话，这样新旧 vnode 的 key 全都不一样，很尴尬，vue 直接判断全都不是 sameVnode，全部重头再来~

### 虚拟 DOM 是什么？

虚拟 dom 本质上就是用 js 对象描述 dom 节点，在 vue 中就是用 vnode 来描述

比如一个 vnode 实例

```js
{
  tag: 'div',
  data: {},
  children: [],
  parent: vnode,
  text: '',
  key: '',
}
```

**虚拟 dom 有什么优点？**

1、可以用 vnode 进行 diff，实现旧节点复用，减少 dom 的创建开销，并且无须手动操作 dom

2、和 dom 操作比起来，js 计算极其便宜

3、跨平台，服务端渲染，weex

**缺点？**

渲染大量的 dom 时，多了一层虚拟 dom 的计算，会比 innerHTML 慢

"Virtual DOM 真正的价值从来都不是性能，而是它

1. 为函数式的 UI 编程方式打开了大门；

2. 可以渲染到 DOM 以外的 backend，比如 ReactNative。"

### 🌟 vue 3 与 vue 2 的区别？

- Composion API
- 响应式优化 使用 Proxy 代理对象
- 引入 Tree-Shaking 清除无用代码，减小程序体积
- Vue 3 是基于 TS 编写的，提供了更好的类型检查，能支持复杂的类型推导
- 编译优化，添加属性标记，生成 block tree 静态树
  - 如果我们有许多的静态节点，只有一个动态节点，我们希望 text 变化时只更新动态节点的 diff ，这样可以避免很多不必要 diff 。然而，这点在 vue2 中是做不到的。因此，vue3 中重写了 diff 算法，添加了属性标记，通过编译阶段对静态模板的分析，编译生成了 block tree 。
  - block tree 是一个将模板基于动态节点指令切割的嵌套区块，每个区块内部的节点结构是固定的，而且每个区块只需要以一个 Array 来追踪自身包含的动态节点

### vue 3 新特性

- ref() 函数接受参数并返回它包装在具有 value 属性 的对象中，适用于基本类型，创建了响应式数据
- reactive() 函数也是创建了响应式数据，但它只适用于对象或数组
- toRefs() 函数将 reactive 创建的响应式数据转换为普通对象，但这个对象的每个属性，都是 ref() 类型的响应式数据

## webpack

webpack 是模块打包工具，通过一个配置文件，找到入口文件，从这个入口文件开始，找到所以的依赖，构建依赖图，然后进行打包、编译、压缩、优化，最终生成一个浏览器可以直接运行的 js 文件

### 🌟 webpack 5 的新特性

- tree-shaking 的对比，打包体积更小

- 内置了 Prepack 能力，是 FaceBook 开源的一个代码优化工具，生成优化后的代码，能在编译时对代码进行预计算

- `sideEffects` 标识代码是否有副作用，例如 css 文件有副作用，不做 tree shaking，可以在 packjson 中设置

- splitChunk 可以指定不同类型的大小，分割 chunk 可以更加精确

- 内置 web worker 能力，借助 worker-loader ，Web Worker 为 Web 内容在后台线程中运行脚本提供了一种简单的方法。线程可以执行任务而不干扰用户界面。通常，我们可以将一些加解密或者图片处理等一些比较复杂的算法置于子线程中，当子线程执行完毕之后，再向主线程通信

- 丢弃 cacher-loader，采用自带缓存（对 module 和 chunk 进行缓存）

  ```js
  // webpack.config.js
  module.exports = {
      ...,
      cache: {
          type: 'filesystem',
          // 可选配置
          buildDependencies: {
              config: [__filename],  // 当构建依赖的config文件（通过 require 依赖）内容发生变化时，缓存失效
          },
          name: '',  // 配置以name为隔离，创建不同的缓存文件，如生成PC或mobile不同的配置缓存
          ...,
      },
  }
  ```

* webpack 5 前，对 img、svg 资源打包需要额外配置 loader，比如 raw-loader、file-loader、url-loader

  - webpack5 内置了静态资源构建，实现打包和分目录存放（assets），设置对应的 type

    - asset/source ——功能相当于 raw-loader。
    - asset/inline——功能相当于 url-loader，若想要设置编码规则，可以在 generator 中设置 dataUrl。
    - asset/resource——功能相当于 file-loader。项目中的资源打包统一采用这种方式，得益于团队项目已经完全铺开使用了 HTTP2 多路复用的相关特性，我们可以将资源统一处理成文件的形式，在获取时让它们能够并行传输，避免在通过编码的形式内置到 js 文件中，而造成资源体积的增大进而影响资源的加载。
    - asset—— 默认会根据文件大小来选择使用哪种类型，当文件小于 8 KB 的时候会使用 asset/inline，否则会使用 asset/resource。也可手动进行阈值的设定

    ```js
    // webpack.config.js
    module.exports = {
        ...,
        module: {
          rules: [
              {
                test: /\.(png|jpg|svg|gif)$/,
                type: 'asset/resource',
                generator: {
                    // [ext]前面自带"."
                    filename: 'assets/[hash:8].[name][ext]',
                },
            },
          ],
        },
    }
    ```

### 说一下你对 Webpack 的理解，做了什么优化？

Webpack（https://webpack.js.org）是一个模块打包工具，在 Webpack 里一切文件皆模块，通过配置，找到入口文件，然后从这个入口文件开始，找到所以的依赖，构建依赖图，然后进行打包、编译、压缩、优化，最终生成一个浏览器可以直接运行的 js 文件。

现代前端开发已经变得十分复杂，我们开发过程过程中会遇到如下的问题：

- JavaScript 需要 <u>模块化</u>，HTML 和 CSS 这些资源文件也会面临需要被模块化的问题。
- 使用一些 <u>高级的特性</u> 来加快我们的开发效率或安全性，比如通过 ES6+、TypeScript 开发脚本逻辑，使用 Sass、Less 等预处理器编写 css 样式代码
- <u>监听文件的变化</u> 并且反映到浏览器上，提高开发的效率。
- <u>开发完成后</u> 我们还需要将代码进行压缩、合并以及其他相关的优化。

Webpack 可以自动化地解决这一系列复杂的问题，解放我们的生产力。

### 🌟 简单说一下 Webpack 的构建流程？

三大步骤：

1. **初始化流程**：从配置文件和 shell 语句中读取与合并参数，使用参数初始化 Compiler 对象，加载所有配置的**插件**，执行对象的 run 方法 开始编译
2. **编译构建流程**：根据配置确定 entry 文件，从入口文件出发，调用所有配置的 Loader 对 Module 进行翻译，再找到该 Module 依赖的 Module，递归地进行编译处理
3. **输出流程**：对编译后的 Module 组装成包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表

### module 循环依赖如何解决？

- Common 因为会对已加载的模块会进行缓存，不会重复加载，所以出现循环依赖时才不会出现无限循环调用的情况。
  **解决方法**：先将本模块的值 module.exports 出去，再 require 其他模块

- ES6 的 import 是在编译阶段执行的，这样就使得程序在编译时就能确定模块的依赖关系，一旦发现循环依赖，ES6 本身就不会再去执行依赖的那个模块了，所以 ES6 本身就支持循环依赖，保证程序不会因为循环依赖陷入无限调用，
  **解决方法**：推荐使用 webpack 插件 circular-dependency-plugin 来帮助你检测项目中存在的所有循环依赖

### 🌟 说说 webpack 中常见的 Loader？解决了什么问题？

常见的 loader：

- 处理 css 的有：style-loader、css-loader、sass-loader
- 处理 js、vue 的有：babel-loader、vue-loader
- 处理图片、文件的有：file-loader、url-loader

webpack 只支持对 js 文件打包，遇到 css、sass、img 等文件时，需要根据配置对应的 loader 进行文件内容的解析。所以 loader 负责模块的转义工作，遵循单一原则，支持链式调用，每个 loader 拿到源文件内容，处理完成后返回给 webpack，可以把 loader 看作是一个处理函数

### 🌟 说说 webpack 中常见的 Plugin？解决了什么问题？

plugin 本质是一个具有 apply 方法 javascript 类，apply 方法会被 webpack compiler 调用，并且在整个编译生命周期都可以访问 compiler 对象，plugin 拓展了 webpack 的一些功能，webpack 在运行时会广播出许多事件，在 plugin 中订阅这些事件，然后在合适的时机通过 webpack 提供的 api 改变输出的结果。比如打包优化、资源管理、环境变量注入等等，plugin 会运行在 webpack 的不同阶段，贯穿了 webpack 整个编译周期，目的是解决 `loader` 无法实现的事情。

常见的 plugin：

- 打包优化类型：
  - compression-webpack-plugin：开启 gzip，预先准备的资源压缩版本，使用 Content-Encoding 提供访问服务
  - DllPlugin 与 DllReferencePlugin： 两个搭配使用进行资源分包，资源分包后需要注入到 html
  - add-asset-html-webpack-plugin：资源注入
  - webpack-parallel-uglify-plugin：开启多个子进程，把文件压缩的工作分别给多个子进程去完成，每个子进程还是通过 webpack 的默认插件 UglifyJS 去压缩代码。并行处理压缩，效率会更加的提高
- 文件处理类型：
  - html-webpack-plugin：打包结束后生成一个 html，并引入打包后的 js 模块
  - clean-webpack-plugin：清理构建目录

### Loader 和 Plugin 的区别？编写 Loader，Plugin 的思路？

两者有明显的区别：

- 处理方面：
  - loader 实质是一个转换器，能够加载资源文件，并对这些文件进行编译、压缩等处理，最终一起打包输出到指定文件
  - plugin 赋予了 webpack 各种灵活的功能，比如打包优化、资源管理、环境变量注入等等，目的是解决 loader 无法实现的其他问题
- 运行时机：loader 是运行在打包文件之前，plugin 是在整个编译周期都起作用

**编写 loader 的思路**：

根据 loader 职责单一的特性，我们只需要关注输入和输出，webpack 是运行在 node 环境的，所以一个 loader 实际就是一个 common 模块，这个模块导出一个函数，函数的工作就是对原内容做一定处理，返回处理后的内容

```js
module.exports = function(source) {
  let content;
  content = doSomeChange2JsString(source);
  // 因为 loader 可以被链式调用，所以输出可以为 String 或 Buffer 类型
  return content;
};
```

**编写 plugin 的思路**：

首先，webpack 编译会创建两个核心对象：

- compiler：包含 webpack 环境的所有配置信息，比如 options、loader、plugin 等等
- compilation：包含当前的模块资源、编译生成资源、变化的文件以及被跟踪依赖的状态信息等等

所以根据 plugin 特性，它能够贯穿整个编译周期，自定义的 plugin 必须是一个函数或者一个包含 aplly 方法的对象，这样才能访问到 webpack 的 compiler ,当检测到一个文件变化，就会有一个新的 compilation 被创建

```js
class MyPlugin = {
  // webpack 会调用 MyPlugin 实例的 apply 方法，给插件实例传入 compiler 对象
  apply(compiler) {
    compiler.hooks.emit.tap("MyPlugin", compilation => {
      // compilation 当前打包构建流程的上下文
      console.log(compilation)
      // doSomeThing
    })
  }
}
```

### webpack 的热更新是如何做到的？原理是什么？

HMR 全称 Hot Module Replacement，可以理解为**模块热替换**，是指在应用程序运行中，替换、添加、删除模块无需重新刷新整个应用

在 webpack 中开启热更新非常简单，只需要在配置文件中添加：我们也可以指定哪些模块发生更新时进行 HMR

```js
const webpack = require("webpack");
module.exports = {
  devServer: {
    hot: true
  }
};
```

热更新的实现主要依赖两个插件

- webpack-dev-server 提供 Bundle Server 能力，它是一个静态资源服务器
- hot-module-replacement-plugin 提供了 HMR Runtime，是一个 soket 服务器，会被注入到浏览器中

热更新主要有两个阶段：

- **在启动阶段**：webpack compile 将源码与 HMR Runtime 一起编译成 bundle.js 文件，传输给 Bundle Server 后注入到浏览器
- **在更新阶段**：
  - webpack compile 监听到模块变化后重新编译打包，生成唯一的 hash 值，作为下一次热更新的标识，利用 websoket 链接发送给浏览器
  - HMR Runtime 根据最新的 hash 值，调用 hotDownloadManifest 发起模块变化内容的 hash.hot-update.json 请求，再调用 hotDownloadUpdateChunk 获取最新模块代码的 hash.hot-update.js 请求
  - 最后，浏览器通过 HMR Runtime 加载 manifest 和 update 两个文件对修改的模块进行更新

### webpack proxy 工作原理，为什么能解决跨域？

webpack proxy 是 webpack 提供的代理服务，在开发阶段，接受客户端发送的请求，然后转发到目标服务器，主要是解决在开发模式下的跨域问题

实现代理服务，可以在 webpack config 的配置文件中增加 devServer.proxy 配置，值为要被代理的目标地址，前端根据 devServer.port 修改资源请求的地址为对应的 localhost + port 的形式

**工作原理**：webpack proxy 实质是利用了 http-proxy-middleware 这个 http 的代理中间件，实现了请求转发给其他服务器的功能 ，

至于**为什么能解决跨域问题**，是因为：

设置 webpack proxy 后，目标服务器返回数据的传递方式是 目标服务器---代理服务器---浏览器，而代理服务器与本地浏览器是属于同源，不存在跨域问题，而服务器与服务器之间传递数据并不会存在跨域行为，所以浏览器就能正常接受数据了

### 如何借助 webpack 来优化前端性能？

- 代码压缩，比如 js、css、图片资源等等
  - js 压缩 TerserPlugin
  - css 压缩 css-minimizer-webpack-plugin
  - 图片 压缩 image-webpack-loader
- 代码分离，资源分包 --> DllPlugin 与 DllReferencePlugin
- Tree Shaking，依赖 ES Module 的静态语法分析 配置 usedExports，通过标记某些函数是否被使用，之后通过 Terser 来进行优化的

### `import moduleName from 'xxModule'`

import 经过 webpack 打包以后变成一些`Map`对象，`key`为模块 id，`value`为模块的可执行函数；

例如 index.js 文件

```js
import m1 from "./m1";

m1();
```

会被打包成

```js
{
	"./src/index.js":

(function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var _m1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./m1 */ "./src/m1.js");

function init() {
  // 拿到default执行
  Object(_m1__WEBPACK_IMPORTED_MODULE_0__["default"])();
}

init();


/***/ }),
```

接下来就由`__webpack_require__`函数进行模块加载，拿到并保存模块导出的值，最后执行

### 异步模块打包执行流程

当一个文件被异步加载，在`index.js`中这么写

```js
import(/*webpackChunkName: "async"*/ "./async").then((res) => {
  res.default();
});
```

被 webpack 处理过后 index.js 的样子，剔除引导模板 runtime

```js
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  ["app"],
  {
    /***/ "./src/index.js":
      /*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        __webpack_require__
          .e(/*! import() | async */ "async")
          // 需要被__webpack_require__加载
          // __webpack_require__ 返回 module.exports
          .then(__webpack_require__.bind(null, /*! ./async */ "./src/async.js"))
          .then((res) => {
            res.default();
          });

        /***/
      }
  },
  [["./src/index.js", "runtime"]]
]);
```

出现 2 个关键字，一个`webpackJsonp`，一个`__webpack_require__.e`

`webpackJson.push`其实已经被重写了，并不是`Array.prototype.push`，而是一个函数，叫`webpackJsonpCallback`，为什么叫`jsonpCallbak`?其实很好理解，异步的 chunk 是通过 script 标签加载的，跟 jsonp 原理一样。当异步 chunk 下载完后，首先就是执行这个`webpackJsonpCallback`函数，看看这个函数

```js
/******/ function webpackJsonpCallback(data) {
  // 异步加载的文件中存放的需要安装的模块对应的 Chunk ID
  /******/ var chunkIds = data[0];
  // 异步加载的文件中存放的需要安装的模块列表
  /******/ var moreModules = data[1];
  // 在异步加载的文件中存放的需要安装的模块都安装成功后，需要执行的模块对应的 index
  // 比如 app.js 就是需要最开始执行的
  /******/ var executeModules = data[2]; // add "moreModules" to the modules object, // then flag all "chunkIds" as loaded and fire callback
  /******/
  /******/ /******/ /******/ var moduleId,
    chunkId,
    i = 0,
    resolves = [];
  /******/ for (; i < chunkIds.length; i++) {
    /******/ chunkId = chunkIds[i];
    /******/ if (
      Object.prototype.hasOwnProperty.call(installedChunks, chunkId) &&
      installedChunks[chunkId]
    ) {
      // installedChunks[chunkId][0] 就是 promise resolve 函数
      /******/ resolves.push(installedChunks[chunkId][0]);
      /******/
    }
    // 标记该chunk已经加载完成，0即完成
    /******/ installedChunks[chunkId] = 0;
    /******/
  }
  // 把所有的模块加入 modules 的对象中, 就是 __webpack_require__.m 对应的那个属性
  /******/ for (moduleId in moreModules) {
    /******/ if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
      /******/ modules[moduleId] = moreModules[moduleId];
      /******/
    }
    /******/
  }
  /******/ if (parentJsonpFunction) parentJsonpFunction(data);
  /******/

  /******/ while (resolves.length) {
    /******/ resolves.shift()();
    /******/
  } // add entry modules from loaded chunk to deferred list
  /******/
  /******/ /******/ deferredModules.push.apply(
    deferredModules,
    executeModules || []
  ); // run deferred modules when all chunks ready // 这个函数也很重要，主要是就是执行入口文件，比如app.js
  /******/
  /******/ /******/ return checkDeferredModules();
  /******/
}
```

这个函数，接受一个数组参数，包括 chunkid，moreModules 模块列表，executeModules 需要先执行的模块

具体作用

1、是用来标识该 chunk 加载完成，因为只有下载完才会执行这个 callback 函数

2、把 moreModules，也就是把第二个参数模块 Map 对象放到 runtime 最外层作用域的 modules 数组中，不然`__webpack_require__`拿不到模块

3、resolve`__webpack_require__.e`函数加载 chunk 返回的 promise，通知`__webpack_require__`函数加载和执行模块

4、链式调用 promise，把 module 当参数，执行用户定义的 then 回调

5、带有入口文件的话，就先执行入口文件

`__webpack_require__.e`简化代码，分析如下

```js
// 记录chunk状态
// key: id, value: 状态
// undefined: 未加载
// 数组: 加载中
// 0：已加载
var installedChunks = {};

__webpack.require__.e = function requireEnsure(chunkId) {
  var promises = [];

  if (installedChunks[chunkId] !== 0) {
    var promise = new new Promise(function(resolve, reject) {
      installedChunks[chunkId] = [resolve, reject];
    })();

    promises.push(promise);

    var script = document.createElement("script");
    script.charset = "utf-8";
    script.timeout = 120; // 120s 过后就中断

    script.src = jsonpScriptSrc(chunkId); // src加载

    onScriptComplete = function(event) {
      clearTimeout(timeout);
    };

    var timeout = setTimeout(function() {
      console.error("timeout");
    }, 120000);

    script.onerror = script.onload = onScriptComplete;
    document.head.appendChild(script);
  }

  return Promise.all(promises);
};
```

可以看到，这个函数主要作用是加载 chunk，还有个 chunk 添加 loading 状态

这边还漏了个地方没讲，就是打包后的`async.js`文件分析，以及加载`async.js`过程

`async.js`文件

```js
function asyncModule() {
  console.log("async module");
}

export default asyncModule;
```

打包之后

```js
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  ["async"],
  {
    /***/ "./src/async.js":
      /*!**********************!*\
  !*** ./src/async.js ***!
  \**********************/
      /*! exports provided: default */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        function asyncModule() {
          console.log("async module");
        }

        /* harmony default export */ __webpack_exports__[
          "default"
        ] = asyncModule;

        /***/
      }
  }
]);
```

可以看到，webpack 也是把`async.js`函数包装了一层，先用`webpackJsonpCallback`函数标识该 chunk 加载完成，再把`async.js`内容放到模块数组中，然后在`index.js`的打包文件中加载再执行

执行`async.js`里的`asyncModule`函数是在`index.js`文件里面的，往上看打包后的`index.js`文件，有个逻辑，也就是 then 回调里面的

```js
__webpack_require__.bind(null, /*! ./async */ "./src/async.js");
```

其中，`async.js`模块内容是用`__webpack_require__`同步加载执行的，`__webpack_require__`函数是 webpack 加载模块的核心，先来看看这个函数源码

```js
function __webpack_require__(moduleId) {
  // Check if module is in cache
  if (installedModules[moduleId]) {
    return installedModules[moduleId].exports;
  }
  // Create a new module (and put it into the cache)
  var module = (installedModules[moduleId] = {
    i: moduleId,
    l: false,
    exports: {}
  });

  // Execute the module function
  // 执行模块的函数体，也就是async打包后的包装函数
  // modules就是存放所有webpack模块的地方
  modules[moduleId].call(
    module.exports,
    module,
    module.exports,
    __webpack_require__
  );
  // Flag the module as loaded
  module.l = true;
  // Return the exports of the module
  return module.exports;
}
```

加载的原理也很简单了，就是一行代码，从`modules`里面取模块加载

```js
modules[moduleId].call(
  module.exports,
  module,
  module.exports,
  __webpack_require__
);
```

对应着`async.js`包装函数

```js
(function(module, __webpack_exports__, __webpack_require__) {}
```

所以，在异步模块加载之前，一定要把模块放到`modules`变量里面，然后在用`__webpack_require__`执行即可

附上流程图

<!-- ![image-20201202181100446](./img/image-20201202181100446.png) -->

所有，完全可以让异步 chunk 在浏览器空闲的时候下载，因为这些 chunk 下载不需要先后固定顺序，可以用 prefetch 对某些异步路由进行提前下载，提供加载速度。

看完源码不得不惊叹，这些加载过程不需要很多代码，就能把 chunk 之前完全解耦开，闭包玩得太妙了。

### webpack 模块在运行时是怎么存的？

每个模块都存在 webpack 函数中的`modules`数组变量里面，比如一个 id 为 1 的模块

```js
const modules = [];

modules[1] = {
  i: 1, // 模块id
  l: false, // 是否已经加载
  exports: {} // 导出的值
};
```

其中，通过一个表来进行存储，键为模块 id，值为一个对象，里面包含了模块属性。

### module、chunk、bundle、moduleId、chunkId 的区别

module：一个文件就是一个模块，无论是 esm 还是 commonjs，都是 module

chunk：把 module 源文件传到 webpack 进行打包时，webpack 会根据文件引用关系生成 chunk 文件，不同的 entry 配置会生成不同的 chunk 的 id，在 webpack 处理时的文件都可以称为 chunk，每个 chunk 可以含有一个或多个 module，包括懒加载的代码也可以叫 chunk，打包后的代码叫 chunk 也可以

bundle：可以理解为浏览器可以直接运行的文件

moduleId：就是每个模块的 id，可以是路径、数字或者 hash 值，模块加载器通过这些 id 进行加载

chunkId：就是打包出来的 js 文件的 id，比如`app.xxx.js`，这个文件的 chunkId 就是 app

### 持久化缓存方案

js、css 文件不能使用 hash，图片、字体、svg 文件可以使用 hash

css 使用 contentHash，使用 chunkHash 会使得跟其有 css 文件关联的 js 文件 hash 值都改变

js 现在也可以使用 contentHash 了，但是有些旧版本 webpack 是不支持的

如果 js 用 chunkHash 的话，采用以下方案

1、需要用 HashedModuleIdsPlugin 固定住 moduleId(如果不使用，webpack 则会使用自增的 id，当增加或者删除 module 的时候，id 就会发生变化，没有改过的文件的 id 也变了，缓存失效)，HashedModuleIdsPlugin 是把路径 hash 化当成模块 id

2、使用 NamedChunkPlugin+魔法注释来固定住 chunkId

到了 webpack5.0，moduleId 和 chunkId 问题都可以不用插件解决，直接使用

```js
module.exports = {
 optimization:{
  chunkIds: "deterministic”, // 在不同的编译中不变的短数字 id
	moduleIds: "deterministic"
 }
}
```

还有一个很重要，但是 vuecli 却没内置的方案，也就是要把引导模板给提取出来

为什么要提取？这边简单说下

比如在 vuecli 创建的工程项目中，有一个懒加载路由`About.vue`，打包出来会有`app.contenthash.js`和`about.contenthash.js`，如果我修改了`About.vue`内容，打包出来的`about.contenthash.js`文件 hash 必然会变，但是你会发现，`app.contentHash.js`也跟着变了，如果在大型项目中这样搞，改了一个路由页面，导致`app.js`也变，这样就使得`app.js`缓存失效了，这文件还不小。

为什么`app.js`会变，怎么解决？

这里有个引导模板的概念，也就是 webpack 加载 bundle 的一些前置函数，例如 webpackJsonpCallback、webpack-require、还是 script src 加载这些，这些函数是不会变的，但是里面的 chunk 文件映射关系会变，所谓的映射关系，可以看这个函数

```js
function jsonpScriptSrc(chunkId) {
  return (
    __webpack_require__.p +
    "" +
    ({}[chunkId] || chunkId) +
    "." +
    { about: "c19c62a2" }[chunkId] +
    ".js"
  );
}
```

可以看到，chunk 文件 id 和 hash 值的映射都在这个函数里面，比如一个 chunk 叫`about.c19c62a2.js`，在引导模板中就为`{ about: "c19c62a2" }`，所以每个 chunk 文件的 id 变动都会改变这个映射关系，`About.vue`的 id 变了，当然这个引导模板文件也会变，引导模板又默认放到`app.js`里面，所以需要把这个引导模板抽取出来，独立加载，不要影响`app.js`的 hash 值

解决方法，webpack 添加以下配置

```js
{
  optimization: {
    runtimeChunk: "single"; // true 也可以，不过每个entry chunk就有一个runtime
  }
}
```

这样就可以把 runtimeChunk 打包出来，`app.js`不会因为`about.js`变化而改变

但是还有个问题，这个 chunk 很小，没必要消耗一次 http 请求，不然请求时间会大于加载时间，所以直接内联到 html 模板里面就可以了

可以用`script-ext-html-webpack-plugin`插件实现

```js
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");

module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    optimization: {
      runtimeChunk: "single"
    },
    plugins: [
      new ScriptExtHtmlWebpackPlugin({
        inline: /runtime.+\.js$/
      })
    ]
  },
  chainWebpack: (config) => {
    config.plugin("preload").tap((args) => {
      args[0].fileBlacklist.push(/runtime.+\.js$/);
      return args;
    });
  }
};
```

### filename 和 chunkFilename 的区别

filename 即为打包出来的文件名，比如

```js
{
  entry: {
    index: './src/index.js'
  },
  output: {
    filename: '[name].min.js'
  }
}
```

打包出来的即为`index.min.js`

chunkFilename 一般为懒加载的代码块

```js
import("src/xxx").then((module) => {});
```

打包出来的有可能就是`0.min.js`，默认使用`[id].js`，或者读取`filename`值，替换`[name]`，即为`[id].min.js`

当然可以使用 webpack 魔法注释

```js
import(/* webpackChunkName: "xxx" */ "src/xxx");
```

出来的文件就是`xxx.js`

### 项目优化

- 开发环境剔除第三方包，用 cdn 加载
- thread-loader 多线程构建优化，通过 SMP 分析打包过程中 loader 和 plugin 的耗时
- 缩小打包作用域：尽可能使用 alias、exclude/include 确定 loader 规则范围
- 合理配置 chunk 缓存化

## 网络

20240726
### 🌟 输入 URL 到页面展示过程

整体流程：
1. URL 解析 -> 
2. DNS 查询（获得 IP 端口） -> 
3. TCP 连接 -> 
4. HTTP 请求 -> 
5. 服务器处理请求 ->
6. HTTP 响应 -> 
7. 浏览器接收响应，HTML解析
8. 页面渲染 DOM -> CSSOM -> render -> layout -> painting

具体来说，分为两个过程

- 请求响应：

  1. 浏览器进行 URL 解析，再通过 DNS 查询，获取服务器的 IP 地址和端口号

  2. 浏览器与服务器通过 TCP 三次握手建立连接
  3. 浏览器向服务器发送 HTTP 请求
  4. 服务器收到报文后处理请求，同样拼好报文再发给浏览器
  5. 浏览器对资源进行解析

- 页面渲染：

  1. 解析 HTML，生成 DOM 树
  2. 解析 CSS，生成 CSSOM 规则树
  3. 合并 DOM 树和 CSSOM 树，生成 render 树
  4. 布局 render 树（Layout/Reflow），负责各元素尺寸、位置的计算
  5. 绘制 render 树（paint），绘制页面像素信息
  6. 浏览器将各层信息发送给 GPU，GPU 会将各层合成显示在屏幕上
  7. 如果遇到 script 标签，会执行并阻塞渲染

详细补充：

- 构建 DOM 树（DOM tree）：从上到下解析 HTML 文档生成 DOM 节点树，也叫内容树（content tree）

- 构建 CSSOM 树（CSS Object Model）：加载解析样式生成 CSSOM 树

<!-- - 执行 JavaScript：加载并执行 JS 代码（包括内联代码或外联 JS 文件） -->

- 构建渲染树 （render tree）：根据 DOM 树和 CSSOM 树生成渲染树（render tree）

<!-- - 渲染树：按顺序展示在屏幕上的一系列矩形，这些矩形带有字体、颜色和尺寸等视觉属性 -->

- 布局（layout）：根据渲染树将节点树的每一个节点布局在屏幕的正确位置

- 绘制（painting）：遍历渲染树绘制所有节点，为每一个节点使用对应的样式

之后每当一个新元素加入到这个 DOM 树当中，浏览器便会通过 CSS 引擎查遍 CSS 样式表，找到符合该元素的样式规则应用到这个元素上，然后再重新去绘制它。

### 🌟 说一下有什么缓存策略？

- 缓存分为强缓存和协商缓存。客户端第一次请求资源时，浏览器会根据服务端的响应头做缓存处理。
- 响应头中的 cache-control 设为 max-age = 100，那么在 100s 内客户端再次发送请求资源，浏览器会自动读取缓存数据；
- 如果在 101s 发起请求，浏览器会在请求头中携带 if-none-match，值为第一次响应头中的 Etag，服务端通过 Etag 判断资源是否被修改，没有修改则返回 304，浏览器复用缓存数据；有修改则返回 200 和新资源
- 用户交互
  - 普通刷新 -> 走强缓存+协商缓存
  - 强制刷新 -> 协商缓存（因为请求头都携带 cache-control: no-chahe）
  - 清缓存后刷新 -> 没有缓存文件，相当于第一次加载
- 命中了强缓存，但是想要获取更新后的静态资源可以怎么做？
  - 在文件名、引用路径添加 hash 或版本号的动态字段（webpack 打包已做了处理）

### 有了【`Last-Modified，If-Modified-Since`】为何还要有【`ETag、If-None-Match`】？

Etag 的优先级比 Last-Modified 更高

Last-Modified 是服务器响应请求时，返回该资源文件在服务器最后被修改的时间，只能精确到秒级

ETag 是服务器响应请求时，返回当前资源文件的一个唯一标识（由服务器生成）

ETag 比 Last-Modified 更加严谨，如果资源发生变化，ETag、Last-Modified 都会发生变化，就会把最新的资源返回给客户端；但 Last-Modified 不能识别 **秒** 单位内的修改，即如果资源在秒单位内发生了变化，Last-Modified 是不会有变化的，如果此时的缓存策略使用的是 Last-Modified ，客户端得到的资源就不是最新的。

### 什么是强缓存和协商缓存？

强缓存：Cache-Control、Expires

协商缓存：Last-Modified/If-Modified-Since、ETag/If-None-Match

### _from disk cache 和 from memory cache 区别？_

内存缓存（from memory cache）和硬盘缓存（from disk cache）都使用了**强缓存**，

在浏览器中，浏览器会在 js 和图片等文件解析执行后直接存入*内存缓存*，那么当刷新页面时只需要直接从内存缓存中读取（from memory cache）；

而 css 文件则会存入硬盘文件中，所以每次渲染页面都需要从*硬盘缓存*中读取（from disk cache）

### _只设置 Etag，那么为什么在 Chrome 下会有非验证性缓存呢？_

没有设置 Cache-Control 这个头，其默认值是 Private ，在标准中明确说了：

> Unless specifically constrained by a cache-control
> directive, a caching system MAY always store a successful response

如果没有 Cache-Control 进行限制，缓存系统**可以**对一个成功的响应进行存储

很显然， Chrome 是遵守标准的，它在没有检查到 Cache-Control 的时候对响应做了非验证性缓存，所以你看到了 200 from memory cache
同时 Safari 也是遵守标准的，因为标准只说了**可以**进行存储，而非**应当**或者**必须**，所以 Safari 不进行缓存也是合理的

我们可以理解为，没有 Cache-Control 的情况下，缓存不缓存就看浏览器高兴，你也没什么好说的。那么你如今的需求是“明确不要非验证性缓存”，则从标准的角度来说，你**必须**指定相应的 Cache-Control 头

### _什么是启发式缓存，什么条件下触发？_

如果响应中未显示 Expires、Cache-Control：max-age 或 Cache-Control：s-maxage，并且响应中不包含其他有关缓存的限制，缓存可以使用**启发式方法**计算新鲜度寿命。通常会根据响应头中的 2 个时间字段 Date 减去 Last-Modified 值的 10% 作为缓存时间

### _常见 Cache-Control 的 max-age 有效值设置_

365 天：`Cache-Control：max-age = 315360000`

30 天：`Cache-Control：max-age = 25920000`

### _Response Header 中 Age 与 Date_

Age 表示命中代理服务器的缓存. 它指的是代理服务器对于请求资源的已缓存时间, 单位为秒.

Date 指的是响应生成的时间，请求经过代理服务器时, 返回的 Date 未必是最新的, 通常这个时候, 代理服务器将增加一个 Age 字段告知该资源已缓存了多久。

### GET 和 POST 的区别

get 和 post 没有本质上的区别，只有报文的形式不同

get 和 post 是 http 协议中的两种，无论是 get 还是 post，用的都是一种传输协议，在传输上，其实没有区别，get 请求也可以传输 body，只不过被浏览器禁止了。

不过要说区别，主要是规范上的区别：

- 行为上：
  - GET 是拿数据，POST 是提交数据
  - GET 在浏览器回退时时无害的，而 POST 会再次提交请求
  - GET 请求会被浏览器主动缓存，而 POST 不会，除非手动设置
- URL：
  - GET 产生 URL 地址可以被收藏，而 POST 不可以
  - GET 只能进行 url 编码，而 POST 支持多种编码方式
  - GET 比 POST 更不安全，因为参数直接暴露在 URL 上，所以不能用来传递敏感信息
- 参数上：

  - GET 参数通过 URL 传递，POST 放在 Request Body 中
  - GET 请求在 URL 中传送的参数是有长度限制的，而 POST 没有限制
  - 参数的数据类型，GET 只接受 ASCII 字符，而 POST 没有限制
  - GET 请求参数会被完整保留在浏览器历史记录里，而 POST 中的参数不会被保留

### 为什么需要 DNS 解析域名为 IP 地址？

网络通讯大部分是基于 TCP/IP 的，而 TCP/IP 是基于 IP 地址的，所有计算机在网络上进行通讯时只能识别如“202.96.134.133” 之类的 IP 地址，而不能识别域名”www.baidu.com“。但实际应用时，我们无法记住多个 IP 地址的网站，访问网站时，更多是通过在地址栏中输入域名。

为什么输入域名后就能访问成功呢？这是因为有一个叫”DNS 服务器“的计算机自动帮我们把域名”翻译“成 IP 地址，然后调出 IP 地址对应的网页

### 什么是 DNS？

DNS(Domain Name System) 域名系统。是互联网上作为域名和 IP 地址相互映射的一个分布式数据库，它用于 TCP/IP 网络，提供了将主机名和域名转换为 IP 地址的服务，这个过程叫做“域名解析”。

### 域名的层级关系

以 www.server.com 为例

- 根 DNS 服务器
- 顶级域 DNS 服务器（com）
- 权威 DNS 服务器（server.com）

### DNS 解析过程

详细过程：

- 客户端输入域名，如"www.163.com"，会先检查本地的 hosts 文件是否有该网址的映射关系，如果 host 文件没有该地址映射，再查找路由器缓存，如果还没则查找本地 DNS 解析器缓存，有就直接返回，否则电脑就会发出一个 DNS 请求到**本地 DNS 服务器**（本地 DNS 服务器一般是网络接入服务器商提供的，如中国电信、中国移动）(浏览器缓存-系统缓存-路由器缓存-ISP DNS 缓存)

- 根据本地 DNS 服务器的设置（是否设置转发器）进行查询，如果未用转发器，本地 DNS 服务器还要向 **根 DNS 服务器**查询；如果是转发模式，本地 DNS 服务器会向**上一级 DNS 服务**查询，如果还不能解析，或找 根 DNS 服务器或把转发请求转至上上级，以此循环

- 根 DNS 服务器没有记录具体域名和 IP 地址的对应关系，而是告诉本地 DNS 服务器，可以到**域服务器**上继续查询，并给出负责该顶级域名服务器的 IP 地址

- 本地 DNS 服务器继续向域服务器发出请求，上图例子中，请求对象是 .com 域服务器，.com 域服务器收到请求后，也不会直接返回域名和 IP 地址的对应关系，而是告诉本地 DNS 服务器，你的**域名的解析服务器**地址

- 本地 DNS 服务器向域名的解析服务器发出请求，这时就能收到一个域名和 IP 地址对应关系，本地 DNS 服务器不仅将 IP 地址返回给用户电脑，还会把该对应关系保存在本地服务器的缓存中，以备下次查询，可以直接返回结果，加快网络访问（获取 IP 地址后，就可以向该 IP 地址定位的 HTTP 服务器发起 TCP 连接）

（总结：查询缓存-->根域名服务器-->顶级域名服务器-->主域名服务器-->下一级域名服务器或直接返回结果）

**关于 DNS 解析的 TTL 参数：**

配置 DNS 解析时，需要注意 TTL 参数。 **TTL**，Time to Live，用于告诉本地 DNS 服务器，域名缓存的最长时间。

比如，阿里云解析默认的 TTL 是 10 分钟，含义是本地 DNS 服务器对于域名的缓存时间是 10 分钟，10 分钟后本地 DNS 服务器就会删除这条记录；删除之后，如果用户再次访问这个域名，就会重复 DNS 解析过程

### DNS 优化有什么手段？

**在 html 页面头部写入 DNS 缓存地址**（DNS 预解析）

```html
// 用meta信息来告知浏览器, 当前页面要做DNS预解析
<meta http-equiv="x-dns-prefetch-control" content="on" />
// 在页面header中使用link标签来强制对DNS预解析
<link rel="dns-prefetch" href="http://bdimg.share.baidu.com" />
<link rel="dns-prefetch" href="http://nsclick.baidu.com" />
```

### TCP

TCP，传输控制协议，是一种面向连接的、可靠的、基于字节流的传输层协议。

### UDP

UDP 协议是面向无连接的，也就是说不需要在正式传递数据之前先连接起双方。

### 🌟 使用加载带有 defer 与 async 属性的脚本的区别

1. 共同点：都是异步并行下载，不影响 dom 的解析，不会阻塞页面的渲染。因此，用户可以立即阅读并了解页面内容。

2. 区别：

   - defer：在文档加载和解析完成之后（如果需要，则会等待），在 `DOMContentLoaded` 事件响应前**按文档顺序执行**
   - async：先加载完成的先执行，**加载优先顺序**，跟脚本在文档中的顺序不相关，跟`DOMContentLoaded`事件无关，比较适合加载无 dom 操作的脚本代码。

3. 如果`script`标签同时添加`async`和`defer`，浏览器优先执行`async`，不支持则执行`defer`

4. 在实际开发中，`defer` 用于需要操作整个 DOM 的脚本，或者脚本的相对执行顺序很重要的时候。

   `async` 用于独立脚本，例如计数器或广告，这些脚本的相对执行顺序无关紧要。

### 🌟 什么是 preload？和 prefetch 的区别？

**Prefetch(预加载)**可以强制浏览器在不阻塞 document 的 [onload](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onload) 事件的情况下请求资源，告诉浏览器这个资源将来可能需要，但是什么时间加载这个资源是由浏览器来决定的。

**preload 是告诉浏览器页面必定需要的资源，浏览器一定会加载这些资源，而 prefetch 是告诉浏览器页面可能需要的资源**，浏览器不一定会加载这些资源，也就是，prefetch 是加速下一页的访问，而不是当前页面的访问。建议：**对于当前页面很有必要的资源使用 preload，对于可能在将来的页面中使用的资源使用 prefetch，比如懒加载的资源适合用 prefetch，像 nodemodules 里面的库适合用 preload**

### url 为什么要解析？

​ 因为网络标准规定了 url 只能是英文字母、阿拉伯数字和一些特殊符号，常见的有(= + & ?()!~)等等（不包括双引号），如果不转义就可能出现歧义，比如：`http:www.baidu.com?key=value`这个 url，如果 key 本身就包含 = 符号，像 ke=y=value，就会出现歧义，无法知道 = 是连接 key 还是 value 的符号

### url 的编码规则是什么？

- 如果网络路径包含汉字，输入网址"http://zh.wikipedia.org/wiki/春节"，会用到 utf-8 编码

- 如果查询字符串包含汉字，输入网址"http://www.baidu.com/s?wd=春节"，会采用 gb2312 编码，查询字符串的编码，用的是操作系统的默认编码

- 如果在已打开的网页上，直接用 Get 或 Post 方法发出 HTTP 请求，编码规则由网页的编码决定，也就是由 html 源码中的字符集的设定决定：

  `<meta http-equiv="Content-Type" content="text/html;charset=xxxx">`

  - 百度搜索，采用 gb2312 编码

  - 谷歌搜索，采用 utf-8 编码

### 如何保证都是 utf-8 的编码？

使用 JavaScript 先对 url 编码，再提交给服务器

- **encodeURI()** 函数，适用于对整个 url 编码，除了常见符号以外，其他一些在网址中有特殊含义的符号如(" ; / : @ & = \$ , #)也不进行编码；输出符号的 utf-8 形式，并在每个字节前加上 %（注意：不对 ' 单引号编码）

- **encodeURIComponent()** 函数，用于对 url 的组成部分进行个别编码，不用对整个 url 编码，因此符号如(" ; / : @ & = \$ , #)在 encodeURI() 中不被编码的符号，在 encodeURIComponent() 中统统会被编码

- **escape()** 函数，除了 ASCII 字母、数字、标点符号(@ \* \_ + - . /)以外，对其他所有字符进行编码(注意：不对 + 号编码，实际上不用该函数进行 url 编码，作用是返回一个字符的 Unicode 编码值)

### dns 查询规则是什么 ？

- 查找缓存：浏览器缓存、本地 hosts 文件缓存、路由缓存和本地 DNS 缓存
- 请求 根服务器，获取 域服务器地址
- 请求 域服务器，获取 域名的解析服务器地址
- 请求 域名的解析服务器地址，获取域名和 ip 的对应关系

接着：获取 IP 地址后，就可以向该 IP 地址定位的 HTTP 服务器发起 TCP 请求，三次握手后建立完连接，开始请求 HTML 文件，如果 HTML 文件在缓存里浏览器就直接返回，没有就去后台拿

来源：[阿里面试官的”说一下从 url 输入到返回请求的过程“](https://juejin.cn/post/6928677404332425223)

### 三次握手过程？（Three Way HandShake）

是指建立一个 TCP 连接时，需要客户端和服务器总共发三个包

- 第一次握手（SYN = 1， seq = x）

  客户端发送一个 SYN = 1， seq = x 的 TCP 包给服务器，要求建立数据连接（当 SYN=1，ACK=0 时，表示当前报文段是一个连接请求报文。当 SYN=1，ACK=1 时，表示当前报文段是一个同意建立连接的应答报文）

- 第二次握手（SYN = 1，ACK = 1，seq = y，ACKnum = x + 1）

  服务器如果同意连接，向客户端发送 SYN = 1、ACK = 1 和 ACKnum = x + 1 的 TCP 包，（服务器选择自己的 ISN 序号为 seq = y）

- 第三次握手（SYN = 0，ACK = 1，ACKnum = y + 1）

  客户端再次发送 SYN = 0、ACK = 1 和 ACKnum = y + 1 的确认包给向服务器，服务器判断确认号没有问题，则建立连接

![](../.vuepress/public/images/2021-02-19-16-51-02.png)

**为什么要三次握手？**

1、 因为两次握手，服务器无法确认客户端是否收到确认请求，此时如果服务器以为建立好连接就开始发送数据，客户端可能一直没有收到

2、防止已失效的连接请求报文段突然又传送到了服务端，因而产生错误

3、保证双方都有收发报文的能力

补充：

**什么是 SYN 攻击？**

黑客向服务器不断发送 SYN 包请求建立连接，服务器回复确认包并等待客户端的确认。由于源地址是不存在的，服务器会不断重发直至超时，这些伪造的 SYN 包将长时间占用未连接队列，正常的 SYN 请求被丢弃，导致目标系统运行缓慢，引起网络堵塞甚至系统瘫痪

**防御 SYN 攻击**

- 缩短超时时间（SYN Timeout）
- 增加最大半连接数
- 过滤网管防护
- SYN cookies 技术

### 四次挥手过程？

- 第一次挥手（FIN = 1，seq = x）

  客户端发送 FIN 报文给服务端，通知服务器数据已经传输完毕

- 第二次挥手（ACK = 1，ACKnum = x + 1）

  服务器接收到之后，发送 ACK 给客户端，数据还没传输完成

- 第三次挥手（FIN = 1，seq = y）

  服务器已经传输完毕，再次发送 FIN 通知客户端，数据已经传输完毕

- 第四次挥手（ACK = 1，ACKnum = y + 1）

  客户端再次发送 ACK，进入 TIME_WAIT 状态，服务端关闭连接，客户端等待 2MSL 后也关闭连接

  （两个最大段生命周期，2MSL，2 Maximum Segment Lifetime）

![](../.vuepress/public/images/2021-02-19-16-59-39.png)

**为什么客户端要等到 2MSL 后再关闭？**

等待 2MSL 时间主要目的是怕最后一个 ACK 包对方没收到，那么对方在超时后将重发第三次握手的 FIN 包，主动关闭端接到重发的 FIN 包后可以再发一个 ACK 应答包。

**为什么要四次挥手？**

因为 tcp 是全双工模式，服务端和客服端都能发送和接收数据，tcp 在断开连接时，需要服务端和客服端都确定对方将不再发送数据。

当客户端发送 FIN 报文段时，只是表示客户端已经没有数据要发送了，但是客户端还可以接收服务端的数据

当服务端发送 ACK 报文段时，表示它已经知道客户端没有数据发送了，但是服务端还是可以发数据到客户端

当服务端也发送 FIN 报文段时，表示服务端没有数据发送了，告诉客户端

客户端收到 FIN 报文段，发送 ACK 表示已经知道服务端没有数据发送了

简单来说，就是双方都需要发送 FIN 和 ACK 报文段才能断开 TCP 连接

### 从网卡把数据包传输出去到服务器发生了什么？

1、先从局域网把数据发送到 交换机（如果交换机没有缓存本地 MAC 地址和 IP 地址的映射，要通过 ARP 协议获取）

2、交换机将数据发送到 路由器，路由器具有转发和分组数据包的功能，算是经过了物理层、数据链路层（以太网），开始到网络层进行数据转发

3、路由器转发 IP 数据包，通过分组转发，所有数据到达服务器

4、服务器的上层协议传输层协议开始发挥作用，根据 TCP 包的端口号，让服务器特定的服务来处理到来的数据包，并且 TCP 是面向字节流的（四大特性：可靠传输、流量控制、拥塞控制和连接管理），所以 node 环境的 request 对象，它的监听事件 data 事件要用字符串一起拼接起来，是因为 TCP 本身就是字节流，request 对象使用 data（http 层面）是 TCP 传来的数据块

5、最后数据由传输层转交到应用层，也就是 HTTP 服务（或者 HTTPS），后端经过一系列逻辑处理后返回给前端数据

### 状态码 302.304.301.401.403 的区别？

- 200 OK：客户端请求成功
- 206 Partial Content：客户发送了带有 Range 头的 GET 请求，服务端完成了它(场景用于大视频的请求)
- 301 Moved Permanently：所请求的页面已经永久转移致新的 url **永久重定向**
- 302 Found：所请求的页面已经临时转移至新的 url **临时重定向**
- 304 Not Modified：客户端有缓冲的文档并发出了一个条件性的请求，服务端告诉客户，原来缓存的文档还可以继续使用
- 400 Bad Request：客户端请求有语法错误，不能被服务端所解析（前端提交数据的字段名称和类型与后台的实体没有保持一致）
- 401 Unauthriozed：请求未经授权，这个状态码必须和 WWW-Authenticate 报头一起用
- 403 Forbidden：对被请求页面的访问已被禁止
- 404 Not Found：请求资源不存在
- 500 Internal Server Error：服务器发生不可预期的错误，原来缓冲的文档还可以继续使用
- 503 Server Unavailable：请求未完成，服务器临时过载或宕机，一段时间后可能恢复正常

### 什么是 HTTP 的持久连接

HTTP 协议采用“请求-应答”模式，当使用普通模式，即非 Keep-Alive 模式时，每个请求/应答客户和服务器都要新建一个连接，完成后立即断开连接（HTTP 协议为无连接协议）

当使用 Keep-Alive 模式（又称持久连接、连接重用）时，Keep-Alive 功能使客户端到服务端的连接持续有效，当出现对服务器的后续请求时，Keep-Alive 功能避免了建立或者重新建立连接

### 一个 TCP 连接能发几个 http 请求

http1.0：一个 tcp 连接只能发一个 http 请求

http1.1：默认开启 Connection:keep-alive，一个 tcp 连接可以发多个 http 请求，但是多个请求是串行执行

http2.0：引入了多路复用和二进制分帧，同域下一个 tcp 连接可以并发多个 http 请求，请求和响应是并行执行

### 如何前后端配合自定义请求响应头字段？

前端如果要获取`response header`里面的值，

- 通过`XMLHttpRequest`实例的`getResponseHeader()`方法进行获取
- 和后端配合`Access-Control-Expose-Headers`来实现

但是根据[w3c-cors 标准](https://www.w3.org/TR/2014/REC-cors-20140116/)，只有`simple-response-header`和设置了`Access-Control-Expose-Headers`指定字段才可以被`getResponseHeader()`获取到，

关于`simple-response-header`有以下这几种：

- Cache-Control
- Content-Language
- Content-Type
- Expires
- Last-Modified
- Pragma

这几种都可以获取到。

但是，如果我想自定义一个字段，就需要和后端配合`Access-Control-Expose-Headers`来实现

比如在`koa`中，设置对应的字段即可：

```js
router.get("/get", async (ctx, next) => {
  ctx.set("Access-Control-Expose-Headers", "token");
  ctx.set("token", "123456");
  ctx.body = "success";
  await next();
});
```

使用`axios`请求就能在返回的对象`headers`字段中获取：

```js
axios.get("/get").then((res) => {
  console.log(res.headers.token); // '123456'
});
```

### CORS

**跨源资源共享** ([CORS](https://developer.mozilla.org/zh-CN/docs/Glossary/CORS)) （或通俗地译为跨域资源共享）是一种基于[HTTP](https://developer.mozilla.org/zh-CN/docs/Glossary/HTTP) 头的机制，该机制通过允许服务器标示除了它自己以外的其它[origin](https://developer.mozilla.org/zh-CN/docs/Glossary/源)（域，协议和端口），这样浏览器可以访问加载这些资源。

什么情况需要 cors？

- 由 [`XMLHttpRequest`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest) 或 [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) 发起的跨源 HTTP 请求
- Web 字体 (CSS 中通过`@font-face`使用跨源字体资源)
- 使用 `drawImage` 将 Images/video 画面绘制到 canvas

服务端如何开启？

设置 `Access-Control-Allow-Origin`

下面 2 个是 options 请求检测

- Access-Control-Allow-Methods
- Access-Control-Allow-Headers

HTTP 请求首部字段

- Origin

- Access-Control-Request-Method

- Access-Control-Request-Headers

HTTP 响应首部字段

- Access-Control-Allow-Origin
- Access-Control-Allow-Methods
- Access-Control-Allow-Headers
- Access-Control-Allow-Credentials (配合 XMLHttpRequest.withCredentials 使用)
- Access-Control-Expose-Headers
- Access-Control-Max-Age

### OPTIONS 预请求

跨源资源共享标准新增了一组 HTTP 首部字段，允许服务器声明哪些源站通过浏览器有权限访问哪些资源。

非简单请求的 CORS 请求，比如像 POST、PUT、DELETE 或者 Content-Type 类型为 application/json 的请求，会在正式通信前，增加一次 HTTP 查询请求，也就是预检请求。浏览器会先询问服务器，当前网页所在的域名是否在服务器的许可名单之中，以及可以使用哪些 HTTP 头信息字段。只有得到肯定答复后，浏览器才会发出正式的 HTTP 请求，否者就报错

非简单请求：

1、使用了这些请求方法：PUT/DELETE/CONNECT/OPTIONS/TRACE/PATCH

2、人为设置了以下集合之外的请求头

- Accept

- Accept-Language
- Content-Language
- Content-Type
- DPR
- Downlink
- Save-Data
- Viewport-Width
- Width

3、Content-Type 不属于以下这几种

- application/x-www-form-urlencoded
- multipart/form-data
- text/plain

### HTTP 1.0 特性

- 无状态：服务器不跟踪不记录请求过的状态
- 无连接：浏览器每次请求都需要建立 tcp 连接

**缺点**：

- **无法复用连接**：每次发送请求，都需要进行一次 tcp 连接（即 3 次握手 4 次挥手），使得网络的利用率非常低

- **队头阻塞**：http1.0 规定在前一个请求响应到达之后下一个请求才能发送，如果前一个阻塞，后面的请求也给阻塞的

### HTTP 1.1 特性

- 长连接：新增 Connection 字段，设置 keep-alive 值保持连接不断开，复用 TCP 连接 (这就是所谓的 HTTP 长连接或 HTTP 持久连接)
- 管道化：基于长连接的基础，管道化可以不等第一个请求响应继续发送后面的请求，但响应的顺序还是按照请求的顺序返回
- 缓存处理：新增字段 cache-control
- 断点传输：增加 range 头域，允许只请求资源的某个部分，返回码是 206

普通的持久连接

```
请求1 > 响应1 --> 请求2 > 响应2 --> 请求3 > 响应3
```

管道化的持久连接

```
请求1 --> 请求2 --> 请求3 > 响应1 --> 响应2 --> 响应3
```

**缺点**：

- 仍然存在 队头阻塞：虽然管道化，可以一次发送多个请求，但是响应仍是顺序返回（通常一次最多处理 6 个请求，但因浏览器而异）

### 🌟HTTP 2.0 新特性

- **二进制分帧**：将所有传输的信息分割为更小的消息和帧，并对它们采用二进制格式的编码
- **多路复用**： 一个 TCP 连接可以并发处理多个请求，采用二进制分帧，http 消息被分解为独立的帧，乱序发送，服务端根据标识符和首部将消息重新组装起来（ 多路复用是指复用一个 tcp 链接，多路是指二进制的帧数据可以并行传输，不需要顺序传输，解决队头阻塞）
- **头部压缩**：压缩 HTTP 请求和响应的首部
- **服务器推送**：服务器可以额外的向客户端推送资源，而无需客户端明确的请求

区别

1. http1.0 到 http1.1 的主要区别，就是从无连接到长连接
2. http2.0 对比 1.X 版本主要区别就是多路复用

### 多路复用和长连接复用有什么区别？

- HTTP/1.1 Pipeling 解决方式为，若干个请求排队串行化单线程处理，后面的请求等待前面请求的返回才能获得执行机会，一旦有某请求超时等，后续请求只能被阻塞，毫无办法，也就是人们常说的队头阻塞；

- HTTP/2 多个请求可同时在一个连接上并行执行。某个请求任务耗时严重，不会影响到其它连接的正常执行；

### 🌟HTTPS

HTTP 是<u>明文传输</u>，容易受到中间人攻击，不安全。HTTPS 语义仍然是 HTTP，只不过是在 HTTP 协议栈中引入安全层 SSL/TSL。

- 安全层负责对 HTTP 请求数据加密，对接收内容进行解密。

- 安全层解决了传输的问题，还需要添加数字证书证明服务器是无害的。

对称加密：双方均有相同的秘钥，两边都知道如何将密文加密和解密。

非对称加密：有公钥和私钥之分，公钥加密，私钥解密。

### WebSocket

Websocket，是一个持久化的网络通信协议，可以在单个 TCP 连接上进行全双工通讯，客户端和服务端之间可以进行双向数据传输

**websocket 握手**：客户端建立连接时，通过 HTTP 发起请求报文，借用`101 switch protocol`进行协议转换

```
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13
```

与 HTTP 不一样的地方在于如下这些协议头，表示发起 websocket 协议

```
Upgrade: websocket
Connection: Upgrade
```

`Sec-WebSocket-Key`为客户端随机生成的 Base64 编码的字符串，服务端接收后将其与字符串`258EAFA5-E914-47DA-95CA-C5AB0DC85B11`相连，然后通过`sha1`安全散列算法计算结果后，再进行 Base64 编码，返回给客户端建立连接，过程如下

```js
const hashWebSocketKey = function(key) {
  const sha1 = crypto.createHash("sha1");
  sha1.update(key + KEY_SUFFIX, "ascii");
  return sha1.digest("base64");
};

const key = hashWebSocketKey(req.headers["sec-websocket-key"]);

const headers = [
  "HTTP/1.1 101 Web Socket Protocol Handshake",
  "Upgrade: WebSocket",
  "Connection : Upgrade",
  "Sec-WebSocket-Accept: " + key
];

// 建立连接
this.socket.write(headers.concat("", "").join("\r\n"));
```

**数据帧**：websocket 是通过帧进行传输，下面是 websocket 数据帧的定义

```
 |  fin   |   masked     |  masking key |          |
 |  rsv1  |   payload    |              |          |
 |  rsv2  |   length     |              | payload  |
 |  rsv3  |   7+16 bit   |   4byte      |   data   |
 | opcode |    7+16      |              |          |
 |        |    7+64      |              |          |
 |        |              |              |          |
 |        |              |              |          |
```

fin: 如果数据帧是最后一帧，则为 1，其余情况为 0

rsv1、rsv2、rsv3 ：1bit，用于扩展协议

opcode：长为 4 位的操作码，0 表示附加数据帧、1 表示文本数据帧、2 表示二进制数据帧、3-7 为非控制帧而预留、8 表示发送一个连接关闭的数据帧、9 为 ping 数据帧、10 表示 pong 数据帧

masked：表示是否进行掩码处理，长度为 1bit，客户端发送给服务器端时为 1，服务器端发送给客户端时为 0

payload length：一个 7、7+16、7+64 位长的数据位，标识数据的长度，如果值在 0-125 之间，那么该值就是数据的真实长度；如果值是 126，则后面 16 位的值是数据的真实长度；如果值是 127，则后面 64 位的值是数据的真实长度

masking key：当 masked 为 1bit 时，是一个 32 位长的数据位，也就是 4 个字节，用于解码数据

payload data：目标数据，位数为 8 的倍数

## 安全

### 常见的 Web 攻击有哪些？如何防御？

### 描述一下 XSS 和 CRSF 攻击？防御方法？

**XSS 跨站脚本攻击 **

1. **是什么？**

   - XSS 跨站脚本攻击 ，就是攻击者想办法将一段可以执行的代码注入到网页中，比如在输入框中，输入`<script>console.log('xxx')</script>`。

2. **攻击方式**：反射型、存储型和基于 DOM

3. **防御手段**：

   - 对输入进行过滤，对输出进行转义，前端可以使用 js-xss 这个库

   - 资源保护：

     - 将重要的 cookie 标记 httponly true, 避免黑客利用脚本获取 cookie

     - 开启 CSP 网页安全政策，建立白名单，告诉浏览器哪些资源可以加载

**CSRF 跨站请求伪造攻击 **

1. **是什么？**

   - CSRF 跨站请求伪造攻击，是指黑客引诱用户打开黑客的网站，在黑客的网站中，利用用户的登录状态发起的跨站请求。

2. **攻击要点**：

   - 页面所有的请求都是在受害者的浏览器中发出的，因此浏览器会附上目标站点的 cookies 信息

   - 目标站点无法鉴别请求的来源，默认会认可这个请求的合法性

3. **攻击方式**：

   - 利用可以跨域的 html 标签发起跨域 GET 请求`<a> <script> <img> <link>`

   - 隐藏表单发起 POST 请求

   - 如果后台允许跨域 CORS，也可以用 ajax 发请求

4. **防御手段**：

   - 阻止不明外域的访问

   - 同源检测，验证 HTTP Referer 字段；

   - 浏览器开启 SameSite 属性，跨域不能传 cookie，服务端也可以设置

   - CSRF Token，同域请求时附带验证信息 token，服务端需要验证 token 的有效性

   - 服务端开启 http-only，脚本无法访问 cookie

   （如果攻击者有权限在本域发布评论（含链接、图片等，统称 UGC），那么它可以直接在本域发起攻击，这种情况下同源策略无法达到防护的作用。防止同源 CSRF 就必须使用 token 验证的方式。）

## react

useHook

## 前端框架通识

### Vue 和 React 的区别

从 vue 的角度出发

更容易上手，可以 script 标签方式引入，虽然 react 也支持 script 引入，但是 react 不支持 template 写法

vue 支持 template，也支持 jsx

jsx 都需要 babel 插件

vue 逻辑复用方式使用 mixin，react 现在不支持了

function based API，react 为 usehooks

**Vue 跟 React 的最大区别在于数据的 reactivity，就是响应式系统上。**Vue 提供响应式的数据，当数据改动时，界面就会自动更新，而 React 里面需要调用方法 setState

Vue 进行数据拦截/代理，它对侦测数据的变化更敏感、更精确，组件更新粒度更细，React 则并不知道什么时候“应该去刷新”，触发局部重新变化是由开发者手动调用 setState 完成，但是 react 是全部一起更新的。

为了达到更好的性能，React 暴漏给开发者 shouldComponentUpdate 这个生命周期 hook，来避免不需要的重新渲染（**相比之下，Vue 由于采用依赖追踪，默认就是优化状态：你动了多少数据，就触发多少更新，不多也不少，而 React 对数据变化毫无感知，它就提供 React.createElement 调用生成 virtual dom**）

react

函数式，不可变数据，all in js

事件系统使用合成事件，都代理在 document 上

React 中事件处理函数中的 this 默认不指向组件实例

## 浏览器

### 浏览器渲染

1. 静态资源并不是同时请求的，也不是解析到指定标签的时候才去请求的，浏览器会自行判断；
2. JS 会阻塞页面的解析和渲染，同时浏览器也存在预解析，遇到阻塞可以继续解析下面的元素；
3. CSS 不阻塞 dom 树的构建解析，只会阻塞其后面元素的渲染，不会阻塞其前面元素的渲染；
4. 图片既不阻塞解析，也不阻塞渲染。

### 什么情况阻塞页面渲染

浏览器在解析`script`标签，会暂停 dom 的构建，所以 script 标签要放到 body 标签底部

js 下载和执行都会阻塞页面的渲染，DOM 树解析到非异步的外联 js 时会阻塞住，在它加载并且执行完之前，不会往下解析 DOM 树

当`script`有`defer`或者`async`标签时，则会异步下载

defer：异步并行下载，不影响 dom 的解析，dom 解析完后，在`DOMContentLoaded`事件响应前按顺序执行，有 `defer` 属性的脚本会阻止 `DOMContentLoaded` 事件，直到脚本被加载并且解析完成。

async：同样是并行下载，不会影响 dom 的解析，不同的是，脚本下载完后就直接执行了，而且是无序执行，跟`DOMContentLoaded`事件无关，比较适合加载无 dom 操作的脚本代码。

如果`script`标签同时添加`async`和`defer`，浏览器优先执行`async`，不支持则执行`defer`

### 重绘和回流

重绘是当节点需要更改外观而不影响布局，改变 color 就为重绘

回流是布局或者几何属性需要改变

回流必定发生重绘

#### 如何避免触发回流和重绘

CSS：

- 避免使用 table 布局。
- 尽可能在 DOM 树的最末端改变 class。
- 避免设置多层内联样式。
- 将动画效果应用到`position`属性为`absolute`或`fixed`的元素上
- 避免使用 CSS 表达式（例如：`calc()`）
- CSS3 硬件加速（GPU 加速）

JavaScript：

- 避免频繁操作样式，最好一次性重写 style 属性，或者将样式列表定义为 class 并一次性更改 class 属性
- 避免频繁操作 DOM，创建一个`documentFragment`，在它上面应用所有 DOM 操作，最后再把它添加到文档中
- 也可以先为元素设置`display: none`，操作结束后再把它显示出来。因为在 display 属性为 none 的元素上进行的 DOM 操作不会引发回流和重绘
- 避免频繁读取会引发回流/重绘的属性，如果确实需要多次使用，就用一个变量缓存起来
- 对具有复杂动画的元素使用绝对定位，使它脱离文档流，否则会引起父元素及后续元素频繁回流

### 输入 URL 到页面展示

1、浏览器进行 URL 解析，再通过 DNS 查询，获得服务器的 IP 地址和端口号

2、浏览器用 TCP 的三次握手与服务器建立连接

3、浏览器向服务器发送 HTTP 请求

4、服务器收到报文后处理请求，同样拼好报文再发给浏览器

5、浏览器解析报文，渲染输出页面

渲染过程 **DOM -> CSSOM -> render -> layout -> painting**

1、根据 HTML 结构生成 DOM 树

2、根据 CSS 生成 CSSOM

3、将 DOM 和 CSSOM 整合形成 RenderTree

4、根据 RenderTree 开始渲染

5、遇到`script`标签，会执行并阻塞渲染

详细补充：

- 构建 DOM 树（DOM tree）：从上到下解析 HTML 文档生成 DOM 节点树，也叫内容树（content tree）

- 构建 CSSOM 树（CSS Object Model）：加载解析样式生成 CSSOM 树

<!-- - 执行 JavaScript：加载并执行 JS 代码（包括内联代码或外联 JS 文件） -->

- 构建渲染树 （render tree）：根据 DOM 树和 CSSOM 树生成渲染树（render tree）

<!-- - 渲染树：按顺序展示在屏幕上的一系列矩形，这些矩形带有字体、颜色和尺寸等视觉属性 -->

- 布局（layout）：根据渲染树将节点树的每一个节点布局在屏幕的正确位置

- 绘制（painting）：遍历渲染树绘制所有节点，为每一个节点使用对应的样式

之后每当一个新元素加入到这个 DOM 树当中，浏览器便会通过 CSS 引擎查遍 CSS 样式表，找到符合该元素的样式规则应用到这个元素上，然后再重新去绘制它。

**补充：**

Q：_从浏览器地址栏输入 url 到请求返回发生了什么？_

A：首先会进行 url 解析， 根据 dns 系统进行 ip 查询

Q：_url 为什么要解析？_

A：因为网络标准规定了 url 只能是英文字母、阿拉伯数字和一些特殊符号，常见的有(= + & ?()!~)等等（不包括双引号），如果不转义就可能出现歧义，比如：`http:www.baidu.com?key=value`这个 url，如果 key 本身就包含 = 符号，像 ke=y=value，就会出现歧义，无法知道 = 是连接 key 还是 value 的符号

Q：_url 的编码规则是什么？_

A：

- 如果网络路径包含汉字，输入网址"http://zh.wikipedia.org/wiki/春节"，会用到 utf-8 编码
- 如果查询字符串包含汉字，输入网址"http://www.baidu.com/s?wd=春节"，会采用 gb2312 编码，查询字符串的编码，用的是操作系统的默认编码
- 如果在已打开的网页上，直接用 Get 或 Post 方法发出 HTTP 请求，编码规则由网页的编码决定，也就是由 html 源码中的字符集的设定决定：
  <meta http-equiv="Content-Type" content="text/html;charset=xxxx">

百度搜索，采用 gb2312 编码
![](../.vuepress/public/images/2021-02-18-11-15-49.png)

谷歌搜索，采用 utf-8 编码
![](../.vuepress/public/images/2021-02-18-11-21-34.png)
![](../.vuepress/public/images/2021-02-18-11-23-19.png)

Q：_如何保证都是 utf-8 的编码？_

A：使用 JavaScript 先对 url 编码，再提交给服务器
方式：

- **encodeURI()** 函数，适用于对整个 url 编码，除了常见符号以外，其他一些在网址中有特殊含义的符号如(" ; / : @ & = \$ , #)也不进行编码；输出符号的 utf-8 形式，并在每个字节前加上 %（注意：不对 ' 单引号编码）

- **encodeURIComponent()** 函数，用于对 url 的组成部分进行个别编码，不用对整个 url 编码，因此符号如(" ; / : @ & = \$ , #)在 encodeURI() 中不被编码的符号，在 encodeURIComponent() 中统统会被编码

- **escape()** 函数，除了 ASCII 字母、数字、标点符号(@ \* \_ + - . /)以外，对其他所有字符进行编码(注意：不对 + 号编码，实际上不用该函数进行 url 编码，作用是返回一个字符的 Unicode 编码值)

![](../.vuepress/public/images/2021-02-18-14-24-16.png)
![](../.vuepress/public/images/2021-02-18-14-33-55.png)

Q：_dns 查询规则是什么 ？_

A：主要是几个步骤：

- 查找缓存：浏览器缓存、本地 hosts 文件缓存、路由缓存和本地 DNS 缓存
- 请求 根服务器，获取 域服务器地址
- 请求 域服务器，获取 域名的解析服务器地址
- 请求 域名的解析服务器地址，获取域名和 ip 的对应关系

接着：获取 IP 地址后，就可以向该 IP 地址定位的 HTTP 服务器发起 TCP 请求，三次握手后建立完连接，开始请求 HTML 文件，如果 HTML 文件在缓存里浏览器就直接返回，没有就去后台拿

Q：_缓存解释一下_
A：

- 浏览器首次加载资源成功时，服务器返回 200，此时浏览器不仅下载了资源，也把 response 的 header（里面的 date 属性用来计算第二次资源向同时当前时间和 date 的时间差） 一并缓存

- 下一次加载资源时，首先要经过 强缓存 的处理，cache-control 优先级最高，如 cache-control: no-cache，就直接进入到 协商缓存 的步骤了，如果 cache-control: max-age=xxx，就会先比较当前时间和上一次返回 200 时的时间差，如果没有超过 max-age，命中强缓存，不发请求直接从本地缓存中读取该文件（如果没有 cache-control，就取 expires 的值比较是否过期），过期就会进入下一阶段，协商缓存

- 协商缓存阶段，则向服务器发送 header 带有 if-None-Match 和 if-Modified-Since 的请求，服务器比较 Etag，如果相同，命中协商缓存，返回 304；如果不同则有改动，直接返回新的资源文件，带上新的 Etag 值并返回 200

- 协商缓存中第二重要的字段是 if-Modified-Since，如果客户端发送的 if-Modified-Since 值与服务端获取的文件最近改动时间一致，则命中协商缓存，返回 304，不一致则返回新的 last-modified 和文件并返回 200

来源：[阿里面试官的”说一下从 url 输入到返回请求的过程“](https://juejin.cn/post/6928677404332425223)

### 跨域

浏览器出于安全考虑，有同源策略，也就是协议+域名+端口号要相同。

1、jsonp

用`script`加载 get 请求地址，把回调函数名告诉后端，让后端返回`callback(data)`，这样就可以执行这个回调函数了，不过这个函数名是全局变量的

2、CORS

服务端设置 `Access-Control-Allow-Origin` 就可以开启 CORS

3、postMessage

## 性能优化

- 减少 DOM 的访问次数，可以将 DOM 缓存到变量中
- 减少**重绘**和**回流**，任何会导致**重绘**和**回流**的操作都应减少执行，可将**多次操作合并为一次**
- 尽量采用**事件委托**的方式进行事件绑定，避免大量绑定导致内存占用过多
- CSS 层尽量扁平化，避免过多的层级嵌套，尽量使用**特定的选择器**来区分
- 动画尽量使用 CSS3 **动画属性**来实现，开启 **GPU** 硬件加速
- 图片在加载前提前**指定宽高**或**脱离文档流**，可避免加载后的重新计算导致的页面回流
- CSS 文件在 `<head>` 标签中引入，JS 文件在 `<body>` 标签中引入，优化**关键渲染路径**
- 加速或减少 HTTP 请求，使用 **CDN 加载静态资源**，合理使用浏览器**强缓存**和**协商缓存**，小图片可以使用**Base 64** 来代替，合理使用浏览器的**预指令 prefetch** 和**预加载指令 preload**
- 压缩**混淆代码**，**删除无用代码**，**代码拆分**减少文件体积
- 小图片使用**雪碧图**，图片选择合适的**质量、尺寸和格式**，避免流量浪费
- 减少关键资源的个数和大小（webpack 拆/合包，懒加载）
- 图片懒加载

## 项目代码、样式规范管理

- 跟 UI 对接，开发相应的全局组件，在业务模块中统一使用，不得重复造轮子
- 全局 scss 变量、scss 函数管理样式
- eslint、prettier、precommit
- 任何人如果修改了全局 scss 变量、scss 函数，都需要在文档上声明
- 制定编码规范，命名规范，并提供相关文档
- 统一 vscode 插件，统一 vscode 插件配置 json
- 定期 code review，记录不合理地方和表扬优雅的代码
- 提供项目基线版本，项目目录结构一致

### Code Review

- 命名混乱
- div 节点冗余
- css 冗余
- 过多的 if else
- 全局组件带有子模块业务代码
- 注释太少，data 变量注释要带上

## 工程架构能力

### 脚手架

开发了一款公司内部使用的脚手架

1、创建项目

2、快速启动 cz-customizable

3、初始化开发环境

4、执行脚本

5、版本升级

### 框架搭建

搭建项目基础框架

1、符合规范的组织结构

2、提供常用工具的配置 prettier、eslint、husky

3、集成内部组件库

4、配置文件读取写入

5、自动加载全局组件&vuex modules

6、eventBus 解决方案

7、svg 图标

8、hjson

10、ie 11

11、bable 可选链

12、gzip

13、dart-sass

14、jest

### 微前端系统设计

初衷

1、子系统增量更新

2、子系统可独立部署

3、子系统交给不同团队开发

4、不用 iframe

考虑点

1、single-spa，systemjs 接入，single-spa 应用管理，systemjs 加载 umd 文件

2、api 设计，命名？兼容旧版本都需要考虑

3、设计系统初始化的整个链路，各个模块间的联系(在子系统加载前要拿到一些信息)

#### 状态管理

主应用和子应用如何共享状态？

自研了一个状态管理器，叫 mircoStore，类似 vuex 的使用方式，存储全局状态

#### 样式管理

为了避免样式冲突，每个子应用都有一个 css 命名空间，就是 id，在 singeSpaVue 的选项中传入，在调用的时候添加上

#### 注册应用

模块注册使用 systemjs，因为模块加载是用了 systemjs

single-spa 注册应用，在回调函数中让 systemjs 加载子应用

#### 全局组件复用

全局组件统一在 main-app 上注册，也是主应用

一定要加载完主应用再去加载子应用

#### 抽离共同依赖

webpack externals 依赖，比如 vue 这些

这些都是用 script 标签进行加载，所以这些都是全局的

还有一些工具库也是通过这种方式加载，用 rollup 打包成 umd 方式

#### 权限控制

权限控制是主要是采用动态 addRoutes 的方式，跟单体应用略有不同

在 main-app 加载之前，也就是在 single-spa 生命周期 bootstrap 中，进行资源加载

资源包括了地图资源、路由资源这些，获取到这些资源之后，都放到 microStore 中

在子应用的挂载前，同样也是 bootstrap 中，读取对应子应用的路由权限，动态 addRoutes
