# Unity


## 十六 Unity开发环境

**六大面板**：
- 场景面板(Scene):  提供三维场景内容的导航，允许你选择、移动、旋转或缩放场景中的对象
- 游戏面板(Game):   可以在游戏面板中查看游戏运行时的实际画面
- 层级面板(Hierarchy):  展示当前场景中包含的每个游戏对象
- 项目面板(Project):  展示项目中所有的资源(Assets)，每一项资源都是构成项目的一个任何类型的文件
- 检视面板(Inspector):  当在项目面板选中一项资源时，或在场景面板或层级面板选中一个游戏对象时，可以在检视面板中查看或编辑它的信息
- 控制台面板(Console):  查看Unity软件给出的关于错误或代码Bug的信息

## 十九.变量和组件

### Unity中的重要变量

**三维向量(Vector3)**：三个浮点数的集合，存储对象的三维空间位置

eg:三维向量的实例变量和函数
```cs
  Vector3 position = new Vector3(0.0f, 3.0f, 4.0f); //设置 x, y, z 的值
  print(position.x);
  print(position.y);
  print(position.z);
  print(position.magnitude); // 5.0 三维向量到坐标原点0，0，0的距离长度
  position.Normalize(); // 设置position变量的 Magnitude属性为1 position的x,y,z变成(0.0, 0.6, 0.8)
```

eg:三维向量的静态变量和函数
```cs
  print(Vector3.zero); // (0,0,0) 是 new Vector3(0,0,0)的简写
  print(Vector3.one); // (1,1,1) 是 new Vector3(1,1,1)
  print(Vector3.right); // (1,0,0) 是new Vector3(1,0,0)的简写
  print(Vector3.up); // (0,1,0) 是new Vector3(0,1,0)的简写
  print(Vector3.forward); // (0,0,1) 是new Vector3(0,0,1) 的简写
  Vector3.Cross(v3a, v3b); // 计算两个Vector3的向量积
  Vector3.Dot(v3a, v3b); // 计算两个Vector3的标量积
```

**颜色(Color)**：带有透明度信息的颜色
- 由红、绿、蓝三种颜色加透明度(Alpha)组成，电脑屏幕的颜色通过加色法叠加而成
- 成分存储为一个0.0f到1.0f之间的浮点数，其中0.0f表示该颜色通道亮度为0，而1.0f表示该颜色通道亮度为最高
- 定义颜色有两种方式，一种是三个参数(红，绿，蓝)，另一种是(红，绿，蓝，Alpha)

eg:颜色的实例变量和函数
```cs
print(Color.yellow.r); // 1 颜色的红色通道值
print(Color.yellow.g); // 0.92f 颜色的绿色通道值
print(Color.yellow.b); // 0.016f 颜色的蓝色通道值
print(Color.yellow.a); // 1 颜色的alpha通道值
```

eg:颜色的静态变量和函数
```cs
// 三原色
Color.red = new Color(1,0,0,1); // 纯红色
Color.green = new Color(0,1,0,1); // 纯绿色
Color.bloe = new Color(0,0,1,1); //纯蓝色
// 合成色
Color.cyan = new Color(0,1,1,1); //青色 亮蓝绿色
Color.magnta = new Color(1,0,1,1); // 品红 粉紫色
Color.yellow = new Color(1, 0.92f, 0.016f, 1) // 黄色 Unity定义的
Color.black = new COlor(0,0,0,1); // 黑色
Color.white = new Color(1,1,1,1); // 白色
Color.grey = new Color(0.5f, 0.5f, 0.5f, 1); // 灰色
Color.clear = new COlor(0,0,0,0); // 完全透明
```

**四元数(Quaternion)**：旋转信息。通常会通过GameObject.transform.rotation设置和调整对象的旋转。四元数定义旋转的方式可以避免发生万向节死锁

eg:定义一个四元数
```cs
  Quaternion lookUp45Deg = Quaternion.Euler(-45f, 0f, 0f);
  // 传入Quaternion.Euler()函数的三个浮点数是沿x、y和z轴旋转的角度
```

eg:四元数的实例变量和函数
```cs
print(lookUp45Deg.eulerAngles); // (-45,0,0) 欧拉角
```

**数学运算(Mathf)**：一个数学函数库
- Mathf附带的所有变量和函数都是静态的，不能创建Mathf的实例

eg:Mathf的(部分)静态变量和函数
```cs
Mathf.Sin(x); // 计算x的正弦值
Mathf.Cos(x); // 计算x的余弦值
Mathf.Atan2(y, x); // 计算沿z轴旋转的角度，使原来朝向x轴正方向的对象转而朝向点(x, y)
print(Mathf.PI); // 3.141593 圆周率
Mathf.Min(2, 3, 1); // 1 取三个数中的最小值
Mathf.Max(2, 3, 1); // 3 取三个数中的最大值
Mathf.Round(1.75f); // 2 四舍五入到最接近的整数
Mathf.Ceil(1.75f); // 2 向上舍入到最接近的整数
Mathf.Floor(1.75f); // 1 向下舍入到最接近的整数
Mathf.Abs(-25); // 25 -25的绝对值
```

**屏幕(Screen)**：关于屏幕显示的信息，提供关于Unity游戏所使用的特定计算机屏幕的信息，与设备无关

eg:屏幕的静态变量和函数
```cs
print(Screen.width); // 以像素为单位输出屏幕的宽度
print(Screen.height); // 以像素为单位输出屏幕的高度
Screen.showCursor = false; // 隐藏光标
```

