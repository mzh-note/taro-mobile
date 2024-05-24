一个 Taro 多端统一实例 - 足球AI预测（小程序 + H5）。
技术栈 Taro3.6.24 + typescript + react18，所用技术涉及如下：
UI：NUTUI-React
图表渲染：echarts-taro3-react
状态管理：@reduxjs/toolkit
路由跳转：Taro.navigateTo Taro.redirectTo Taro.switchTab
数据请求：封装的Taro.request
数据缓存：Taro.getStorage Taro.setStorage
项目配置了.env.dev（开发环境）和.env.prod（生产环境）两个环境，按需只配置了微信小程序和h5的打包脚本，测试使用.env.dev的配置，打包上线使用.env.prod的配置
#### 安装
```shell
pnpm install 
```
#### 本地开发
启动h5
```shell
pnpm run dev:h5 
```
启动微信小程序
```shell
pnpm run dev:weapp 
```
h5打包上线
```shell
pnpm run build:h5
```
微信小程序打包上线
```shell
pnpm run build:weapp
```
微信小程序开发者工具导入 dist/weapp 目录即可。

##### 项目旨在对使用taro + react进行小程序开发的实践，对taro、react技术上的一些常用功能、细节进行踩坑。

效果预览：
![image.png](1)
