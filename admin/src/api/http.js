import axios from 'axios';
import Vue from 'vue'
let http = axios.create({
   baseURL: 'http://127.0.0.1:3000/admin/api'
})
//axios响应拦截器
http.interceptors.response.use((res) => {
   //请求成功，直接返回
   return res
}, (err) => {
   console.log(err.response.data.name)
   // 请求错误拦截
   Vue.prototype.$message({
      message:err.response.data.name,
      type: 'error'
      
   })
})
http.interceptors.request.use((config) => {
   return config
}, err => {
   return err
})
export default http;