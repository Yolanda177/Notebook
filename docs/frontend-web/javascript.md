# JavaScript

## 拷贝 clone

Q：为什么要拷贝？如何拷贝？

A：拷贝对象是前端很常见的操作，用作备用或对比等场景。拷贝对象有两种：浅拷贝和深拷贝，什么时候用浅拷贝？什么时候用深拷贝呢？
- 浅拷贝 shallowClone
- 深拷贝 deepClone

### 浅拷贝 shallowClone

浅拷贝表现为：自己创建一个新的对象，如果源数据属性是*基本类型*，复制直接将基本类型的值给新对象；如果源数据属性是*引用类型*，复制的是内存的地址，如果其中一个对象修改了属性值，另一个对象的属性也会跟着变化

常见的几种浅拷贝方法：
- Object.assign
- 扩展运算符
- 自定义实现

#### 浅拷贝 —— Object.assign()

Object.assign() 是 ES6 中新增的一个方法，除了用于对象合并，还可以用于浅拷贝，将源对象（source）的所有可枚举属性，复制到目标对象（target）
```js
const target = {
  name: "Tom",
  age: 24,
  family: {
    father: "papa",
    mother: "mama"
  }
}
const source1 = { family: { sister: "sis" }}
const source2 = { age: 22 }
Object.assign(target, source1, source2)
console.log(target)
// {
//   name: "Tom",
//   age: 22,
//   family: {
//     father: "papa",
//     mother: "mama",
//     sister: "sis"
//   }
// }
```


### 深拷贝 deepClone
