import {useState} from 'react';
import Taro from '@tarojs/taro';
import {Image, View, Text} from "@tarojs/components";

import { login } from '@/http/api'

import styles from './mine.module.less'
import logo from '../../assets/logo.png'
import defaultIcon from '../../assets/default-icon.png'

import wx from '../../assets/icon-wx.png'
import mine from '../../assets/icon-mine.png'
import person from '../../assets/icon-person.png'
import golden from '../../assets/icon-golden.png'

interface IUserinfo {
  avatarUrl: string,
  nickName: string
}
export default function Mine () {
  const [userinfo, setUserinfo] = useState<IUserinfo | null>(null)
  const getUserInfo = () => {
    if (userinfo) {
      console.log('已登陆', userinfo)
      return false
    }
    console.log('未登陆')
    // 必须是在用户已经授权的情况下调用
    Taro.showLoading({
      title: '登陆中',
      mask: true
    })
    // Taro.showToast({
    //   icon: 'loading',
    //   title: '获取用户信息'
    // })
    Taro.getUserProfile({
      lang: 'zh_CN',
      desc: '用于完善会员资料',
      success: (profile) => {
        console.log('已授权', profile)
        Taro.hideLoading()
        setUserinfo(profile.userInfo)
        Taro.login({
          success: async function (res) {
            if (res.code) {
              console.log(res.code)
              const response = await login({
                code: res.code
              })
              console.log('登陆成功', response.data.date)
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
      },
      fail: (error) => {
        Taro.hideLoading()
        console.log('拒绝授权', error)
      }
    })
    // Taro.getUserInfo({
    //   success: (res) => {
    //     console.log(res)
    //     setUserinfo(res.userInfo)
    //   },
    //   fail: (err) => {
    //     console.log('获取用户信息失败', err)
    //   }
    // })
  }
  return (
    <View className={styles.mine}>
      <View className={styles.mine__logo}>
        <Image className={styles.img__logo} src={logo} mode='aspectFit' />
        <Image className={styles.icon} src={userinfo ? userinfo?.avatarUrl : defaultIcon} onClick={getUserInfo} />
      </View>
      <View className={styles.user}>
        {
          userinfo ? userinfo?.nickName : '当前未登陆，请登陆'
        }
      </View>
      <View className={styles.assets}>
        <Text className={styles.assets__txt}>个人资产：<Text className={styles.assets_num}>10000</Text> 币</Text>
        <Text className={styles.assets__txt}>锁定：<Text className={styles.assets_num}>200</Text> 币</Text>
        <Image className={styles.assets__img} src={golden} mode='aspectFit' />
      </View>
      <View className={styles.list}>
        <View className={styles.list_li}>
          <View className={`${styles.list__img} }`}>
            <Image src={wx} mode='aspectFit' />
          </View>
          <View className={styles.list__item}>
            <Text className={styles.list_item_top}>添加专家微信</Text>
            <Text className={styles.list_item_bottom}>免费分享私推单</Text>
          </View>
        </View>
        <View className={styles.list_li}>
          <View className={styles.list__img}>
            <Image src={mine} mode='aspectFit' />
          </View>
          <View className={styles.list__item}>
            <Text className={styles.list_item_top}>我的关注</Text>
            <Text className={styles.list_item_bottom}>关注的比赛和专家</Text>
          </View>
        </View>
      </View>
      <View className={styles.list}>
        <View className={styles.list_li}>
          <View className={styles.list__img}>
            <Image src={person} mode='aspectFit' />
          </View>
          <View className={styles.list__item}>
            <Text className={styles.list_item_top}>邀请好友</Text>
            <Text className={styles.list_item_bottom}>邀好友得bob币</Text>
          </View>
        </View>
        <View className={styles.list_li}>
          <View className={styles.list__img}>
            <Image src={person} mode='aspectFit' />
          </View>
          <View className={styles.list__item}>
            <Text className={styles.list_item_top}>申请专家</Text>
            <Text className={styles.list_item_bottom}>推单赚金币</Text>
          </View>
        </View>
      </View>
    </View>
  )
}