<template>
  <div class="MyAsider">
    <el-menu
      :default-openeds="defaultOpeneds"
      default-active="0"
      class="el-menu-vertical-demo"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>基础管理</span>
        </template>
        <router-link to="/BasicManagement/gamecenter">
          <el-menu-item index="1-1">游戏中心地址</el-menu-item>
        </router-link>
        <router-link to="/BasicManagement/AreaManagement">
          <el-menu-item index="1-2">区域管理</el-menu-item>
        </router-link>

        <router-link to="/BasicManagement/VersionStrategy">
          <el-menu-item index="1-3">版本策略</el-menu-item>
        </router-link>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>渠道 & 加盟商</span>
        </template>
        <router-link to="/ChannelsFranchisees/ChannelList">
          <el-menu-item index="2-0">渠道列表</el-menu-item>
        </router-link>
        <router-link to="/ChannelsFranchisees/index">
          <el-menu-item index="2-1">加盟商列表</el-menu-item>
        </router-link>
        <router-link to="/ChannelsFranchisees/pointIndex">
          <el-menu-item index="2-2">加盟商点数调整明细</el-menu-item>
        </router-link>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>系统管理</span>
        </template>
        <router-link to="/SystemManagement/RoleManagement">
          <el-menu-item index="3-1">角色管理</el-menu-item>
        </router-link>
        <router-link to="/SystemManagement/userList">
          <el-menu-item index="3-2">用户类表</el-menu-item>
        </router-link>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: "MyAsider",
  data() {
    return {
      defaultOpeneds: ["1", "2", "3"]
    };
  },
  methods: {}
};
</script>
<style lang="scss" scoped></style>
