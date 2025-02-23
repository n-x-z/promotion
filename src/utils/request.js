import axios from "axios";
import { message, notification } from 'ant-design-vue';
// 创建axios实例
let service = axios.create({
    baseURL:  '/promotion_api',
    timeout: 60000
})
// 响应拦截器
service.interceptors.response.use((response) => {
    // 成功的回调
    return response.data
    
}, (error) => {
    message.error( error.message)
  
    console.log(error, 'error')
    return Promise.reject(error)
})
const request = ({url, method, data, config}) => {

    let token = localStorage.getItem('token') ?? '';
    
    return service.request({
        url,
        method,
        [method === 'get' || method=== 'delete' ? 'params' : "data"]: data,
        headers: { Authorization: "Bearer " + token },
        ...config
    })

}

export default request;
