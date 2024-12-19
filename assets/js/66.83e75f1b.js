(window.webpackJsonp=window.webpackJsonp||[]).push([[66],{562:function(t,a,s){"use strict";s.r(a);var e=s(38),n=Object(e.a)({},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"lodash-源码分析及思路学习"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#lodash-源码分析及思路学习","aria-hidden":"true"}},[t._v("#")]),t._v(" lodash 源码分析及思路学习")]),t._v(" "),s("h2",{attrs:{id:"map-js"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#map-js","aria-hidden":"true"}},[t._v("#")]),t._v(" map.js")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// map.js")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("map")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("array"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" iteratee")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" index "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" length "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" array "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" array"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" result "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Array")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("length"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("while")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),t._v("index "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" length"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    result"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("index"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("iteratee")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("array"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("index"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" index"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" array"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" result\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" map\n")])])]),s("p",[t._v("map 用来映射，返回新的数组长度应该跟原数组长度一致，因此一开始就先拿到原数组的 "),s("code",[t._v("length")]),t._v(" 属性，创建一个跟原数组长度一致的空数组。")]),t._v(" "),s("p",[t._v("接着遍历，将数组中每项依次取出，作为第一个参数传递给 "),s("code",[t._v("iteratee")]),t._v(" 处理函数。 "),s("code",[t._v("iteratee")]),t._v(" 的第二个参数为当前项的索引，第三个参数为原数组。然后将 "),s("code",[t._v("iteratee")]),t._v(" 返回的结果放入新数组 "),s("code",[t._v("result")]),t._v(" 中。遍历完毕后，将新的数组返回，即实现了 "),s("code",[t._v("map")]),t._v(" 函数。")]),t._v(" "),s("h2",{attrs:{id:"交集应用"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#交集应用","aria-hidden":"true"}},[t._v("#")]),t._v(" 交集应用")])])},[],!1,null,null,null);a.default=n.exports}}]);