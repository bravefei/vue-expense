import Vue from 'vue'
import Vuex from 'vuex'

// 引入管理菜单的js文件
import Tab from './tab'

Vue.use(Vuex)

// 创建vuex实例

export default new Vuex.Store({
    name: 'store',
    modules: {
        Tab,
    }
})