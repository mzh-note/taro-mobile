import axios from 'axios'
import type {InternalAxiosRequestConfig, AxiosError, AxiosResponse} from 'axios'

// 头条请求
const request = axios.create({
  baseURL: process.env.TARO_APP_TOUTIAO,
  timeout: 10000
});

// 请求拦截
request.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // console.log(config)
  return config;
}, (error: AxiosError) => {
  return Promise.reject(error)
})

// 响应拦截
request.interceptors.response.use((response: AxiosResponse) => {
  // console.log(response)
  return response;
}, (error: AxiosError) => {
  console.log(error.response?.status)
  return Promise.reject(error)
})

export { request }

// 网易云音乐请求
const http = axios.create({
  baseURL: process.env.TARO_APP_BASEURL,
  timeout: 10000,
  withCredentials: true,  // 是否允许请求携带Cookie
  headers: {
    // cookie: ''
  }
});

// 请求拦截
http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // console.log(config)
  return config;
}, (error: AxiosError) => {
  return Promise.reject(error)
})

// 响应拦截
http.interceptors.response.use((response: AxiosResponse) => {
  // console.log(response)
  return response;
}, (error: AxiosError) => {
  // console.log(error.response?.status)
  return Promise.reject(error)
})

export default http;
