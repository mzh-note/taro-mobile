import {PropsWithChildren} from 'react';
import Taro, { useDidHide, useDidShow, useError, useLaunch } from '@tarojs/taro'
import '@nutui/nutui-react-taro/dist/style.css'
import store from '@/store';
import {Provider} from 'react-redux';
import {wxLogin} from '@/http/api';
import './app.less'

function App({ children }: PropsWithChildren<any>) {
  useLaunch((options) => {
    console.log('App launched.', options.path, options.query)
    const inviteCode = options.query?.inviteCode || ''
    Taro.setStorage({
      key: 'fromInviteCode', // 邀请码
      data: inviteCode,
      complete: function() {
        console.log('存储成功')
        console.log('taro.login --------------------')
        Taro.login({
          success: async function (res) {
            console.log('获取登录凭证（code）', res.code)
            const code = res.code
            if (code) {
              console.log('/api/wx/login================')
              const response = await wxLogin({ code })
              console.log('/api/wx/login================', response?.data?.data)
              if (response?.data?.data?.userStatus === 1) {
                console.log('已注册')
                Taro.setStorage({
                  key: 'user',
                  data: response?.data?.data,
                  success: function() {
                    Taro.switchTab({
                      url: '/pages/mine/mine'
                    })
                  }
                })
              } else {
                console.log('未注册')
                Taro.setStorage({
                  key: 'user',
                  data: null,
                  success: function () {
                    Taro.redirectTo({
                      url: '/pages/login/index'
                    })
                  }
                })
              }
            }
          },
          fail: function(err) {
            console.error('获取登录凭证（code）', err)
          }
        })
      }
    })
  })

  useDidShow(() => {
    // console.log('App did show.')
  })

  useDidHide(() => {
    // console.log('App did hide.')
  })

  useError(() => {
    // console.log('App error.')
  })
  // children 是将要会渲染的页面
  return <Provider store={store}>{children}</Provider>
}
export default App
