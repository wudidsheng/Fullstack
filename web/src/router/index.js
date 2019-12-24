import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Detal from '../views/Details.vue'
import Hero from '../views/hero.vue'
Vue.use(VueRouter)

const routes = [
  {
    // 首页
    path: '/',
    name: 'home',
    component: Home,
 
  },
  {
    // 首页
    path: '/detal/:id',
    component: Detal,
    props: true
  },
  //英雄
  {
    path: '/hero/:id',
    component: Hero ,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
