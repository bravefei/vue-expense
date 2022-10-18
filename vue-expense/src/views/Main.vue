<template>
  <div>
    <!-- 主路由 -->
    <el-container>
      <el-aside width="auto">
        <!-- 侧边导航 -->
        <common-aside />
      </el-aside>
      <el-container>
        <el-header>
          <!-- 头部 -->
          <common-header />
        </el-header>
        <!-- tag -->
        <common-tag />
        <el-main>
          <!-- 子路由出口，路由匹配到的组件将在这里展示 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from "../components/CommonAside";
import CommonHeader from "../components/CommonHeader";
import CommonTag from "../components/CommonTag";

export default {
  name: "Main",
  components: {
    CommonAside,
    CommonHeader,
    CommonTag,
  },
};
</script>

<style>
.el-header {
  padding: 0;
}
</style>