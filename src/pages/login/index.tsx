import Taro from '@tarojs/taro';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {setUser} from '@/store/modules/userReducer';
import {wxLogin} from '@/http/api';
import AboutList from '@/pages/mine/components/AboutList';

export default function Mine () {
  const dispatch = useDispatch()
  useEffect(() => {
    Taro.showLoading()
    Taro.login({
      success: async function (res) {
        // console.log('获取登录凭证（code）', res.code)
        const code = res.code
        if (code) {
          const response = await wxLogin({ code })
          Taro.hideLoading()
          if (response?.data?.data?.userStatus === 1) {
            console.log('已注册')
            const payload = response?.data?.data
            payload.avatar = `${process.env.TARO_APP_BASEURL}${payload.avatar}`
            dispatch(setUser(response?.data?.data))
            Taro.switchTab({
              url: '/pages/mine/mine'
            })
          } else {
            Taro.showToast({
              icon: 'none',
              title: '请先登陆'
            })
            console.log('未注册')
          }
        } else {
          Taro.hideLoading()
        }
      }
    })
  }, [dispatch]);

  return <AboutList />
}
