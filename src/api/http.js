import http from "./service.js";

export const login = async function (info) {
  const { data: res } = await http.post("/user/login", info);
  return res;
};

export const saveWebConfig = async function (param) {
  const { data: res } = await http.post("/saveConfig", param);
  return res;
};
