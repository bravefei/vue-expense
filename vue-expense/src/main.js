import Vue from 'vue'


// 全局注入：引入全部element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

/* // 按需引入element-ui（按需引入需要修改babel.config.js文件内容）
import { Button, Select } from 'element-ui'; */


// 引用router路由器
import router from './router'

import App from './App.vue'

import store from './store'
import './api/mock'  // 引入拦截器
import Cookies from 'js-cookie';
Vue.config.productionTip = false


// 全部使用
Vue.use(ElementUI);


/* // 按需使用
Vue.component("Button.name", Button);
Vue.component("Select.name", Select);
// 或写为
Vue.use(Button)
Vue.use(Select) */


//全局前置守卫：初始化时执行、每次路由切换前执行
// to（去哪里），from（来自哪里），next（放行）
router.beforeEach((to, from, next) => {
  // 判断token是否存在
  const token = Cookies.get("token")
  if (!token && to.name !== "login") {  // 用户不存在，即未登录，应该跳转到登录界面 && 当前跳转路径不等于login，跳转login登录界面
    next({ name: 'login' })
  } else if (token && to.name === "login") {  // token 存在，此时跳转首页 && 当前跳转路径为login时跳转首页
    next({ name: 'home' })
  } else {
    next()
  }
})



new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    store.commit("addMenu", router)
  }

}).$mount('#app')
