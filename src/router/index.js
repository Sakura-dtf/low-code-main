import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Test from '../views/test.vue'
import tableTest from '../views/tableTest.vue'
import dialogTest from '../views/easyDialog.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: "/test",
    name: "test",
    component: tableTest
  },
  {
    path: "/testDialog",
    name: "dialog",
    component: dialogTest
  }
]

const router = new VueRouter({
  routes
})

export default router
