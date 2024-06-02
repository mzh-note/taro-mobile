import Taro from '@tarojs/taro';

const http = (options: any) => {
  return new Promise((resolve, reject) => {
    const header = options.header || {
      'content-type': 'application/json'
    }
    let openid = ''
    try {
      const user = Taro.getStorageSync('user')
      openid = user?.openid
    } catch(e) {

    }
    if (openid) {
      header['Cookies'] = 'token=' + openid
      header['token'] = openid
    }
    Taro.showLoading()
    Taro.request({
      url: process.env.TARO_APP_BASEURL + options.url,
      data: options.data || {},
      header,
      method: options.method || 'GET',
      success: function(res) {
        Taro.hideLoading()
        if (res.statusCode === 403) {
          Taro.clearStorage().then(() => {
            Taro.redirectTo({
              url: '/pages/login/index'
            })
          })
          reject()
        } else {
          resolve(res)
        }
      },
      fail: function (error) {
        Taro.hideLoading()
        // console.error('fail', error)
        Taro.showToast({
          title: '访问异常' + JSON.stringify(error.errMsg),
          icon: 'none'
        })
        reject(error)
        Taro.reportEvent('apiError', error)
      }
    })
  })
}

export default http;
