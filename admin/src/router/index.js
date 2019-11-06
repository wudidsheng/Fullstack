import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// 添加内容
import Adcetiger from '../views/Adcetiger.vue'
// 所有内容
import Alldecti from '../components/Alldect.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children:[
      {
        path:'/newclass',
        component:Adcetiger
      },
      {
        path:'/eidiclass/:ID',
        component:Adcetiger,
        props:true
      },
      {
        path:'/Alldect',
        component:Alldecti
      }
    ]
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
