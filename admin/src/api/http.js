import axios from 'axios';
 let http=axios.create({
    baseURL: 'http://127.0.0.1:3000/admin/api',
    timeout: 1000,
 })
export default http;