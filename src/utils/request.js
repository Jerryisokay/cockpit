import axios from 'axios'
import { BASE_API } from '@/config/config'

const clearRequest = {
  source: {
    token: null,
    cancel: null
  }
}
const cancelToken = axios.CancelToken
const source = cancelToken.source()

// 创建 axios 实例
const service = axios.create({
  // 接口域名和端口地址
  // baseURL: BASE_API,
  cancelToken: source.token,
  timeout: 6000,  // 请求超时时间
})

// request 拦截器
service.interceptors.request.use(
  config => {
    config.cancelToken = clearRequest.source.token
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  resp => resp,
  error => {
    return Promise.reject(error)
  }
)

export { clearRequest }
export default service
