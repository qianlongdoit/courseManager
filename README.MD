# 课程管理系统

## 目录结构
```bash
src                                         
    actions/                               + redux相关action
    components/                            + 组件
    constants/                             + redux相关的type定义文件
    pages/                                 + 页面
    reducers/                              + redux的reducer文件
    store/                                 + redux store
    uitls/                                 + 工具目录
        api.js                                  - 接口路径
        config.js                               - 配置文件
    app.jsx                                - 入口文件
```

## 开发指南
主要技术栈为Taro，Taro是一套遵循React语法规范的多端开发解决方案。   
使用 Taro，我们可以只书写一套代码，再通过 Taro 的编译工具，将源代码   
分别编译出可以在不同端（微信/百度/支付宝/字节跳动/QQ小程序、快应用、H5、React-Native 等）运行的代码

### 安装依赖
```bash
npm install
```

### 注意事项
本项目开发是基于以下基础版本，如若运行报错，请安装以下指定版本
Taro cli版本 v1.3.10
node 10.15.3 (>= 8.0.0)
npm 6.4.1

```bash
Taro的安装
# 使用 npm 安装 CLI
$ npm install -g @tarojs/cli
# OR 使用 yarn 安装 CLI
$ yarn global add @tarojs/cli
# OR 安装了 cnpm，使用 cnpm 安装 CLI
$ cnpm install -g @tarojs/cli

Taro的更新
# taro
$ taro update self
# npm
npm i -g @tarojs/cli@latest
# yarn
yarn global add @tarojs/cli@latest
```

### 开发
```bash
npm run dev:weapp
```

### 构建打包
```bash
taro build --type weapp
```

## 微信小程序
微信小程序端的调试，需要在微信开发者工具里面进行预览，最后将开发完成后的文件进行上传