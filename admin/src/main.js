import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入axios;
import http from './api/http'
//富文本编辑器
import vueEditor from 'vue-editor-interline'
// 加载到vue实例上
Vue.prototype.$ajax=http;
Vue.use(vueEditor)
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.mixin({
  methods: {
    gethaeder(){
      return {toneknAurh:`name:${sessionStorage.token||' '}`}
    }
  }
})
new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
