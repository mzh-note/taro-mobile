import Taro, {useDidShow, useLoad, useReady} from '@tarojs/taro';
import {Image, Text, Video, View} from '@tarojs/components';
import golden from '@/assets/icon-golden.png';
import wx from '@/assets/icon-wx.png';
import mine from '@/assets/icon-mine.png';
import person from '@/assets/icon-person.png';
import logo from '@/assets/logo.png';
import qq from '@/assets/qq.png'
import defaultIcon from '@/assets/default-icon.png';
import {useAppDispatch, useAppSelector} from '@/store/hooks';
import { memo, useState} from 'react';
import {applyPro, getUserInfo} from '@/http/api';
import {setUser} from '@/store/modules/userReducer';
import {Button, Overlay} from '@nutui/nutui-react-taro';
import styles from './index.module.less'

const AboutList = memo(() => {
  const app = Taro.getApp()
  const userInfo = useAppSelector(state => state.user.user)
  const dispatch = useAppDispatch()
  const [info, setInfo] = useState({})
  const [firstLoad, setFirstLoad] = useState(true)
  const [visible, setVisible] = useState(false)

  useLoad(() => {
    console.log('AboutList useLoad =====================')
    Taro.getStorage({
      key: 'fromInviteCode',
      success: function(res) {
        dispatch(setUser({
          fromInviteCode: res?.data
        }))
      }
    })
    Taro.getStorage({
      key: 'user',
      success: async function(res) {
        // console.log(res)
        if (res.errMsg.indexOf('ok') > -1) {
          if (res?.data) {
            const payload = res?.data
            dispatch(setUser(payload))
            setFirstLoad(false)
            const res2 = await getUserInfo()
            setInfo(res2?.data?.data)
            dispatch(setUser({
              inviteCode: res2?.data?.data?.inviteCode || ''
            }))
          }
        } else {
          console.error('getStorage error')
        }
      },
      fail: function () {
        // console.error('user', err)
      }
    })
  })
  useDidShow(async () => {
    if (app.isPreviewShareHide) {
      app.isPreviewShareHide = false
      return false
    }
    if (!firstLoad) {
      const res = await getUserInfo()
      setInfo(res?.data?.data)
      dispatch(setUser({
        inviteCode: res?.data?.data?.inviteCode || ''
      }))
    }
  })

  const goMyAttention = () => {
    Taro.switchTab({
      url: '/pages/course/index'
    })
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
          <Video
            className={styles.mine__logo__bg}
            src={`${process.env.TARO_APP_BASEURL}/images/8.mp4`}
            initialTime={0}
            controls={false}
            autoplay
            loop
            muted
            showProgress={false}
            showFullscreenBtn={false}
            showPlayBtn={false}
            showCenterPlayBtn={false}
            enableProgressGesture={false}
            showBottomProgress={false}
          />
        </View>
        <View className={styles.mine__icon}>
          <Image
            className={styles.mine__icon__img}
            mode='aspectFill'
            src={userInfo.avatar ? `${process.env.TARO_APP_BASEURL}${userInfo.avatar}` : defaultIcon}
          />
        </View>
        <View className={styles.user}>
          {userInfo.openid ? userInfo.name : '匿名'}
        </View>
        <View className={styles.assets}>
          <Text className={styles.assets__txt}>个人资产：<Text className={styles.assets_num}>{info?.balance || 0}</Text> 币</Text>
          <Text className={styles.assets__txt}>锁定：<Text className={styles.assets_num}>{info?.freezeBalance || 0}</Text> 币</Text>
          <Image className={styles.assets__img} src={golden} mode='aspectFit' />
        </View>
        <View className={styles.list}>
          <View className={styles.list_li} onClick={() => setVisible(true)}>
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
              <Text className={styles.list_item_top}>{info?.isPro === 0 ? '申请专家' : '我要推单'}</Text>
              <Text className={styles.list_item_bottom}>推单赚金币</Text>
            </View>
          </View>
        </View>
        <View className={styles.intro__img}>
          <Image className={styles.intro__img__logo} src={`${process.env.TARO_APP_BASEURL}/images/5`} mode='aspectFill'/>
        </View>
        <View className={styles.customer}>
          <Image className={styles.customer__qq} src={qq} mode='aspectFit' />
          <Button openType='contact' className={styles.customer__txt}>有任何问题请联系BOBdata官方客服</Button>
        </View>
      </View>
      <Overlay visible={visible} onClick={() => setVisible(false)}>
        <div className={styles.mine__overlay}>
          <div className={styles.mine__overlay__content}>
            <Image
              className={styles.mine__overlay__content__qrcode}
              src={`${process.env.TARO_APP_BASEURL}/images/6`}
              mode='aspectFill'
              showMenuByLongpress
            />
          </div>
        </div>
      </Overlay>
    </>
  )
})
export default AboutList
