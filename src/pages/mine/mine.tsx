import Taro from '@tarojs/taro';
import {Image, View, Text} from "@tarojs/components";

import {useAppSelector} from '@/store/hooks';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {setUser} from '@/store/modules/userReducer';
import {wxLogin} from '@/http/api';

import styles from './mine.module.less'
import logo from '../../assets/logo.png'
import defaultIcon from '../../assets/default-icon.png'

import wx from '../../assets/icon-wx.png'
import mine from '../../assets/icon-mine.png'
import person from '../../assets/icon-person.png'
import golden from '../../assets/icon-golden.png'
import AboutList from '@/pages/mine/components/AboutList';

export default function Mine () {
  const userInfo = useAppSelector(state => state.user.user)
  const dispatch = useDispatch()
  useEffect(() => {
    // Taro.login({
    //   success: async function (res) {
    //     console.log('获取登录凭证（code）', res.code)
    //     const code = res.code
    //     if (code) {
    //       const response = await wxLogin({ code })
    //       if (response.data.data.userStatus === 1) {
    //         console.log('已注册过')
    //         const payload = response.data.data
    //         payload.avatar = `${process.env.TARO_APP_BASEURL}${payload.avatar}`
    //         dispatch(setUser(response.data.data))
    //       } else {
    //         console.log('未注册')
    //       }
    //     }
    //   }
    // })
  }, []);

  const toUserInfo = () => {
    Taro.navigateTo({
      url: '/pages/mine/nickName/index'
    })
  }
  const goMyAttention = () => {
    Taro.switchTab({
      url: '/pages/course/index'
    })
  }
  return (
    <AboutList />
  )
}
