import {View, Text, Image} from '@tarojs/components';

import {useAppSelector} from '@/store/hooks';
import {ArrowRight} from '@nutui/icons-react-taro';
import golden from '@/assets/icon-golden.png';
import styles from './index.module.less'

export default function InviteFriends () {
  const userInfo = useAppSelector(state => state.user.user)
  console.log(userInfo)
  return (
    <>
      <View className={styles.invite__friends}>
        <View className={styles.invite__friends__rules}>
          <Text className={styles.invite__friends__rules__title}>【如何获得BOB币】</Text>
          <Text className={styles.invite__friends__rules__content}>把我们的小程序链接或者二维码，分享给你的好友，只要好友添加我们客服微信，即可获得70BOB币。</Text>
          <Text className={styles.invite__friends__rules__title}>【BOB可以做什么】</Text>
          <Text className={styles.invite__friends__rules__content}>BoB币可以在全站使用，一个BOB币即等于1原人民币，不可提现，不可买卖。可以查看专家推荐方案。可以兑换年度会员。年度会员365BOB币。</Text>
        </View>
        <View className={styles.invite__friends__author}>
          <View className={styles.invite__friends__author__icon}>
            <Image className={styles.invite__friends__author__icon__img} src={userInfo.avatar as string} mode='aspectFit' />
          </View>
          <View className={styles.invite__friends__author__info}>
            <Text className={styles.invite__friends__author__info__name}>{userInfo.name}</Text>
            <Text className={styles.invite__friends__author__info__level}>荣誉会员</Text>
          </View>
          <View className={styles.invite__friends__author__rule}>
            规则
            <ArrowRight size={10} color='#fff' /></View>
        </View>
        <View className={styles.invite__friends__tips}>
          <View className={styles.invite__friends__tips__coin}>
            <View className={styles.invite__friends__tips__coin__up}>10000</View>
            <View className={styles.invite__friends__tips__coin__down}>百包币
              <Image className={styles.invite__friends__tips__coin__down__img} src={golden} mode='aspectFit' />
            </View>
          </View>
          <View className={styles.invite__friends__tips__coin}>
            <View className={styles.invite__friends__tips__coin__up}>200</View>
            <View className={styles.invite__friends__tips__coin__down}>锁定
              <Image className={styles.invite__friends__tips__coin__down__img} src={golden} mode='aspectFit' />
            </View>
          </View>
          <View className={styles.invite__friends__tips__btn}>邀请好友</View>
        </View>
        <View className={styles.invite__friends__list}>
          <View className={styles.invite__friends__list__header}>
            <Text className={styles.invite__friends__list__header__active}>已邀请15人</Text>
            <Text className={styles.invite__friends__list__header__lose}>失效1人</Text>
          </View>
          <View className={styles.invite__friends__list__li}>
            <Text className={styles.invite__friends__list__li__th}>全部粉丝</Text>
            <Text className={styles.invite__friends__list__li__th}>累计奖励</Text>
            <Text className={styles.invite__friends__list__li__th}>邀请时间</Text>
          </View>
          <View className={styles.invite__friends__list__li}>
            <View className={styles.invite__friends__list__li__item}>
              <Text className={styles.invite__friends__list__li__item__td}>桶装水</Text>
              <Text className={styles.invite__friends__list__li__item__td}>一级会员</Text>
            </View>
            <View className={styles.invite__friends__list__li__item}>70 BOB币</View>
            <View className={styles.invite__friends__list__li__item}>
              <Text className={styles.invite__friends__list__li__item__td}>2024-04-04</Text>
              <Text className={styles.invite__friends__list__li__item__td}>17:11:16</Text>
            </View>
          </View>
        </View>
      </View>
    </>
  )
}
