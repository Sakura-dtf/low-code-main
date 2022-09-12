import axios from "axios";
import App from "@/main.js";
import Vue from "vue";
const service = axios.create({
  baseURL: "http://lowcodeback.dtfei.cn",
  timeout: 5 * 1000, // 请求超时时间
  withCredentials: true,
});

// 请求拦截器
service.interceptors.request.use((config) => {
  // 这里可以进行请求加密等操作。如添加token,cookie，修改数据传输格式等。
  // config.headers["token"] = "xxxx";
  // config.headers["Content-type"] = "application/json";

  if (localStorage.getItem("token")) {
    config.headers["Authorization"] = "Bearer " + localStorage.getItem("token");
  }

  return config;
});

service.interceptors.response.use(
  (response) => {
    console.log(response);
    // 请求成功进行的操作。// 可以使用switch/if...else对数据先进行处理。
    if (response.data.errno !== 0) {
      Vue.prototype.$message.error(response.data.message);
    }

    return response;
  },
  (error) => {
    // 请求失败进行的操作
    console.log(error.response, "error");
    return error;
  }
);

export default service;
