# leTao 乐淘

> Imooc Mall 

## Build Setup

# 乐淘

## 前言
    一直当前是大前端时代，前后端通吃，一直没有尝试，最后在慕课网上看到一个vue+node.js+mongodb的商城实现，决定照着实现一下，重点学习一下node.js和mongodb数据库，项目涉及登录、商品列表、加入购物车、下单等等。
   
## 技术栈
    Vue2 + vue-router + webpack + Es6 + axios + svg + node.js + mongodb+ mongoose

## 接口数据
    通过mongodb+node.js实现。
    关于mongodb的常规操这里不做赘述，网上各种教程都有（eg：http://www.runoob.com/mongodb/mongodb-tutorial.html）
    在下在使用接口中关于数据库的操作使用的是mongoose,同样去看教程吧。使用过程中遇到了很多的坑（后期会找时间补上）。
    
## 关于部署
    我是采用了一个简单的方式。将build好的前端项目直接放在server/views中，然后将server目录上传至服务器。
    这得修改一些配置才能实现：
    server/app.js  如下修改即可
    //访问静态资源
    // app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.static(path.join(__dirname, 'views')));

## 启动项目
``` bash
    首先得在本地安装mongodb数据库。
    简要说一下mac上mongodb的安装
    https://www.mongodb.com/download-center#community下载对应的包。
    在本地新建一个mongodb目录
    mongodb目录下分别创建data(存mongodb数据)、etc(数据库配置)、logs（日志）
    
    然后在logs目录下创建.logs文件存放日志。etc 创建一个.conf文件制定一些配置参数
    .conf基本配置如下
    dbpath=/Users/tom/mongodb/data
    logpath=/Users/tom/mongodb/logs/mongo.log
    logappend=true
    quiet=true
    journal=true 
        .
        .
        .
    我这里的路径都是绝对路径（关于linux的操作真是不太会）;               
    
  
   
# install dependencies
npm install

#启动后端服务
node server/bin/www

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 项目布局

```txt
├── README.md
├── build                                    //webpack配置文件
├── config                                   // 项目打包路径
├── dist                                     // 打包文件
├── mock                                     //数据mock
├── package.json                             //项目依赖
├── resource                                
│   ├── dumall-goods                         //mongodb 中的商品数据（可使用mongoimport导入）
│   ├── dumall-users                         //mongodb 中的用户数据（可使用mongoimport导入）
│   ├── loading                              //项目中使用到的svg图片
├── server
│   ├── app.js                               //server入口
│   ├── bin                     
│   │   └── www                              //server启动文件
│   ├── models                               //定义mongodb表结构
│   ├── package.json                         //独立出来的server端依赖
│   ├── routes                               //接口
│   ├── util                                 //工具方法
│   │   └── util.js
│   └── views                                //视图
│       └── index.html
├── src
│   ├── App.vue                              //vue主页面
│   ├── assets                               //静态资源
│   ├── components                           //组件
│   ├── main.js                              //vue 入口文件
│   ├── router                               //vue路由
│   ├── util                                 //前端工具方法
│   └── views                                //主要页面（路由页面）
├── static                                   //静态资源
```
