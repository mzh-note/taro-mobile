import Taro from '@tarojs/taro';

const http = (options: any) => {
  const header = options.header || {
    'content-type': 'application/json'
  }
  const userInfo = Taro.getStorageSync('user')
  if (userInfo && userInfo.openid) {
    header['Cookies'] = 'token=' + userInfo.openid
    header['token'] = userInfo.openid
  }
  return Taro.request({
    url: process.env.TARO_APP_BASEURL + options.url,
    data: options.data || {},
    header,
    method: options.method || 'GET'
  })
}

export default http;
