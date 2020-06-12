import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.filter("formatTime", function(value) {
  let date = new Date(value);
  let year = date.getFullYear();
  let months = date.getMonth() + 1;
  let days = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let sec = date.getSeconds();
  return `${year}-${months}-${days} ${hours}:${minutes}:${sec}`;
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
