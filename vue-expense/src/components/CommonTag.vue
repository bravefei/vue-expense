<template>
  <div class="tabs">
    <!-- closable 当前标签是否有关闭按钮 effect 标签的主题（dark 激活显示；plain 未激活） -->
    <el-tag
      v-for="(item, index) in tags"
      :key="item.path"
      :closable="item.name !== 'home'"
      :effect="$route.name === item.name ? 'dark' : 'plain'"
      @click="changeMenu(item)"
      @close="handleClose(item, index)"
      size="small"
    >
      {{ item.label }}
    </el-tag>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "CommonTag",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      tags: (state) => state.Tab.tabsList,
    }),
  },
  methods: {
    // 获取mutations中的方法
    ...mapMutations(["closeTag"]),
    // 点击tag跳转的功能
    changeMenu(item) {
      // console.log(item)
      this.$router.push({ name: item.name });
    },

    // 点击tag删除的功能
    handleClose(item, index) {
      // 调用store中的mutation
      this.closeTag(item);
      const length = this.tags.length;
      // 删除之后的跳转逻辑 （删除的不是当前标签）
      if (item.name !== this.$route.name) {
        return;
      }
      // 表示的是删除的最后一项
      if (index === length) {
        // 设置路由跳转前一项
        this.$router.push({
          name: this.tags[index - 1].name,
        });
      } else {
        // 设置路由跳转后一项
        this.$router.push({
          name: this.tags[index].name,
        });
      }
    },
  },
};
</script>
<style lang="less" scoped>
.tabs {
  padding: 20px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>