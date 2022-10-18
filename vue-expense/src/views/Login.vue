<template>
  <!-- rules 表单校验 -->
  <el-form
    ref="form"
    class="login-container"
    label-width="70px"
    :model="form"
    :rules="rules"
  >
    <h1 class="login-title">Login 登录页面</h1>
    <!-- el-form-item 表单域标签，label-width控制表单域标签宽度-->
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        type="password"
        v-model="form.password"
        placeholder="请输入密码"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Mock from "mockjs";
import Cookie from "js-cookie";
import { getMenu } from "../api/index"; // 引入拦截器
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        // message 错误提示  trigger 调用的触发条件
        username: [
          { required: true, trigger: "blur", message: "请输入用户名" },
        ],
        password: [{ required: true, trigger: "blur", message: "请输入密码" }],
      },
    };
  },
  methods: {
    // 登录
    submit() {
      /* // token信息(类型：字符串)
      const token = Mock.Random.guid();
      // 利用cookie实现权限管理(方法： set 设置    remove 移除   get获取)
      // token信息存入cookie用于不同页面间的通信
      Cookie.set("token", token); */

      //   console.log(this.form);
      // validate 对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 检验是否存在
          getMenu(this.form).then(({ data }) => {
            // console.log(data);
            if (data.code === 20000) {
              //返回的业务状态码， 20000为成功
              Cookie.set("token", data.data.token); // 在cookie中存入token

              /* 不同权限人员菜单展示 */
              // 1. 获取传递的菜单权限与路径存入store中
              // 2. 在store配置文件中配置接收路径的数据对象
              // 3. 在侧边导航栏中替换路径数据未store中的动态数据
              this.$store.commit("setMenu", data.data.menu);

              /* 动态添加路由 */
              this.$store.commit("addMenu", this.$router);

              // 跳转到首页;
              this.$router.push("/home");
            } else {
              this.$message.error(data.data.message); // 异常提示
            }
          });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login-container {
  width: 350px;
  border: 1px solid #eaeaea;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 25px #cac6c6;
  box-sizing: border-box;
  .login-title {
    text-align: center;
    margin-bottom: 40px;
    color: #505458;
  }
  .el-input {
    width: 198px;
  }
  .el-button {
    margin-left: 35px;
    margin-top: 10px;
  }
}
</style>>
