# Vue+node购物商城
@(Vue项目)

## 地址
1、原地址：https://imooc.51purse.com/#/goods
2、github地址：https://github.com/wwml725/vue-shopmall.git
3、 克隆地址：git@github.com:wwml725/vue-shopmall.git


## 启动方式
启动本地数据库:
- 1、在`D:\MongoDB\MongoDB64位绿色版\MongoDB\bin`打开cmd命令输入：`./mongod --dbpath='wangwei'`(wangwei是bin目录下的文件夹可以按自己的要求命名，前提是创建文件夹`wangwei`)
- 2 、在`D:\MongoDB\MongoDB64位绿色版\MongoDB\bin`再打开一个cmd命令输入：`./mongo`
- 3、打开客户端`mongoVUE.exe`

![Alt text](./mongoVUE1.png)

![Alt text](./mongoVUE-2.png)
![Alt text](./mongoVUE-3.png)
![Alt text](./mongoVUE-4.png)
![Alt text](./mongoVUE-5.png)

在后台服务根目录下
```
cd server 
node server bin/www
```

在项目根目录下：
```
npm start
```



## 项目需求和基础知识点
### 1、项目需求和布局
1、地址：https://imooc.51purse.com/#/goods
2、商品列表
3、价格区间的筛选
4、商品价格排序
5、鼠标指针停留在商品图片的时候会有一个动画效果
6、商品列表，有一个图片懒加载功能，下拉加载
7、登录退出功能
8、点击按钮加入购物车，没有登陆，会提示登录
9、购物车有一个单选、全选、删除功能（使用了一个关于金额的插件）
10、如果已经登陆，点击加入购物车会提示，已加入购物车
11、地址页面
12、订单结算页面

### 2、vue环境搭建以及vue-cli的使用
#### 2.1、Vue多页面应用文件引用
- 官网拷贝：
- npm安装
#### 2.2、vue-cli构建SPA应用
- `npm install -g vue-cli`
- `vue init webpack-simple demo`   这是简单模式的webpack环境
- `vue init webpack demo2`  完整版的vue+webpack开发环境（一般使用这个）

> 注意：由于在本地全局安装了vue-cli3全局脚手架，使用2.0的命令就可以创建cli环境了（参考笔记vue-cli3.0）

1、使用**vue init webpack-simple demo**安装简单模式
- 安装
![Alt text](./vue-cli简单模式.png)
- 简单模式目录
![Alt text](./简单模式目录.png)

2、完整模式`vue init webpack demo2`
- 完整模式目录
![Alt text](./完整模式目录.png)
> **问题**：1、asset和static的区别？
> 相同点：都是存放静态资源的。
> 不同点：
> asset：存放较小图片，打包的时候使用base64打包在一起
>static：中的图片一张就是一张，使用src的方式引用，存放页面中比较大的一些图片

> **问题来了**：什么才算是大图片？

在当前项目中直接使用：vue init webpack vue-shopMall


### 3、基于express框架搭建开发环境
- 安装express-generator生成器
- 通过生成器安装项目
- 配置分析

**安装express-generator生成器**  :全局安装
```
npm install express-generator --global
```
**通过生成器安装项目**
```
express server
```
- server 是项目根目录名称
- 目录
![Alt text](./express-generator.png)

**配置分析**

**启动**
```
node server bin/www
```

**改用html模板**
- 因为`express-generator`默认使用的是.jade模板，可读性比较差，改用html模板。
- 怎么改，就像之前一样，设置`模板引擎`

- 需要安装ejs
```
npm install ejs --save
```

```
var  ejs = require('ejs')
app.set('views', path.join(__dirname, 'views'));
app.engine('html',ejs.__express)
app.set('view engine', 'html');
```


--------------------------------------------------------------------------------
--------

## 项目开发过程
绑定github：wwml725
项目克隆地址：git@github.com:wwml725/vue-shopmall.git
### 1、搭建vue-cli开发环境------前端
因为已经在全局安装了脚手架，直接使用下面的命令就可以了
```
vue init webpack vue-shopmall
```


前端依赖
```
npm install axios vue-lazyload vue-infinite-scroll  --save
```
### 2、express开发环境------后端
```
npm install express-generator --global
```
因为已经在全局安装了`express-generator`,所以直接执行下列命令搭建环境：
```
express server
```
- cd server

```
npm install
npm install mongoose --save
```

- 因为`express-generator`默认使用的是.jade模板，可读性比较差，改用html模板。
- 怎么改，就像之前一样，设置`模板引擎`
- 需要安装ejs
```
npm install ejs --save
```

```
var  ejs = require('ejs')
app.set('views', path.join(__dirname, 'views'));
app.engine('html',ejs.__express)
app.set('view engine', 'html');
```

后端依赖
```
npm install ejs mongoose --save
```
**启动**
```
node server bin/www
```

> 问题：axios和vue-axios有什么区别？


---------------------------------------------------------------------------
---------------------------------------------------------------------------

