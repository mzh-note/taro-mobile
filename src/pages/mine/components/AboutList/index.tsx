import Taro, {useDidShow} from '@tarojs/taro';
import {Image, Text, View} from '@tarojs/components';
import golden from '@/assets/icon-golden.png';
import wx from '@/assets/icon-wx.png';
import mine from '@/assets/icon-mine.png';
import person from '@/assets/icon-person.png';
import logo from '@/assets/logo.png';
import defaultIcon from '@/assets/default-icon.png';
import {useAppSelector} from '@/store/hooks';
import {useEffect, memo, useState} from 'react';
import {applyPro, getUserInfo} from '@/http/api';
import styles from './index.module.less'

const AboutList = memo(() => {
  const userInfo = useAppSelector(state => state.user.user)
  const [info, setInfo] = useState({})
  const isLogin = userInfo.openid && userInfo.avatar && userInfo.userStatus === 1
  console.log('获取userInfo', userInfo)

  useDidShow(() => {
    getInfo().then()
  })
  useEffect(() => {

  }, []);
  const getInfo = async () => {
    if (isLogin) {
      const res = await getUserInfo()
      console.log(res?.data.data)
      setInfo(res?.data.data)
    }
  }
  const toUserInfo = () => {
    Taro.navigateTo({
      url: '/pages/mine/nickName/index'
    })
  }
  const goMyAttention = () => {
    if (isLogin) {
      Taro.switchTab({
        url: '/pages/course/index'
      })
    }
  }
  const applyExpert = async () => {
    if (info?.isPro === 0) {
      await applyPro()
      Taro.showToast({
        icon: 'none',
        title: '申请成功'
      })
    } else {
      Taro.navigateTo({
        url: '/pages/mine/calculatePro/index'
      })
    }
  }
  const toInviteFriends = () => {
    Taro.navigateTo({
      url: `/pages/mine/inviteFriends/index?balance=${info?.balance}&freezeBalance=${info?.freezeBalance}`
    })
  }
  return (
    <>
      <View className={styles.mine}>
        <View className={styles.mine__logo}>
          <Image className={styles.img__logo} src={logo} mode='aspectFit' />
        </View>
        <View className={styles.mine__icon}>
          <Image className={styles.mine__icon__img} src={userInfo.avatar ? userInfo.avatar : defaultIcon} onClick={toUserInfo} />
        </View>
        <View className={styles.user} onClick={toUserInfo}>
          {
            userInfo.openid ? (userInfo.name || '匿名') : '当前未登陆，请登陆'
          }
        </View>
        <View className={styles.assets}>
          <Text className={styles.assets__txt}>个人资产：<Text className={styles.assets_num}>{info?.balance}</Text> 币</Text>
          <Text className={styles.assets__txt}>锁定：<Text className={styles.assets_num}>{info?.freezeBalance}</Text> 币</Text>
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
          <View className={styles.list_li} onClick={goMyAttention}>
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
          <View className={styles.list_li} onClick={toInviteFriends}>
            <View className={styles.list__img}>
              <Image src={person} mode='aspectFit' />
            </View>
            <View className={styles.list__item}>
              <Text className={styles.list_item_top}>邀请好友</Text>
              <Text className={styles.list_item_bottom}>邀好友得bob币</Text>
            </View>
          </View>
          <View className={styles.list_li} onClick={applyExpert}>
            <View className={styles.list__img}>
              <Image src={person} mode='aspectFit' />
            </View>
            <View className={styles.list__item}>
              <Text className={styles.list_item_top}>{info?.isPro === 0 ? '申请专家' : '计算器'}</Text>
              <Text className={styles.list_item_bottom}>推单赚金币</Text>
            </View>
          </View>
        </View>
      </View>
    </>
  )
}, [])
export default AboutList
