## 初衷

此库借鉴了 element-ui 等一些优秀的库的思想和实现方式。
最终实现的是符合自己业务的功能。便于观看和维护


## npm 安装

推荐使用 npm 的方式进行开发， 因为 node 生态圈和 webpack 工具链提供了大量的资源。

``` shell
npm install element-ui --save
```

## 快速开始

### 1. VUE CLI 3

直接使用 vue cli 快速搭建 vue 开发环境。

``` shell
$ vue create [app name]

$ cd [app name]
```

### 全局配置

``` js
// mian.js
import Vue from 'vue'
import Element from 'element-ui'
Vue.use(Element, { size: 'small', zIndex: 3000 })
```

### 按需引入

``` js
// mian.js
import Vue from 'vue'
import { Button } from 'element-ui'

Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 }
Vue.use(Button)
```

更多详细文档参照官网<a href="http://element.eleme.io/#/zh-CN/component/quickstart" target="_blank" rel="noopener">Emement UI 快速上手</a>

### 2. VUE-ADMIN 直接使用 <a href="http://172.16.0.51/IDSS-FE/VUE-ADMIN" target="_blank" rel="noopener">VUE-ADMIN</a> 快速搭建 Fork 一个新的项目开发环境。

### 打开<a href="http://172.16.0.51/IDSS-FE/VUE-ADMIN" target="_blank" rel="noopener">VUE-ADMIN</a>地址，进行**fork**

![Image text](http://172.16.0.51/FE/communicate/raw/patch-1/img/fork-1.png)

### 选择**fork**的地址
![Image text](http://172.16.0.51/FE/communicate/raw/patch-1/img/fork-2.png)

### 进行**fork**中
![Image text](http://172.16.0.51/FE/communicate/raw/patch-1/img/fork-3.png)

### 新的项目环境生成，注意看不同之处
![Image text](http://172.16.0.51/FE/communicate/raw/patch-1/img/fork-4.png)


### 修改新的项目信息
![Image text](http://172.16.0.51/FE/communicate/raw/patch-1/img/fork-5.png)


### 修改新的项目信息【列：项目名称和git后缀】
![Image text](http://172.16.0.51/FE/communicate/raw/patch-1/img/fork-6.png)

### 修改更新信息，自行百度