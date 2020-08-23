import axios from "axios";
axios.defaults.withCredentials = true;
import { Message, MessageBox } from "element-ui";
import router from "../router";
const service = axios.create({
  baseURL: "/",
  time: 5000
});
let flag = false;
service.interceptors.request.use(config => {
  if (localStorage.getItem("managementtoken")) {
    config.headers["Authorization"] = localStorage.getItem("managementtoken");
  }
  return config;
});

service.interceptors.response.use(
  response => {
    if (!response.data.ok) {
      return Promise.reject(response);
    }
    return response;
  },
  error => {
    if (error.request && error.request.status === 403) {
      if (localStorage.getItem("managementtoken")) {
        localStorage.removeItem("managementtoken");
      }
      Message({
        showClose: true,
        type: "error",
        message: "登录已过期，请重新登录，将在三秒后跳会登录页面"
      });
      setTimeout(() => {
        router.push("/login");
      }, 3000);

      return Promise.reject(error);
    }
    if (error.request && error.request.status === 401) {
      if (localStorage.getItem("managementtoken")) {
        localStorage.removeItem("managementtoken");
      }
      Message({
        showClose: true,
        type: "error",
        message: "登录已过期，请重新登录，将在三秒后跳会登录页面"
      });
      setTimeout(() => {
        router.push("/login");
      }, 3000);
      return Promise.reject(error);
    }
    if (error.request && error.request.status === 500 && !flag) {
      MessageBox.confirm(500, {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      });
      flag = true;
      return Promise.reject(error);
    }
    return error;
  }
);

export default service;
