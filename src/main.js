import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import "./assets/css/style.css";

import elFormSchema from "@/components/El-Form-Schema/index.js";

import axios from "axios";
const service = axios.create({
  baseURL: "/api",
});

Vue.prototype.$http = service;

Vue.use(elFormSchema);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
