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

// 名家推荐
export const allList = () => {
  return http({
    url: '/api/pro/allList',
    method: 'GET'
  })
}
// 二串专区
export const towList = () => {
  return http({
    url: '/api/pro/towList',
    method: 'GET'
  })
}
// 热门赛事
export const hotMatchList = () => {
  return http({
    url: '/api/football/hotMatchList',
    method: 'GET'
  })
}
// 专家详情
export const proInfo = (data) => {
  return http({
    url: '/api/pro/info',
    method: 'POST',
    data
  })
}

// 专家推荐列表
export const suggestList = (data) => {
  return http({
    url: '/api/pro/suggestList',
    method: 'POST',
    data
  })
}
