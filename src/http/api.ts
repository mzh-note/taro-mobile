import Taro from '@tarojs/taro';
import http from './index'

export const uploadAvatar = (imagePath: string) => {
  const userInfo = Taro.getStorageSync('user')
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
  return http({
    url: '/api/user/login',
    method: 'POST',
    data
  })
}

export const wxLogin = (data) => {
  return http({
    url: '/api/wx/login',
    method: 'POST',
    data
  })
}
export const getScoreList = (path: string, data) => {
  return http({
    url: '/api/football/' + path,
    method: 'GET',
    data
  })
}
