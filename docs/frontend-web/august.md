<!--
 * @Author: your name
 * @Date: 2020-08-21 11:05:05
 * @LastEditTime: 2020-08-30 18:32:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /Notebook/docs/frontend-web/August.md
-->

# 八月

## 新的跨域策略：使用 COOP、COEP 为浏览器创建更安全的环境

![](../.vuepress/public/images/new-cross.png)

**COOP**：跨源开放者政策，对应的 HTTP Header 是 Cross-Origin-Opener-Policy。

[https://juejin.im/post/6855129007906963464](https://juejin.im/post/6855129007906963464)

## GPT-3 袭来，谈谈如何实现智能切图

![](../.vuepress/public/images/capture.png)

- 基于文本生成文本
- 基于图片生成文本
- 图像识别技术
- 基于设计稿的自动切图

[https://zhuanlan.zhihu.com/p/188437243](https://zhuanlan.zhihu.com/p/188437243?utm_source=wechat_timeline&utm_medium=social&utm_oi=26963871793152&from=timeline&s_r=0)

## 前端性能优化实践之百度 App 个人主页优化

![](../.vuepress/public/images/youhua.png)

优化三部曲，这也是所有优化项目的基本步骤：

- 现状摸底
- 发现问题
- 解决问题

[https://mp.weixin.qq.com/s/DBKTVhD04kc_LNrD53BYBw](https://mp.weixin.qq.com/s/DBKTVhD04kc_LNrD53BYBw)

## 基于 WebP 的图片高性能加载方案

WebP 是 Google 推出的一种同时提供了有损压缩与无损压缩（可逆压缩）的图片文件格式。派生自影像编码格式 VP8，被认为是 WebM 多媒体格式的姊妹项目，是由 Google 在购买 On2 Technologies 后发展出来，以 BSD 授权条款发布

WebP 的优势体现在它具有更优的图像数据压缩算法，能带来更小的图片体积，而且拥有肉眼识别无差异的图像质量；同时具备了无损和有损的压缩模式、Alpha 透明以及动画的特性，在 JPEG 和 PNG 上的转化效果都相当优秀、稳定和统一。

[https://mp.weixin.qq.com/s/rSpWorfNTajtqq_pd7H-nw](https://mp.weixin.qq.com/s/rSpWorfNTajtqq_pd7H-nw)

## WordPress 团队新发布的团队协作工具，有点类似公司内部的博客系统，可以免费使用

![](../.vuepress/public/images/p2.png)

[https://zh-cn.wordpress.com/](https://zh-cn.wordpress.com/)

## DevTools（Chrome 85）的新功能

- Network 面板的 Timing 选项卡现在包括 responseWith 事件，该事件记录了服务工作者 fetch 事件处理程序运行前到承诺完成时的时间

- 在 Console settings 中，Group similar 切换现在适用于重复的消息，控制台设置中的 "只选择上下文（Selected context only） "设置现在被坚持下来了。
  如果应用程序图标的大小不正确或不是正方形，Manifest 面板现在会显示应用程序快捷方式的警告

- CSS-in-JS 框架的样式编辑

- 使用 Acorn 在 DevTools 控制台中解析 JavaScript

![](../.vuepress/public/images/chrome.png)

[https://juejin.im/post/6857123918034141192](https://juejin.im/post/6857123918034141192)

## 前端工程师不可不知的 Nginx 知识

互联网的全球化导致了互联网的数据量快速增长，加上在本世纪初摩尔定律在单核 CPU 上的失效，CPU 朝着多核方向发展，而 Apache 显然并没有做好多核架构的准备，它的一个进程同一时间只能处理一个连接，处理完一个请求后才能处理下一个，这无疑不能应对如今互联网上海量的用户。况且进程间切换的成本是非常高的。在这种背景下，Nginx 应运而生，可以轻松处理数百万、上千万的连接

![](../.vuepress/public/images/nginx.png)

[https://juejin.im/post/6864085814571335694](https://juejin.im/post/6864085814571335694)

## Easy-Monitor 3.0 开源 - 基于 Addon 的 Node.js 性能监控解决方案

![](../.vuepress/public/images/easy-monitor.png)

3.0 具备以下新特性：

- 针对 Node.js 进程与系统指标的性能监控
- 错误日志展示与依赖 Npm 模块安全风险提示
- 自定义智能运维告警与线上进程实时状态导出

对比起 AliNode 等前辈，Easy-Monitor 提供了：

- 私有化部署能力。
- 低侵入性，通过 Addon 的方式提供能力，无需定制 Node.js Runtime，能更快的跟进上游。
- 支持 Linux、macOS、Windows 三大操作系统。

[https://cnodejs.org/topic/5ee1ee83b703280f0bcb922a](https://cnodejs.org/topic/5ee1ee83b703280f0bcb922a)
