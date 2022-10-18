import Vue from 'vue'
// 引入router路由器
import VueRouter from 'vue-router'


// 1. 引入路由组件
import Home from '../views/Home'
import User from '../views/User'
import Main from '../views/Main'
import Mall from '../views/Mall'
import PageOne from '../views/PageOne'
import PageTwo from '../views/PageTwo'

import Login from '../views/Login'


// 解决重复点击同一个路由报错问题解决
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location) {
    return originalPush.call(this, location).catch(err => { })
};

// 使用VueRouter
Vue.use(VueRouter)

const router = new VueRouter({
    // mode: "history",  // 定义路由器工作模式
    // mode: "hash",  // 项目上线用hash路由模式无刷新404报错
    // mode: "history",
    // 2. 将路由与组件映射
    routes: [
        // 3. 创建并传递路由
        {
            name: 'main',
            path: "/",  // 主路由
            component: Main,
            redirect: "/home",  // redirect 重定向（解决点击说首页跳转当前路径报错）
            children: [
                // 在store的tab.js中以编写自动获取路由配置
                /* {
                    name: "home",
                    path: "/home",  // 首页
                    component: Home,
                },
                {
                    name: "user",
                    path: "/user",  // 用户管理
                    component: User,
                },
                {
                    name: "mall",
                    path: "/mall",  // 商品管理
                    component: Mall,

                },
                {
                    name: "Page1",
                    path: "/Page1",  // 页面1
                    component: PageOne,
                },
                {
                    name: "Page2",
                    path: "/Page2",  // 页面2
                    component: PageTwo,
                }, */
            ]
        },
        {
            name: 'login',
            path: '/login',
            component: Login,
        },

    ]

})

/* // 路由重复 报错解决办法
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
} */


// 4. 暴露router实例
export default router

