import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '../src/assets/css/base.scss'
// 字体图标
import './assets/icon/iconfont.css'
Vue.config.productionTip = false
//axios
import axios from 'axios';
Vue.prototype.$http=axios.create({
  baseURL: 'http://127.0.0.1:3000/web/api',
  timeout: 1000,
  
});
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
