import {PropsWithChildren, useState} from 'react';
import Taro, { useDidHide, useDidShow, useError, useLaunch, useRouter } from '@tarojs/taro'
import '@nutui/nutui-react-taro/dist/style.css'
import store from '@/store';
import {Provider} from 'react-redux';
import {wxLogin} from '@/http/api';
import './app.less'

function App({ children }: PropsWithChildren<any>) {
  const app = Taro.getApp()
  const [isLaunch, setLaunch] = useState(false)
  const [inviteCode, setInviteCode] = useState('')
  const router = useRouter()
  useLaunch((options) => {
    setLaunch(true)
    const code = options.query?.inviteCode || ''
    setInviteCode(code)
    Taro.setStorage({
      key: 'fromInviteCode', // 邀请码
      data: code
    })
    if (!isLaunch) {
      console.log('App launched.触发toLogin', options.query, isLaunch, router)
      checkLogin()
    }
  })

  useDidShow(() => {
    console.log('getCurrentInstance', Taro.getCurrentInstance().router)
    const path = Taro.getCurrentInstance().router?.path
    if (path === 'pages/mine/nickName/index') {
      return false
    }
    if (app.isPreviewShare) {
      app.isPreviewShare = false
      return false
    }
    if (isLaunch) {
      console.log('App useDidShow 触发toLogin', isLaunch, inviteCode, router)
      checkLogin()
      Taro.getStorage({
        key: 'fromInviteCode', // 邀请码
        success: function(res) {
          console.log('App fromInviteCode', res)
        }
      })
    }
  })

  useDidHide(() => {
    console.log('App did hide.')
    console.log(app.isPreviewShare)
    app.isPreviewShareHide = true
  })

  useError(() => {
    console.log('App error.')
  })

  const checkLogin = () => {
    Taro.getStorage({
      key: 'user',
      success: function (res) {
        if (res?.data?.openid) {
          const instance = Taro.getCurrentInstance()
          const currentPath = instance?.router?.path
          console.log('已登陆', currentPath)
          if (currentPath && currentPath === '/pages/login/index') {
            Taro.switchTab({
              url: '/pages/mine/mine'
            })
          }
        } else {
          toLogin()
        }
      },
      fail: function () {
        toLogin()
      }
    })
  }
  const toLogin = () => {
    Taro.login({
      success: async function (res) {
        // console.log('获取登录凭证（code）', res.code)
        const code = res.code
        if (code) {
          const response = await wxLogin({ code })
          const instance = Taro.getCurrentInstance()
          const currentPath = instance?.router?.path
          if (response?.data?.data?.userStatus === 1) {
            console.log('已注册')
            Taro.setStorage({
              key: 'user',
              data: response?.data?.data,
              success: function() {
                if (currentPath && currentPath === '/pages/login/index') {
                  Taro.switchTab({
                    url: '/pages/mine/mine'
                  })
                }
              }
            })
          } else {
            console.log('未注册')
            Taro.setStorage({
              key: 'user',
              data: null,
              success: function () {
                if (currentPath && currentPath !== '/pages/login/index') {
                  Taro.redirectTo({
                    url: '/pages/login/index'
                  })
                }
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
  // children 是将要会渲染的页面
  return <Provider store={store}>{children}</Provider>
}
export default App
