import Taro from '@tarojs/taro';
import {Image, Text, View} from '@tarojs/components';
import golden from '@/assets/icon-golden.png';
import wx from '@/assets/icon-wx.png';
import mine from '@/assets/icon-mine.png';
import person from '@/assets/icon-person.png';
import logo from '@/assets/logo.png';
import defaultIcon from '@/assets/default-icon.png';
import {useAppSelector} from '@/store/hooks';
import {useEffect, memo} from 'react';
import styles from './index.module.less'

const AboutList = memo(() => {
  const userInfo = useAppSelector(state => state.user.user)
  const isLogin = userInfo.openid && userInfo.avatar && userInfo.userStatus === 1
  // console.log('获取userInfo', userInfo)
  useEffect(() => {

  }, []);

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
  const applyExpert = () => {
    console.log('申请专家')
  }
  const toInviteFriends = () => {
    Taro.navigateTo({
      url: '/pages/mine/inviteFriends/index'
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
          <Text className={styles.assets__txt}>个人资产：<Text className={styles.assets_num}>0</Text> 币</Text>
          <Text className={styles.assets__txt}>锁定：<Text className={styles.assets_num}>0</Text> 币</Text>
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
              <Text className={styles.list_item_top}>申请专家</Text>
              <Text className={styles.list_item_bottom}>推单赚金币</Text>
            </View>
          </View>
        </View>
      </View>
    </>
  )
}, [])
export default AboutList
