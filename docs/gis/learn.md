# ArcGIS API for JavaScript
通过ArcGIS API for JavaScript可以对ArcGIS for Server进行访问，并且将ArcGIS for Server提供的地图资源和其他资源（ArcGIS Online）嵌入到Web应用中。

## ArcGIS API for JavaSript主要特点
1. 空间数据展示：加载地图服务，影像服务，WMS等。
2. 客户端Mashup：将来自不同服务器、不同类型的服务在客户端聚合后统一呈现给客户。
3. 图形绘制：在地图上交互式地绘制查询范围或地理标记等。
4. 符号渲染：提供对图形进行符号化，要素图层生成专题图和服务端渲染等功能。
5. 查询检索：基于属性和空间位置进行查询，支持关联查询，对查询结果的排序、分组以及对属性数据的统计。
6. 地理处理：调用ArcGIS for Server发布的地理处理服务（GP服务），执行空间分析、地理处理或其他需要服务器端执行的工具、模型、运算等。
7. 网络分析：计算最优路径、临近设施和服务区域。
8. 在线编辑：通过要素服务编辑要素的图形、属性、附件，进行编辑追踪。
9. 时态感知：展示、查询具有时间特征的地图服务或影像服务数据。
10. 影像处理：提供动态镶嵌、实时栅格函数等处理等功能。
11. 地图输出：提供多种地图图片导出和服务器端打印等功能。

在使用ArcGIS API for JavaScript的时候，其实就是在使用这些REST API使用这些服务对外的能力，了解每种服务的具体功能，在开发的时候就可以根据需求做到游刃有余。

## 集成开发环境和API的准备
要引入ArcGIS API for JavaScript的开发包

下载链接：

[https://developers.arcgis.com/downloads/apis-and-sdks?product=javascript](https://developers.arcgis.com/downloads/apis-and-sdks?product=javascript)

注册账号：

[https://accounts.esri.com/en/signup?redirect_uri=http%3A%2F%2Fappsforms.esri.com%2Fproducts%2Fdownload%2Findex.cfm%3Ffuseaction%3Ddownload.all](https://accounts.esri.com/en/signup?redirect_uri=http%3A%2F%2Fappsforms.esri.com%2Fproducts%2Fdownload%2Findex.cfm%3Ffuseaction%3Ddownload.all)

### 修改API的两个JS文件
1. D:\software\arcgis_js_v48\arcgis_js_v48_api\arcgis_js_api\library\4.8\init.js
	
	将`https://[HOSTNAME_AND_PATH_TO_JSAPI]dojo`修改成`http://localhost/arcgis_js_api/library/4.8/dojo`

	![](https://i.imgur.com/34gjh2a.png)
2. D:\software\arcgis_js_v48\arcgis_js_v48_api\arcgis_js_api\library\4.8\dojo\dojo.js

	将`https://[HOSTNAME_AND_PATH_TO_JSAPI]dojo`修改成`http://localhost/arcgis_js_api/library/4.8/dojo`

	![](https://i.imgur.com/UZ8MSZm.png)


----------


### Tomcat部署
将arcgis_js_api放在webapps下，同样修改两个js文件

修改后图片：

dojo.js修改：

![](https://i.imgur.com/EnfkBKB.png)

init.js修改

![](https://i.imgur.com/AzLthZ4.png)

然后创建一个项目：

![](https://i.imgur.com/BiFzgS4.png)

打开浏览器就可以看到效果了。


### IIS部署
打开控制面板，点击【程序】→【启用或关闭Windows功能】，然后找到Internet信息服务，然后进行勾选。

![](https://i.imgur.com/XAjhmHY.png)

FTP服务器和Web管理器全选和万维网服务中的安全性、常见HTTP功能。性能功能全选。应用程序开发功能和运行状况和诊断按下图选

![](https://i.imgur.com/Am3Td5I.png) ![](https://i.imgur.com/YSpUcEA.png)

### 打开IIS管理器
打开控制面板，点击【系统与安全】→【管理工具】→【Internet信息服务（IIS）管理器】，打开IIS管理器

![](https://i.imgur.com/4gyDLUI.png)

### 配置IIS管理器
在硬盘的某一位置新建一个Web站点文件夹（我建在了D:\\Web）

设置后的显示：

![](https://i.imgur.com/UQJm5X1.png)

输入网址

![](https://i.imgur.com/7dTTi1o.png)

如果不行的话应该是没打开目录浏览，进去之后右边有一个启用的按钮。

![](https://i.imgur.com/ynHDqOy.png)

输入`http://localhost/arcgisjssdk/sdk/index.html`可看到：

![](https://i.imgur.com/AxnE7ie.png)


----------


参考链接：

- [OGC、WMS、WFS、WCS](https://blog.csdn.net/hi_kevin/article/details/34445911)
- [【一】ArcGIS API for JavaScript之API的使用和部署](https://blog.csdn.net/yy284872497/article/details/78878435)
- [Win10下Arcgis api for javascript的本地服务器（IIS）配置](https://blog.csdn.net/qq_36305327/article/details/56008464)
- [arcgis api for js 3.25](https://developers.arcgis.com/javascript/3/jsapi/)
- [http://www.ibloger.net/category-37.html](http://www.ibloger.net/category-37.html)