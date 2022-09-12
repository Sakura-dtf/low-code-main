import store from "../store/index";

let id = 0;
// 主要用于 Vue 的 diff 算法，为每个元素创建一个独一无二的 ID
export default function generateID() {
  if (store.state.uuid) {
    return "a" + String(store.state.uuid) + id++;
  } else {
    return "a" + id++;
  }
}
