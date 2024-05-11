import http, { request } from './index'
import Taro from '@tarojs/taro';

export const uploadAvatar = (imagePath: string) => {
  const userInfo = Taro.getStorageSync('userInfo')
  return Taro.uploadFile({
    url: process.env.TARO_APP_BASEURL + '/api/images/upload', //仅为示例，非真实的接口地址
    filePath: imagePath,
    name: 'avatarImg',
    header: {
      'content-type': 'multipart/form-data',
      Cookies: `token=${userInfo.openid}`,
      token: userInfo.openid
    }
  })
}
export const userLogin = (data) => {
  return http.post('/api/user/login', data)
}

export const wxLogin = (data) => {
  return http.post('/api/wx/login', data)
}
export const loginPhone = (data) => {
  return http.post('/api/login/cellphone', data)
}

export const getChannels = () => {
  return request.get('/channels')
}

export const getArticles = (params) => {
  return request.get('/articles', {params})
}

export const getDetail = (id) => {
  return request.get(`/articles/${id}`)
}
