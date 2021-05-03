import axios from 'axios'
import { Message } from 'element-ui'
import { getTimeStap } from './auth'
import router from '@/router'
import store from '@/store'
const timeOut = 600
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
// 请求拦截器配置
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      if (isCheckTimeOut()) {
        // 超时,删除token，删除用户信息
        store.dispatch('logout')
        // 跳转页面
        router.push('/login')
      }
      config.headers['Authorization'] = `Bearer ${store.getters.token}`
    }
    return config
  },
  error => {
    return Promise.reject(new Error(error))
  }
)
// 响应拦截器配置
service.interceptors.response.use(
  res => {
    // 响应成功
    const { message, success, data } = res.data
    if (success) {
      return data
    } else {
      // 提示错误消息
      Message.error(message)
      // 业务错误，返回错误对象，进入catch
      return Promise.reject(new Error(message))
    }
  },
  err => {
    // 后端响应超时状态码
    // console.dir(err.response)
    if (err.response && err.response.data && err.response.data.code === 10002) {
      // console.log('11')
      store.dispatch('user/logout')
      router.push('/login')
    }
    // 提示错误消息
    Message.error(err.message)
    // 返回错误对象
    return Promise.reject(err)
  }
)
// 是否超时
function isCheckTimeOut() {
  const current = Date.now()
  return (current - getTimeStap()) / 1000 > timeOut
}
export default service
