import {PropsWithChildren, useState} from 'react';
import Taro, { useDidHide, useDidShow, useError, useLaunch, useRouter } from '@tarojs/taro'
import '@nutui/nutui-react-taro/dist/style.css'
import store from '@/store';
import {Provider} from 'react-redux';
import {wxLogin} from '@/http/api';
import './app.less'

function App({ children }: PropsWithChildren<any>) {
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
      toLogin()
    }
  })

  useDidShow(() => {
    console.log('getCurrentInstance', Taro.getCurrentInstance().router)
    if (isLaunch) {
      console.log('App useDidShow 触发toLogin', isLaunch, inviteCode, router)
      toLogin()
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
  })

  useError(() => {
    console.log('App error.')
  })

  const toLogin = () => {
    Taro.login({
      success: async function (res) {
        // console.log('获取登录凭证（code）', res.code)
        const code = res.code
        if (code) {
          // console.log('/api/wx/login================')
          const response = await wxLogin({ code })
          // console.log('/api/wx/login================', response?.data?.data)
          const instance = Taro.getCurrentInstance()
          console.log(instance?.router?.path)
          const currentPath = instance?.router?.path
          if (response?.data?.data?.userStatus === 1) {
            console.log('已注册')
            Taro.setStorage({
              key: 'user',
              data: response?.data?.data,
              success: function() {
                if (currentPath && currentPath !== '/pages/mine/mine') {
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
