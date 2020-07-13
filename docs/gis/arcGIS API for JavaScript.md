# ArcGIS API for JavaScript 

## esri/geometry/Extent

methods:

**expand(number)**: 将范围扩展。例如，值1.5会将范围扩展到比原始范围大50％。此方法用于修改范围几何。在适当的地方调用此方法之前，应先克隆扩展区对象

原始范围：

![](../.vuepress/public/images/expand-1.jpg)

扩大50%：expand(1.5)

![](../.vuepress/public/images/expand-2.jpg)

扩大400%：expand(5)

![](../.vuepress/public/images/expand-3.jpg)
