import Vue from "vue";
import VueRouter from "vue-router";
import layout from "../layout/index";
import index from "../views/index";
import GameCenter from "../views/BasicManagement/GameCenterAddress/index.vue";
import AddGameCenter from "../views/BasicManagement/GameCenterAddress/add.vue";
import VersionStrategy from "../views/BasicManagement/VersionStrategy.vue";
import AreaManagement from "../views/BasicManagement/AreaManagement.vue";
import ChannelList from "../views/ChannelsFranchisees/ChannelList/index.vue";
import AddChannelList from "../views/ChannelsFranchisees/ChannelList/add.vue";
import agentIndex from "../views/ChannelsFranchisees/agent/index.vue";
import Addagent from "../views/ChannelsFranchisees/agent/add.vue";
import pointIndex from "../views/ChannelsFranchisees/Point/index.vue";
import Addpoint from "../views/ChannelsFranchisees/Point/add.vue";
import RoleManagement from "../views/SystemManagement/RoleManagement.vue";
import UserList from "../views/SystemManagement/UserList.vue";
import Login from "../views/Login.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: layout,
    children: [
      {
        path: "",
        meta: { requiresAuth: true, title: "首页" },
        redirect: "/BasicManagement/gamecenter",
        component: index,
        hidden: true
      }
    ]
  },
  {
    path: "/BasicManagement",
    name: "Basic management",
    component: layout,
    children: [
      {
        path: "GameCenter",
        meta: { requiresAuth: true, title: "首页" },
        component: GameCenter
      },
      {
        path: "AddGameCenter",
        meta: { requiresAuth: true, title: "新增" },
        component: AddGameCenter
      },
      {
        path: "AreaManagement",
        name: "Area Management",
        component: AreaManagement
      },
      {
        path: "VersionStrategy",
        name: "VersionStrategy",
        component: VersionStrategy
      }
    ]
  },
  {
    path: "/ChannelsFranchisees",
    name: "ChannelsFranchisees",
    component: layout,
    children: [
      {
        path: "ChannelList",
        meta: { requiresAuth: true, title: "渠道 & 加盟商" },
        component: ChannelList
      },
      {
        path: "AddChannelList",
        meta: { requiresAuth: true, title: "渠道 & 加盟商" },
        component: AddChannelList
      },
      {
        path: "index",
        meta: { requiresAuth: true, title: "渠道 & 加盟商" },
        component: agentIndex
      },
      {
        path: "add",
        meta: { requiresAuth: true, title: "渠道 & 加盟商" },
        component: Addagent
      },
      {
        path: "pointIndex",
        meta: { requiresAuth: true, title: "渠道 & 加盟商" },
        component: pointIndex
      },
      {
        path: "Addpoint",
        meta: { requiresAuth: true, title: "渠道 & 加盟商" },
        component: Addpoint
      }
    ]
  },
  {
    path: "/SystemManagement",
    name: "SystemManagement",
    component: layout,
    children: [
      {
        path: "RoleManagement",
        meta: { requiresAuth: true, title: "渠道 & 加盟商" },
        component: RoleManagement
      },
      {
        path: "UserList",
        meta: { requiresAuth: true, title: "渠道 & 加盟商" },
        component: UserList
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: Login
  }
];

const router = new VueRouter({
  routes
});

export default router;
