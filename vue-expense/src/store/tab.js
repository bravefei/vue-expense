import Cookie from 'js-cookie'
export default {
    state: {
        isCollapse: false,  // 控制菜单打开收起
        tabsList: [ // 面包屑数据
            {
                path: "/",
                name: "home",
                label: "首页",
                icon: "s-home",
                url: "Home/Home",
            }
        ],
        menu: [], // 接收传递的权限菜单
    },
    mutations: {
        // 修改菜单的方法
        collapseMenu(state, value) {
            state.isCollapse = !state.isCollapse
        },
        // 更新面包屑数据（点选菜单栏更新面包屑数据）
        selectMenu(state, val) {  // state vuex中存储的数据，val 传递过来的数据
            // console.log(val, 'val')
            // 判断添加的数据是否为首页
            if (val.name !== 'home') {
                // 数组的findIndex()方法 判断存储的数据中 是否 包含传递过来的数据，有（存在）返回当前数据，没有（不存在）返回-1
                const index = state.tabsList.findIndex(item => item.name === val.name)
                // 如果不存在
                if (index === -1) {
                    state.tabsList.push(val)
                }
            }
        },
        // 删除指定的tag数据
        closeTag(state, item) {
            // console.log(item, 'item')
            const index = state.tabsList.findIndex(val => val.name === item.name)
            // splice('开始删除的位置',删除的个数)
            state.tabsList.splice(index, 1)
        },
        // 设置menu的数据
        setMenu(state, val) {
            state.menu = val
            // 注意：store中的数据一经刷新可能会丢失动态获取的数据，建议存储到Cookie中
            Cookie.set('menu', JSON.stringify(val))  // stringify将数组转换为字符串
        },
        // 动态注册路由
        addMenu(state, router) {
            // 判断Cookie缓存中是否有数据
            if (!Cookie.get('menu')) return
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu  // 把缓存中的数据交给$store.state
            // 组装动态路由的数据
            const menuArray = []
            menu.forEach(item => {
                if (item.children) { // 判断是否有子菜单
                    item.children = item.children.map(item => {  // 对二级子菜单进行遍历
                        // console.log(item.url)
                        item.component = () => import(`../views/${item.url}`)  // 获取并把菜单路径交给component属性
                        return item
                    })
                    menuArray.push(...item.children)
                } else {
                    // console.log(item.url)
                    item.component = () => import(`../views/${item.url}`)  // 对一级菜单进行遍历
                    menuArray.push(item)
                }
            })
            // console.log(menuArray, 'menuArray')
            // 路由的动态添加
            menuArray.forEach(item => {
                // addRoute("路由添加的位置（以name属性作为标识，添加到下级）",添加的路由数据)
                router.addRoute('main', item)
            })
            console.log(Cookie.get('menu'))
        }
    }
}