# vue-expense
实现通用后台管理功能：用户登录，首页图表，用户管理功能
#### 介绍
实现通用后台管理功能：用户登录，首页图表，用户管理功能


#### 软件架构
软件架构说明
技术：Vue全家桶+element-ui组件+mock数据劫持+cookike数据校验+axios请求+echarts图表+less预处理


#### 安装教程

1.  下载后通过vscode打开vue-expense文件
2.  ctrl + ` 打开终端
3.  npm install 下载依赖
4.  npm run serve 启动项目

#### 使用说明

1.  包含两个角色admin和user
2.  账号密码一致，输入后登录进入首页
3.  admin为全功能菜单，user没有用户管理和其他
4.  页面数据与权限跳转路径放置在\src\api\mockData中，经由mock处理请求并返回
