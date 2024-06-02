import Taro, {useDidShow, useLoad} from '@tarojs/taro';
import {Image, Text, Video, View} from '@tarojs/components';
import golden from '@/assets/icon-golden.png';
import wx from '@/assets/icon-wx.png';
import mine from '@/assets/icon-mine.png';
import person from '@/assets/icon-person.png';
import qq from '@/assets/qq.png'
import defaultIcon from '@/assets/default-icon.png';
import {Button} from '@nutui/nutui-react-taro';
import useShareApp from '@/hooks/useShareApp';
import styles from './index.module.less'

const Login = () => {
  useShareApp()
  useLoad(() => {
    Taro.hideHomeButton()
  });
  const toUserInfo = () => {
    Taro.navigateTo({
      url: '/pages/mine/nickName/index'
    })
  }
  const handleClick = () => {
    Taro.showToast({
      icon: 'none',
      title: '请先登陆'
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
            src={defaultIcon}
            onClick={toUserInfo}
          />
        </View>
        <View className={styles.user} onClick={toUserInfo}>当前未登陆，请登陆</View>
        <View className={styles.assets}>
          <Text className={styles.assets__txt}>个人资产：<Text className={styles.assets_num}>0</Text> 币</Text>
          <Text className={styles.assets__txt}>锁定：<Text className={styles.assets_num}>0</Text> 币</Text>
          <Image className={styles.assets__img} src={golden} mode='aspectFit' />
        </View>
        <View className={styles.list} onClick={handleClick}>
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
        <View className={styles.list} onClick={handleClick}>
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
        <View className={styles.intro__img}>
          <Image className={styles.intro__img__logo} src={`${process.env.TARO_APP_BASEURL}/images/5`} mode='aspectFill' />
        </View>
        <View className={styles.customer}>
          <Image className={styles.customer__qq} src={qq} mode='aspectFit' />
          <Button openType='contact' className={styles.customer__txt}>有任何问题请联系BOBdata官方客服</Button>
        </View>
      </View>
    </>
  )
}
export default Login