**系统信息(SystemInfo)**：关于设备的信息，包括操作系统、处理器、显示硬件等设备信息

eg:系统信息的静态变量和函数
```cs
print(SystemInfo.operatingSystem); // 输出操作系统名称
```

**游戏对象(GameObject)**：场景中任意对象的类型，GameObject是Unity场景中所有实体的基类，在Unity游戏屏幕上看到的所有东西都是游戏对象类的子类，GameObject可以包含任意数量的不同组件

eg:
```cs
GameObject gObj = new GameObject("MyGO"); // 创建一个名为MyGO的游戏对象
print(gObj.name); // 输出MyGO 游戏对象gObj的名称
Transform trans = gObj.GetComponent<Transform>(); // 定义变量trans为gObj的变换组件
Transform trans2 = gObj.transform; // 访问同一个变换组件的另一快捷方式
gObj.SetActive(false); // 让gObj失去焦点，变为不可见，使其不可运行代码
```

注意：`gObj.GetComponent<Transform>()`可以用来访问游戏对象所绑定的组件，可用于多种不同的数据类型

eg:
```cs
Renderer rend = gObj.GetComponent<Renderer>(); // 获取渲染器组件
Colloder coll = gObj.GetComponent<Colloder>(); // 获取碰撞器组件
HelloWorld hwInstance = gObj.GetComponent<HelloWorld>(); // 如果gObj上绑定了一个HelloWorld的实例，可以通过这个方法返回这个实例
```

### Unity游戏对象和组件

Unity中所有显示在屏幕上的元素都是游戏对象，并且所有游戏对象都由**组件**构成

**Transform 变换组件**：是所有游戏中必然存在的组件，控制着游戏对象的定位、旋转和缩放，它还负责层级面板中的父/子关系，若一个对象是另一个对象的子对象，它就像附着在父对象一样，随父对象同步移动

**MeshFilter 网格过滤器**：将项目面板中的MeshFilter绑定到游戏对象上。要使模型显示在屏幕上，游戏对象必须有一个网格过滤器(用于处理实际的三位网格数据)和一个网格渲染器(用于将网格与着色器或材质相关联，在屏幕上显示图形)。网格过滤器为游戏对象创建一个皮肤或表面，网格渲染器决定该表面的形状、颜色和纹理

**Renderer 渲染器**：允许你从屏幕上查看到场景和游戏面板中的游戏对象。网格渲染器要求网格过滤器提供三维网格数据，将网格过滤器、材质和光照组合在一起，将游戏对象呈现在屏幕上
l
**Colllder 碰撞器**：使游戏对象在游戏世界中产生物理存在，可与其他对象发生碰撞。Unity中有四种类型的碰撞器组件：
- 球状碰撞器：运算速度最快的形状，为球体
- 胶囊碰撞器：两端为球体，中间为圆柱体，运算速度次之
- 盒状碰撞器：一种长方体，适用于箱子、汽车、人体躯干等
- 网格碰撞器：由三维网格构成的碰撞器，比较实用和精确，但运算速度最慢，并且只有凸多面体属性设置为true的网格碰撞器才可以与其他网格碰撞器发生碰撞

**Rigidbody 刚体组件**：控制着游戏对象的物理模拟(要使碰撞器随游戏对象移动，游戏对象必须有刚体组件)

**Script 脚本组件**：所有的C#脚本都是游戏对象的组件


## 二十三.函数与参数

**Unity不允许直接修改变换组件的position.x值**

```cs
    void AlignX(GameObject go0, GameObject go1, GameObject go2)
    {
        float avgX = go0.transform.position.x;
        avgX += go1.transform.position.x;
        avgX += go2.transform.position.x;
        avgX = avgX / 3.0f;
        setAvg(go0, avgX);
        setAvg(go1, avgX);
        setAvg(go2, avgX);
    }

    void setAvg(GameObject go, float avg)
    {
        Vector3 vt = go.transform.position;
        vt.x = avg;
        go.transform.position = vt;
    }
```

**可选参数**

```cs
    void Awake()
    {
      SetX(this.gameObject, 25); // 因为浮点数可以存储任何整数值，所以把整数值传给浮点型变量不会有问题
      SetX(this.gameObject); // transform.position.x = 0
    }
    void SetX(GameObject go, float eX = 0.0f) // eX变量设置了默认值，编译器会自动把它当作可选参数
    {
        Vector3 vt = go.transform.position;
        vt.x = eX;
        go.transform.position = vt;
    }
```

**params 关键字**

使用`params`关键字可以让函数接收任意数量的同类型参数，这些参数会被转化成该类型的数组

```cs
    int Add(params int[] ints)
    {
        int sum = 0;
        foreach(int i in ints)
        {
            sum += i;
        }
        return sum;
    }
```

**递归函数**

```cs
    int Fac(int n)
    {
        if(n < 0)
        {
            return (0);
        }
        if (n == 0)
        {
            return (1);
        }
        int result = n * Fac(n - 1);
        return result;
    }
    void Awake()
    {
      Fac(5);
    }
```
![](../.vuepress/public/images/Fac.png)

## 二十四.代码调试

**编译时错误**：是Unity在对C#代码进行编译（编译是指对C#代码进行解析并将其转换为通用中间语言，然后将通用中间语言转换为计算机上运行的机器语言）时发现的错误