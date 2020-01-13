# 驾驶舱项目

> 前台代码维护的准备工作

## Prepare

安装近期的 nodejs ，选择系统对应的安装包  <http://nodejs.cn/download/>

## Build Setup

打开cmd，进入项目所在的目录

``` bash
# 安装项目依赖，一般没有修改的情况下，前期安装一次就行了，如有更新另行通知
npm install

#如npm install 的过程中，时间过长，建议设置npm的国内镜像
npm install cnpm -g --registry=https://registry.npm.taobao.org

# 再用cnpm安装依赖,相当于npm install
cnpm install

# 启动本地环境, 完成后在浏览器中打开localhost:8080
npm run dev

# 生成生产环境的包 build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).



## 项目维护

线上环境更改请求的域名地址：

进入`src/config/config.js` 修改 `BASE_API` 为当前域名



更改高德地图key：

当前的key为开发者自己的高德开发者账号的key，请替换成自己申请的web jsapi的key，请注意服务平台是web端 （JS API）

进入`src/config/config.js` 修改 `MapKey`为当前的key