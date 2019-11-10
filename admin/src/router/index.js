import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// 添加内容
import Adcetiger from '../views/Adcetiger.vue'
// 所有内容
import Alldecti from '../components/Alldect.vue'
// 装备
import Article from '../views/addarticle.vue'
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
      },{
        path:'/addarticle',
        component:Article
      },
      {
        path:'/articlelist',
        component:Article
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
