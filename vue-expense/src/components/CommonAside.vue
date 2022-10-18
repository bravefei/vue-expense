<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <h3>{{ isCollapse ? "后台" : "通用后台管理系统" }}</h3>
    <!-- 遍历无子代菜单导航 -->
    <el-menu-item
      v-for="item in noChildren"
      :key="item.name"
      :index="item.name"
      @click="clickMenu(item)"
    >
      <!-- 获取图标 -->
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>

    <!-- 遍历有子代菜单导航 -->
    <el-submenu
      v-for="item in hasChildren"
      :key="item.label"
      :index="item.label"
    >
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group
        v-for="subItem in item.children"
        :key="subItem.name"
        :index="subItem.name"
      >
        <!-- <span slot="title">分组一</span> -->
        <el-menu-item :index="subItem.name" @click="clickMenu(subItem)">{{
          subItem.label
        }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<style  lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 100%;
}

.el-menu {
  /* 站满屏幕整体高度 */
  height: 100vh;
  // height: 100%;
  border-right: 0; /* 清除缝隙 */
  h3 {
    text-align: center;
    line-height: 48px;
    color: #fff;
    font-size: 16px;
    font-weight: 400;
  }
}
</style>

<script>
import Cookie from "js-cookie";
export default {
  data() {
    return {
      // isCollapse: true,
      // 动态获取不同人员的菜单路径
      /* menuData: [
        {
          path: "/",
          name: "home",
          label: "首页",
          icon: "s-home",
          url: "Home/Home",
        },
        {
          path: "/mall",
          name: "mall",
          label: "商品管理",
          icon: "s-goods",
          url: "MallManage/MallManage",
        },
        {
          path: "/user",
          name: "user",
          label: "用户管理",
          icon: "user-solid",
          url: "UserManage/UserManage",
        },
        {
          label: "其他",
          icon: "location",
          children: [
            {
              path: "/page1",
              name: "page1",
              label: "页面1",
              icon: "setting",
              url: "Other/PageOne",
            },
            {
              path: "/page2",
              name: "page2",
              label: "页面2",
              icon: "setting",
              url: "Other/PageTwo",
            },
          ],
        },
      ], */
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    // 点击菜单实现路由跳转
    clickMenu(item) {
      // console.log(item);
      // 容错：当点击跳转为当前路径时会报错，添加判断条件：当前页面路由与跳转页面路由不一致时跳转
      if (
        this.$route.path !== item.path &&
        !(this.$route.path === "/home" && item.path === "/")
      ) {
        this.$router.push(item.path);
        // console.log(this.$router.path);
      }

      // 点击菜单实现面包屑更新
      this.$store.commit("selectMenu", item);
    },
  },
  computed: {
    // 计算没有子菜单的展示效果
    noChildren() {
      return this.menuData.filter((item) => {
        return (item = !item.children);
      });
    },
    hasChildren() {
      // ES6简写
      return this.menuData.filter((item) => item.children);
    },
    isCollapse() {
      return this.$store.state.Tab.isCollapse;
    },

    // 计算：把menuData的数据改为store中存储的路径数据
    // 注意：store中的数据一经刷新可能会丢失动态获取的数据，建议存储到Cookie中
    menuData() {
      // 因此需要增加判断：如果Cookie缓存中没有数据，在当前store中读取
      return JSON.parse(Cookie.get("menu")) || this.$store.state.Tap.menu;
    },
  },
};
</script>