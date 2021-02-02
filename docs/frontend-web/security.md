# 前端安全

## 跨域认证 JWT

- [阮一峰 JSON Web Token 入门教程](http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html)

## Http 为什么不安全？

1. 使用明文，不加密：内容可能被窃听
2. 不验证通信方身份：黑客伪装
3. 无法验证报文的完整性：报文内容可能被篡改

### 1.使用明文

![](../.vuepress/public/images/http_mingwen.png)

客户端将数据发出后
