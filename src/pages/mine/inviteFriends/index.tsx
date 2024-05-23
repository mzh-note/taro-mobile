import Taro from '@tarojs/taro';
import {View, Text, Image} from '@tarojs/components';
import {getCurrentInstance} from '@tarojs/runtime';
import {useAppSelector} from '@/store/hooks';
import {ArrowRight} from '@nutui/icons-react-taro';
import {Empty} from '@nutui/nutui-react-taro';
import {useEffect, useState} from 'react';

import {inviteInfo} from '@/http/api';
import golden from '@/assets/icon-golden.png';
import defaultIcon from '@/assets/default-icon.png'
import styles from './index.module.less'

export default function InviteFriends () {
  const userInfo = useAppSelector(state => state.user.user)
  const instance = getCurrentInstance()
  const balance = instance?.router?.params.balance || 0
  const freezeBalance = instance?.router?.params.freezeBalance || 0
  const [tab, setTab] = useState(1)
  const [list, setList] = useState([])
  const [inviteList, setInviteList] = useState([])
  const [loseCount, setLoseCount] = useState(0)
  useEffect( () => {
    const getInviteInfo = async() => {
      const res = await inviteInfo()
      setList(res?.data?.data)
      // 计算失效数
      const count = res?.data?.data.filter(item => item?.state === 2).length
      setLoseCount(count)
      // 计算初始化的有效邀请列表
      const newList = res?.data?.data.filter(item => item?.state === tab)
      setInviteList(newList)
    }
    getInviteInfo()
  }, []);

  const changeTab = (val: number) => {
    setTab(val)
    const newList = list.filter(item => item.state === val)
    setInviteList(newList)
  }
  const showPreview = () => {
    Taro.previewImage({
      enablesavephoto: true,
      enableShowPhotoDownload: true,
      current: `${process.env.TARO_APP_BASEURL}/images/3`, // 当前显示图片的http链接
      urls: [`${process.env.TARO_APP_BASEURL}/images/3`] // 需要预览的图片http链接列表
    })
  }
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
            <View className={styles.invite__friends__tips__coin__up}>{balance}</View>
            <View className={styles.invite__friends__tips__coin__down}>百包币
              <Image className={styles.invite__friends__tips__coin__down__img} src={golden} mode='aspectFit' />
            </View>
          </View>
          <View className={styles.invite__friends__tips__coin}>
            <View className={styles.invite__friends__tips__coin__up}>{freezeBalance}</View>
            <View className={styles.invite__friends__tips__coin__down}>锁定
              <Image className={styles.invite__friends__tips__coin__down__img} src={golden} mode='aspectFit' />
            </View>
          </View>
          <View className={styles.invite__friends__tips__btn} onClick={showPreview}>邀请好友</View>
        </View>
        <View className={styles.invite__friends__list}>
          <View className={styles.invite__friends__list__tabs}>
            <Text
              onClick={() => changeTab(1)}
              className={`
              ${styles.invite__friends__list__tabs__lose}
              ${tab === 1 ? styles.invite__friends__list__tabs__active : ''}
             `}
            >已邀请{list.length}人</Text>
            <Text
              onClick={() => changeTab(2)}
              className={`
              ${styles.invite__friends__list__tabs__lose}
              ${tab === 2 ? styles.invite__friends__list__tabs__active : ''}
             `}
            >失效{loseCount}人</Text>
          </View>
          <View className={styles.invite__friends__list__header}>
            <Text className={styles.invite__friends__list__header__th}>全部粉丝</Text>
            <Text className={styles.invite__friends__list__header__th}>累计奖励</Text>
            <Text className={styles.invite__friends__list__header__th}>邀请时间</Text>
          </View>
          {
            inviteList.length > 0 &&
            inviteList.map(item => (
              <View className={styles.invite__friends__list__li} key={item}>
                <View className={styles.invite__friends__list__li__item}>
                  <Image
                    className={styles.invite__friends__list__li__item__img}
                    src={item.avatar ? `${process.env.TARO_APP_BASEURL}/${item.avatar}` : defaultIcon}
                    mode='aspectFit'
                  />
                  <View className={styles.invite__friends__list__li__item__info}>
                    <Text className={styles.invite__friends__list__li__item__info__h4}>{item.nickName}</Text>
                    <Text className={styles.invite__friends__list__li__item__info__h5}>一级会员</Text>
                  </View>
                </View>
                <View className={styles.invite__friends__list__li__item}>70 BOB币</View>
                <View className={styles.invite__friends__list__li__last__item}>
                  <Text className={styles.invite__friends__list__li__item__h6}>2024-04-04</Text>
                  <Text className={styles.invite__friends__list__li__item__h6}>17:11:16</Text>
                </View>
              </View>
            ))
          }
          {
            inviteList.length === 0 &&
            <View className={styles.invite__friends__list__li}>
              <Empty description='暂无数据' size='small' />
            </View>
          }
        </View>
      </View>
    </>
  )
}