### 3、页面布局和样式以及逻辑功能
#### 首先完成页面布局和样式
- 仔细研究一下，页面的布局，和动画效果
- 用了响应式布局（这个平时练习的比较少，在这里多做一些练习）
- 配置路由代码
#### 页面组件的拆分
页面级组件
基础组件

#### 页面布局
先完成商品页面的基本布局，写一个商品数据文件，通过axios获取商品数据，渲染页

#### 页面级组件

---------------------------------------------------------------------------
---------------------------------------------------------------------------

#### 首页---商品页面
- header
- bread
-  其他
- footer

**功能**
- 排序
- 价格筛选
- 图片懒加载
- 登录退出
- 验证是否登录
- 点击商品购物车按钮，首先会验证是否登录，
	- 如果没有登录会提示请登录，
	- 如果已经登录，就会将商品提交至购物车



**小知识点**
>1、mock数据，在vue-cli中代理这个接口，在组件中获取数据：
>- 在根目录创建mock/goods.json文件
>- 在build/webpack.dev.config中设置服务器接口（在devServer中添加）
>```
 before(app) {
      app.get('/goods', function (req, res) {
        res.json(goodsData)
      })
    },
>```
>- 安装axios用来调取接口获取json数据
>```
npm install axios --save
>```
>- 在商品页面，创建函数通过axios调取接口

**1、设置后台接口**
- 有一个前提就是，在数据库中事先保存好项目所需要的数据
- 在express设置好数据接口：
- 商品列表数据接口：http://localhost:3000/goods/list/goods/addCart
- 加入购物车数据接口：http://localhost:3000/goods/addCart
- 购物车页面通过http://localhost:3000/users/cartList接口获取数据
- 通过后台接口，访问数据库，再将数据库中的数据返回至客户端
- 由于存在跨域情况，需要设置接口代理
```
 proxyTable: {
      '/goods':{
        target:'http://localhost:3000'
      }
    },
```
- 之后在组件中直接调用'/goods/list'接口就可以获取数据。

接口分析：http://localhost:3000/goods/list
```
 var param = {
          page: 获取第几页的数据（数值）,
          pageSize: 每页获取几条（数值）,
          sort: 1 代表正序 -1代表倒序（数值）,
          priceLevel: 价格区间 0,1,2,3（每一个数值代表一个价格区间，后台设置）
        }
 axios.get("/goods/list", {
          params: param
        }).then((res)=>{
        
        })
```
- 注意：
	- 1、页面初始化，调用这个接口，在前端设置了默认接口
	- 2、排序或者筛选的时候，修改部分参数默认值后，在调用这个接口，从而达到不同的功能


接口分析：http://localhost:3000/goods/addCart
```
 axios.post('/goods/addCart', {
          productId: productId
        }).then((res) => {})
```
- 注意
	- 1、传入一个商品的id，调用接口，后台会通过这个id找到商品数据，并且保存在已登录用户的购物车列表中（后台会经过一系列的逻辑运算，以不同的方式保存到购物车中），然后将购物车的数据返回给前端

功能插件---图片懒加载
```
npm i vue-lazyload -S
```
功能插件---下拉加载功能
```
npm install vue-infinite-scroll --save
```
-------------------------------------------------------------------
-------------------------------------------------------------------
其他页面基本都是这个套路，省略


其他注意事项：

- 将这个项目的css的样式和字体和SVG等等熟悉一下。
- 貌似显示使用的svg字体很少，那就改成icon-font 阿里巴巴矢量图
- 全局模态框的实现
- 复习slot
- 注意mongodb删除数据的api有什么？？
- 购物车商品删除功能
	- 传入参数，瞄准数据库中的数据，删除数据库中的数据，然后在页面中重新初始化页面

- 商品修改功能，编辑商品
- 全选，总价格
- 这里有一个货币插件，currency很好用

-----------------------------------------------------------------------
-----------------------------------------------------------------------
#### 地址页面
- 地址列表功能实现
- 地址切换和展开功能的实现
- 地址默认功能实现
- 地址删除功能实现
- 添加地址功能

---------------------------------------------------------------------
---------------------------------------------------------------------

#### 订单页面
- Format 使用了一个函数，网上有
- 注意：购物车页面选中之后，跳转至订单页面（订单页面的数据是从购物车中获取的），点击确认之后，将订单数据提交至数据库

-----------------------------
-------------------------------
## 以上使用了mongodb+vue+express完成了项目的基本功能
## 接下来需要使用vue重写登录功能 ，使用vuex完成购物车

#### 1、首先分析整个项目那些数据需要多个页面进行交互，将这些数据放到vuex中

```
npm install vuex --save
```


## 这个项目是只有登录之后才能加入购物车

#### 写完之后，修改部分bug之后，添加地址添加页面
首先看有关地址的数据有哪些？
- addressId  这个地址ID在后台经过计算得出
- userName  填写
- streetName  省市地址
- postCode  邮编
- tel 电话
- isDefault : false

- 添加新地址功能已经完成

###复习html，弹性盒子

## 将项目部署到服务器上







