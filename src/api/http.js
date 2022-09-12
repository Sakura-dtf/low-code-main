import http from "./service.js";

export const login = async function (info) {
  const { data: res } = await http.post("/user/login", info);
  return res;
};

export const saveWebConfig = async function (param) {
  const { data: res } = await http.post("/saveConfig", param);
  return res;
};

export const getDictKey = async function (param) {
  const { data: res } = await http.post("/dict/getAllDictKey");
  return res;
};

export const getConfigByUser = async function () {
  const { data: res } = await http.post("/getConfigByUser");
  return res;
};

export const getConfig = async function (param) {
  const { data: res } = await http.post("/getConfig", param);
  return res;
};

export const updateWebConfigById = async function (param) {
  const { data: res } = await http.post("/updateWebConfigById", param);
  return res;
};
