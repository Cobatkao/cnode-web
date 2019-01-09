# cnode

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# 项目笔记

1. **命名视图的作用**：路由配置文件里面给每个路由组件都取了一个名字——main的理由是：**命名视图**，对应的组件最后都会映射到name为main的路由出口（router-view）上。
  ```
  {
    name: 'user_info',
    path: '/userInfo:name',
    components: {
      main: userInfo //key
    }
  }
  ```

2. **路由工作逻辑**：点击头像，通过对router-link内部的参数设置。来找到对应的组件，传递对应的name参数，以此请求正确的页面。

# 问题收集

1. 打包路径出错

