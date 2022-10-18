import Mock from 'mockjs'

import homeApi from './mockData/home'
import userApi from './mockData/user'
import permission from './mockData/permission'



/* // 定义mock请求拦截
// 参数（url路径，请求方式-get方式可省略，回调函数）
Mock.mock('/api/home/getData', 'get', function () {
    // 拦截请求后的处理函数
    console.log("拦截到了");
    return {
        number: 100,
    }
}) */

// 封装简化代码
Mock.mock('/api/home/getData', 'get', homeApi.getStatisticalData())


// 用户列表的数据
Mock.mock('/api/user/add', 'post', userApi.createUser)
Mock.mock('/api/user/edit', 'post', userApi.updateUser)
Mock.mock('/api/user/del', 'post', userApi.deleteUser)
Mock.mock(/api\/user\/getUser/, userApi.getUserList)

// 正则表达式写法
Mock.mock(/api\/permission\/getMenu/, 'post', permission.getMenu)