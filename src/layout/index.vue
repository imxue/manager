<template>
  <el-container>
    <el-header>
      <component v-bind:is="MyHeader"></component>
    </el-header>
    <el-container>
      <el-aside minWidth="180px">
        <component v-bind:is="MyAside"></component>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container> </el-container
></template>

<script>
import MyHeader from "../components/MyHeader.vue";
import MyAside from "../components/MyAside.vue";
export default {
  name: "layout",
  data() {
    return {
      MyHeader,
      MyAside
    };
  }
};
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
}
.el-header {
  border-bottom: 1px solid #ddd;
}
.el-aside {
  border-right: solid 1px #e6e6e6;
  max-width: 260px;
}
</style>
