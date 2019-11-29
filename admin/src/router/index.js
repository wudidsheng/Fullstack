import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// 添加内容
import Adcetiger from '../views/Adcetiger.vue'
// 所有内容
import Alldecti from '../components/Alldect.vue'
// 装备
import Article from '../views/addarticle.vue'
import Aallarticle from '../views/alllarticle.vue'
//英雄
import Hero from '../views/heros.vue'
import Heroedit from '../views/herosedit.vue'
//新闻
import news from '../views/news.vue';
import newall from '../views/newsedit.vue';
//ads
import ads from '../views/ads.vue'
import adsedit from '../views/adsedit.vue'
//管理员
import admin from '../components/admin.vue'
import adminlist from '../components/adminlis.vue'
//登陆
import login from '../views/login.vue'
Vue.use(VueRouter)
const routes = [{
    path: '/login',
    component: login,
    meta: { requiresAuth: true }
  }, {
    path: '/',
    component: Home,
    children: [{
        path: '/newclass',
        component: Adcetiger
      },
      {
        path: '/eidiclass/:ID',
        component: Adcetiger,
        props: true
      },
      {
        path: '/Alldect',
        component: Alldecti
      }, {
        path: '/addarticle',
        component: Article
      },
      {
        path: '/addarticle/:ID',
        props: true, //将路由参数转化未proprs
        component: Article
      },
      {
        path: '/articlelist',
        component: Aallarticle
      },
      //hero
      {
        path: '/heroedit',
        component: Heroedit
      }, {
        path: '/hero',
        component: Hero
      },
      {
        path: '/hero/:ID',
        props: true, //将路由参数转化未proprs
        component: Hero
      },
      //news 
      {
        path: "/news",
        component: news,
      },
      {
        path: "/news/:ID",
        component: news,
        props: true
      },
      {
        path: "/newsedit",
        component: newall
      },
      //广告
      {
        path: "/ads",
        component: ads,
      },
      {
        path: "/ads/:ID",
        component: ads,
        props: true
      },
      {
        path: "/adsedit",
        component: adsedit
      },
      //admin
      {
        path: "/admin",
        component: admin,
      },
      {
        path: "/admin/:ID",
        component: admin,
        props: true
      },
      {
        path: "/adminlist",
        component:adminlist
      },
    ]
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
//导航守卫
router.beforeEach((to, from, next) => {
  // 是否有token,或者是登陆页
  if(to.meta.requiresAuth||sessionStorage.token){
    next()
  }
  //不是跳转到登陆页
  else{
    next('/login')
  }
  next()
})
export default router