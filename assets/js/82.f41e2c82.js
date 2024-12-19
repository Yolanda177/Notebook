(window.webpackJsonp=window.webpackJsonp||[]).push([[82],{591:function(t,a,s){"use strict";s.r(a);var e=s(38),r=Object(e.a)({},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"http"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#http","aria-hidden":"true"}},[t._v("#")]),t._v(" Http")]),t._v(" "),s("h2",{attrs:{id:"http-版本"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#http-版本","aria-hidden":"true"}},[t._v("#")]),t._v(" HTTP 版本")]),t._v(" "),s("h3",{attrs:{id:"http-0-9"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#http-0-9","aria-hidden":"true"}},[t._v("#")]),t._v(" HTTP/0.9")]),t._v(" "),s("p",[t._v("这是HTTP最早大规模使用的版，现已过时。在这个版本中 只有GET一种请求方法，在HTTP通讯也没有指定版本号，也不支持请求头信息。该版本不支持POST等方法，因此客户端向服务器传递信息的能力非常有限。HTTP/0.9的请求只有如下一行：")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("GET www.itbilu.com\n")])])]),s("h3",{attrs:{id:"http-1-0"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#http-1-0","aria-hidden":"true"}},[t._v("#")]),t._v(" HTTP/1.0")]),t._v(" "),s("p",[t._v("这个版本是第一个在HTTP通讯中指定版本号的协议版本，HTTP/1.0至今仍被广泛采用，特别是在代理服务器中。")]),t._v(" "),s("p",[t._v("HTTP/1.0支持：GET、POST、HEAD三种HTTP请求方法。")]),t._v(" "),s("h3",{attrs:{id:"http-1-1"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#http-1-1","aria-hidden":"true"}},[t._v("#")]),t._v(" HTTP/1.1")]),t._v(" "),s("p",[t._v("HTTP/1.1是当前正在使用的版本。"),s("code",[t._v("该版本默认采用持久连接，并能很好地配合代理服务器工作。还支持以管道方式同时发送多个请求，以便降低线路负载，提高传输速度。")])]),t._v(" "),s("p",[t._v("HTTP/1.1新增了："),s("code",[t._v("OPTIONS、PUT、DELETE、TRACE、CONNECT")]),t._v("五种HTTP请求方法。")]),t._v(" "),s("h3",{attrs:{id:"http-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#http-2","aria-hidden":"true"}},[t._v("#")]),t._v(" HTTP/2")]),t._v(" "),s("p",[t._v("这个版本是最新发布的版本，于今年5月（2015年5月）做HTTP标准正式发布。HTTP/2 通过支持请求与相应的多路重用来减少延迟，通过压缩HTTP头字段将协议开销降到最低，同时增加了对请求优先级和服务器端推送的支持。")]),t._v(" "),s("h2",{attrs:{id:"http-请求方法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#http-请求方法","aria-hidden":"true"}},[t._v("#")]),t._v(" HTTP 请求方法")]),t._v(" "),s("p",[t._v("在HTTP的发展过程中，出现了很多HTTP版本，其中的大部分协议都是向下兼容的。在进行HTTP请求时，客户端在请求时会告诉服务器它采用的协议版本号，而服务器则会在使用相同或者更早的协议版本进行响应。")]),t._v(" "),s("h3",{attrs:{id:"方法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#方法","aria-hidden":"true"}},[t._v("#")]),t._v(" 方法")]),t._v(" "),s("p",[t._v("名称解释：")]),t._v(" "),s("ul",[s("li",[t._v("幂等：对同一个系统，使用同样的条件，一次请求和重复的多次请求对系统资源的影响是一致的。")])]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("方法")]),t._v(" "),s("th",[t._v("说明")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("GET")]),t._v(" "),s("td",[t._v("GET请求会显示请求指定的资源。一般来说GET方法应该只用于数据的读取，而不应当用于会产生副作用的非幂等的操作中。它期望的应该是而且应该是安全的和幂等的。这里的安全指的是，请求不会影响到资源的状态。")])]),t._v(" "),s("tr",[s("td",[t._v("HEAD")]),t._v(" "),s("td",[t._v("HEAD方法与GET方法一样，都是向服务器发出指定资源的请求。但是，服务器在响应HEAD请求时不会回传资源的内容部分，即：响应主体。这样，我们可以不传输全部内容的情况下，就可以获取服务器的响应头信息。HEAD方法常被用于客户端查看服务器的性能。")])]),t._v(" "),s("tr",[s("td",[t._v("POST")]),t._v(" "),s("td",[t._v("POST请求会 向指定资源提交数据，请求服务器进行处理，如：表单数据提交、文件上传等，请求数据会被包含在请求体中。POST方法是非幂等的方法，因为这个请求可能会创建新的资源或/和修改现有资源。")])]),t._v(" "),s("tr",[s("td",[t._v("PUT")]),t._v(" "),s("td",[t._v("PUT请求会身向指定资源位置上传其最新内容，PUT方法是幂等的方法。通过该方法客户端可以将指定资源的最新数据传送给服务器取代指定的资源的内容。")])]),t._v(" "),s("tr",[s("td",[t._v("DELETE")]),t._v(" "),s("td",[t._v("DELETE请求用于请求服务器删除所请求URI（统一资源标识符，Uniform Resource Identifier）所标识的资源。DELETE请求后指定资源会被删除，DELETE方法也是幂等的。")])]),t._v(" "),s("tr",[s("td",[t._v("CONNECT")]),t._v(" "),s("td",[t._v("CONNECT方法是HTTP/1.1协议预留的，能够将连接改为管道方式的代理服务器。通常用于SSL加密服务器的链接与非加密的HTTP代理服务器的通信。")])]),t._v(" "),s("tr",[s("td",[t._v("OPTIONS")]),t._v(" "),s("td",[t._v("OPTIONS请求与HEAD类似，一般也是用于客户端查看服务器的性能。 这个方法会请求服务器返回该资源所支持的所有HTTP请求方法，该方法会用'*'来代替资源名称，向服务器发送OPTIONS请求，可以测试服务器功能是否正常。"),s("strong",[t._v("JavaScript的XMLHttpRequest对象进行CORS跨域资源共享时，就是使用OPTIONS方法发送嗅探请求，以判断是否有对指定资源的访问权限。")])])]),t._v(" "),s("tr",[s("td",[t._v("TRACE\b")]),t._v(" "),s("td",[t._v("TRACE请求服务器回显其收到的请求信息，该方法主要用于HTTP请求的测试或诊断。")])]),t._v(" "),s("tr",[s("td",[t._v("PATCH")]),t._v(" "),s("td",[t._v("PATCH方法出现的较晚，它在2010年的RFC 5789标准中被定义。PATCH请求与PUT请求类似，同样用于资源的更新。二者有以下两点不同：1.PATCH一般用于资源的部分更新，而PUT一般用于资源的整体更新。2.当资源不存在时，PATCH会创建一个新的资源，而PUT只会对已在资源进行更新。")])])])]),t._v(" "),s("h3",{attrs:{id:"注意"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#注意","aria-hidden":"true"}},[t._v("#")]),t._v(" 注意")]),t._v(" "),s("ul",[s("li",[t._v("GET 可提交的数据量受到 URL 长度的限制，HTTP 协议规范没有对 URL 长度进行限制。这个限制是特定的浏览器及服务器对它的首先是。")]),t._v(" "),s("li",[t._v("理论上讲，POST 是没有大小限制的，HTTP 协议规范也没有进行大小限制，出于安全考虑，服务器软件在实现时会做一定的限制。")])]),t._v(" "),s("h2",{attrs:{id:"post-请求"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#post-请求","aria-hidden":"true"}},[t._v("#")]),t._v(" POST 请求")]),t._v(" "),s("p",[t._v("HTTP 协议中规定 POST 提交的数据必须在 body 部分中，但是协议中没有规定数据使用哪种编码方式或者数据格式。实际上，开发者完全可以自己决定消息主体的格式，只要最后发送的 HTTP 请求满足该有的格式就可以。")]),t._v(" "),s("p",[t._v("但是，数据发送出去，还要服务端解析成功才有意义。一般服务端语言如 php、python 等，以及它们的 framework，都内置了自动解析常见数据格式的功能。"),s("strong",[t._v("服务端通常是根据请求头（headers）中的 "),s("code",[t._v("Content-Type")]),t._v(" 字段来获知请求中的消息主体是何种方式编码，再对主体进行解析")]),t._v("。所以说到 POST 提交数据方案，包含了 Content-Type 和消息主体编码方式两部分。数据格式有：")]),t._v(" "),s("h3",{attrs:{id:"application-x-www-form-urlencoded"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#application-x-www-form-urlencoded","aria-hidden":"true"}},[t._v("#")]),t._v(" application/x-www-form-urlencoded")]),t._v(" "),s("p",[t._v("这应该是最常见的 POST 提交数据的方式。浏览器的原生 "),s("code",[t._v("<form>")]),t._v(" 表单，如果不设置 "),s("code",[t._v("enctype")]),t._v(" 属性，那么最终就会以 "),s("code",[t._v("application/x-www-form-urlencoded")]),t._v(" 方式提交数据。")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("POST http://www.example.com HTTP/1.1\nContent-Type: application/x-www-form-urlencoded;charset=utf-8\n\ntitle=test&sub%5B%5D=1&sub%5B%5D=2&sub%5B%5D=3\n")])])]),s("p",[t._v("首先，Content-Type 被指定为 application/x-www-form-urlencoded; 其次，提交的数据按照 "),s("code",[t._v("key1=val1&key2=val2")]),t._v("的方式进行编码，key 和 val 都进行了 URL 转码。可以看到 body 当中的内容和 GET 请求是完全相同的。大部分服务端语言都对这种方式都有很好的支持。")]),t._v(" "),s("p",[t._v("很多时候，我们用 Ajax 提交数据时，也是使用这种方式，例如过 JQuery 和 QWrap 的 Ajax，Content-Type 默认值都是 "),s("code",[t._v("application/x-www-form-urlencoded;charset=utf-8")]),t._v("。")]),t._v(" "),s("h3",{attrs:{id:"multipart-form-data"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#multipart-form-data","aria-hidden":"true"}},[t._v("#")]),t._v(" multipart/form-data")]),t._v(" "),s("p",[t._v("这又是一个常见的 POST 数据提交的方式。我们使用表单上传文件时，必须让"),s("code",[t._v("<form>")]),t._v(" 表单的 enctype 等于 multipart/form-data。直接来看一个请求示例")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("POST http://www.example.com HTTP/1.1\nContent-Type:multipart/form-data"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("boundary")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("----WebKitFormBoundaryrGKCBY7qhFd3TrwA\n\n------WebKitFormBoundaryrGKCBY7qhFd3TrwA\nContent-Disposition: form-data"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("name")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"text"')]),t._v("\n\ntitle\n------WebKitFormBoundaryrGKCBY7qhFd3TrwA\nContent-Disposition: form-data"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("name")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"file"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("filename")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"chrome.png"')]),t._v("\nContent-Type: image/png\n\nPNG "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),t._v(". content of chrome.png "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),t._v(".\n------WebKitFormBoundaryrGKCBY7qhFd3TrwA--\n")])])]),s("p",[t._v("首先生成了一个 boundary 用于分割不同的字段，为了避免与正文内容重复，boundary 很长很复杂。然后 Content-Type 里指明了数据是以 multipart/form-data 来编码，本次请求的 boundary 是什么内容。消息主体里按照字段个数又分为多个结构类似的部分，每部分都是以 --boundary 开始，紧接着是内容描述信息，然后是回车，最后是字段具体内容（文本或二进制）。如果传输的是文件，还要包含文件名和文件类型信息。消息主体最后以 --boundary-- 标示结束。")]),t._v(" "),s("p",[t._v("这种方式一般用来上传文件，各大服务端语言对它也有着良好的支持。")]),t._v(" "),s("p",[s("strong",[t._v("上面提到的这两种 POST 数据的方式，都是浏览器原生支持的，而且现阶段标准中原生"),s("code",[t._v("<form>")]),t._v(" 表单也只支持这两种方式（通过 "),s("code",[t._v("<form>")]),t._v(" 元素的 "),s("code",[t._v("enctype")]),t._v(" 属性指定，默认为 "),s("code",[t._v("application/x-www-form-urlencoded")]),t._v("。其实 "),s("code",[t._v("enctype")]),t._v(" 还支持 "),s("code",[t._v("text/plain")]),t._v("，不过用得非常少）。")])]),t._v(" "),s("p",[t._v("随着越来越多的 Web 站点，尤其是 WebApp，全部使用 Ajax 进行数据交互之后，我们完全可以定义新的数据提交方式，给开发带来更多便利。")]),t._v(" "),s("h3",{attrs:{id:"application-json"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#application-json","aria-hidden":"true"}},[t._v("#")]),t._v(" application/json")]),t._v(" "),s("p",[s("code",[t._v("application/json")]),t._v(" 这个 "),s("code",[t._v("Content-Type")]),t._v(" 作为响应头大家肯定不陌生。实际上，现在越来越多的人把它作为请求头，用来告诉服务端消息主体是序列化后的 "),s("code",[t._v("JSON")]),t._v(" 字符串。由于 JSON 规范的流行，除了低版本 IE 之外的各大浏览器都原生支持 "),s("code",[t._v("JSON.stringify")]),t._v("，服务端语言也都有处理 JSON 的函数，使用 JSON 不会遇上什么麻烦。")]),t._v(" "),s("p",[s("strong",[t._v("JSON 格式支持比键值对复杂得多的结构化数据，这一点也很有用。")])]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v('POST http://www.example.com HTTP/1.1 \nContent-Type: application/json;charset=utf-8\n\n{"title":"test","sub":[1,2,3]}   // chrome network 点击 view source 查看\n')])])]),s("p",[t._v("这种方案，可以方便的提交复杂的结构化数据，特别适合 RESTful 的接口。各大抓包工具如 Chrome 自带的开发者工具、Firebug、Fiddler，都会以树形结构展示 JSON 数据，非常友好。")]),t._v(" "),s("h3",{attrs:{id:"text-xml"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#text-xml","aria-hidden":"true"}},[t._v("#")]),t._v(" text/xml")]),t._v(" "),s("p",[t._v("它是一种使用 HTTP 作为传输协议，"),s("code",[t._v("XML")]),t._v(" 作为编码方式的远程调用规范。典型的 XML-RPC 请求是这样的：")]),t._v(" "),s("div",{staticClass:"language-xml extra-class"},[s("pre",{pre:!0,attrs:{class:"language-xml"}},[s("code",[t._v("POST http://www.example.com HTTP/1.1 \nContent-Type: text/xml\n\n"),s("span",{pre:!0,attrs:{class:"token prolog"}},[t._v('<?xml version="1.0"?>')]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("methodCall")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("methodName")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("examples.getStateName"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("methodName")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("params")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("param")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("value")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("i4")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("41"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("i4")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("value")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("param")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("params")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("methodCall")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),s("p",[t._v("XML-RPC 协议简单、功能够用，各种语言的实现都有。它的使用也很广泛，如 WordPress 的 XML-RPC Api，搜索引擎的 ping 服务等等。JavaScript 中，也有现成的库支持以这种方式进行数据交互，能很好的支持已有的 XML-RPC 服务。不过，XML 结构还是过于臃肿，一般场景用 JSON 还是会更灵活方便。")]),t._v(" "),s("h2",{attrs:{id:"参考资料"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#参考资料","aria-hidden":"true"}},[t._v("#")]),t._v(" 参考资料")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"https://juejin.im/entry/5b004085f265da0b886daf7c",target:"_blank",rel:"noopener noreferrer"}},[t._v("HTTP请求方法详解"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types",target:"_blank",rel:"noopener noreferrer"}},[t._v("MIME 类型"),s("OutboundLink")],1),t._v(" -- 浏览器通常使用 MIME 类型（而不是文件扩展名）来确定如何处理 URL。")])])])},[],!1,null,null,null);a.default=r.exports}}]);