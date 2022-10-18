<template>
  <div class="head-contenter">
    <div class="l-content">
      <el-button
        @click="handleMenu"
        icon="el-icon-menu"
        size="mini"
        style="margin-right: 20px"
      ></el-button>
      <!-- 面包屑 -->
      <!-- <span class="text">首页</span> -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="item in tags"
          :key="item.path"
          :to="{ path: item.path }"
          >{{ item.label }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown @command="handleClick">
        <span class="el-dropdown-link">
          <img class="user" src="../assets/images/user01.png" alt="" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Cookie from "js-cookie";
export default {
  name: "CommonHeader",
  methods: {
    handleMenu() {
      this.$store.commit("collapseMenu");
      //   console.log(this.$store.state);
    },
    // 退出登录
    handleClick(command) {
      if (command === "logout") {
        // 清除Cookie中的token（store的导航菜单数据）
        Cookie.remove("token");
        // 清空Cookie中的menu（router的路由配置）
        Cookie.remove("menu");
        // 退出登录跳转到登录页面
        this.$router.push({ name: "login" });
      }
    },
  },
  computed: {
    // obj{ ...{} }   ...展开运算符，把对象中的键值对展开存储到obj中
    // 以对象的形式获取state中的数据
    ...mapState({
      tags: (state) => state.Tab.tabsList,
    }),
  },
  /* mounted() {
    console.log(this.$store.state);
  }, */
};
</script>

<style lang="less" scoped>
.head-contenter {
  padding: 0 20px;
  background-color: #333;
  height: 60px;
  display: flex;
  justify-content: space-between; /* 水平两端展示 */
  align-items: center; /* 垂直居中 */
  .text {
    color: #fff;
    font-size: 14px;
    margin-left: 10px;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409eff;
    .user {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .el-icon-arrow-down {
      font-size: 12px;
    }
  }
  .l-content {
    display: flex;
    align-items: center;
    // breadcrumb__item 需要遍历，提前设置的内部样式可能无法应用，需要在前面添加 /deep/ 实现样式穿刺
    /deep/.el-breadcrumb__item {
      .el-breadcrumb__inner {
        font-weight: 900;
        &.is-link {
          color: #666;
        }
      }
      // 最后一个子元素
      &:last-child {
        .el-breadcrumb__inner {
          color: #fff;
        }
      }
    }
  }
}
</style>