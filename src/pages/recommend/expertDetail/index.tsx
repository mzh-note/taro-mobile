import {View, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import Header from '@/components/Header';
import {Overlay, Avatar, Button, Empty} from '@nutui/nutui-react-taro';
import {useCallback, useEffect, useState} from 'react';
import {favoriteAddPro, favoriteDelPro, proInfo, suggestList} from '@/http/api';
import useShareApp from '@/hooks/useShareApp';

import styles from './index.module.less'

export default function ExpertDetail () {
  useShareApp()
  const instance = Taro.getCurrentInstance()
  const proId = instance?.router?.params.proId
  const [proBase, setProBase] = useState({})
  const [list, setList] = useState([])
  const [sugList, setSugList] = useState([])
  const [loading, setLoading] = useState(false)

  const [visible, setVisible] = useState(true)
  const onClose = () => {
    setVisible(false)
    getSuggestList().then()
  }

  const getInfo = useCallback(async () => {
    setLoading(true)
    const result = await proInfo({proId})
    setProBase(result?.data?.data?.proBase)
    setList(result?.data?.data?.tenList?.forecast_result?.length ? result?.data?.data?.tenList?.forecast_result : [])
    setLoading(false)
  }, [proId])

  const getSuggestList = useCallback(async () => {
    const result = await suggestList({proId})
    setSugList(result?.data?.data?.length ? result?.data?.data : [])
  }, [proId])
  useEffect(() => {
    getInfo().then()
  }, [getInfo])
  const getFavoriteAddPro = async (params: any) => {
    if (!params.proId) {
      return false
    }
    if (params.favorite_state === 0) {
      const res = await favoriteAddPro({proId: params.proId})
      if (res?.data.status === 0) {
        Taro.showToast({
          icon: 'none',
          title: '关注成功'
        })
        setProBase({
          ...proBase,
          favorite_state: 1
        })
      }
    } else {
      const res = await favoriteDelPro({proId: params.proId})
      if (res?.data.status === 0) {
        Taro.showToast({
          icon: 'none',
          title: '取消关注成功'
        })
        setProBase({
          ...proBase,
          favorite_state: 0
        })
      }
    }
  }
  return (
    <>
      <Header />
      <View className={styles.expert__detail}>
        <View className={styles.overview}>
          <Avatar
            className={styles.overview__img}
            size='normal'
            src={`${process.env.TARO_APP_BASEURL}/images/${proBase?.avatar}`}
          />
          <View className={styles.overview__info}>
            <View className={styles.info__author}>{proBase?.nickName}</View>
            <View className={styles.info__rate}>
              <Text className={styles.info__rate__connect}>连中{proBase?.sustainWin}场</Text>
              <Text className={styles.info__rate__hit}>二串一命中率{proBase?.towRate}%</Text>
            </View>
          </View>
          <Button
            className={`${styles.info__follow} ${proBase?.favorite_state === 1 ? `${styles.info__follow_active}`: ''}`}
            type='primary'
            size='small'
            onClick={() => getFavoriteAddPro(proBase)}
          >
            {proBase?.favorite_state === 1 ? '已关注' : '关注' }
          </Button>
        </View>
        <View className={styles.plan}>
          <View className={styles.plan__detail}>
            <Text className={styles.plan__detail__title}>二串一</Text>
            <Text className={styles.plan__detail__status}>近10命中</Text>
            <View className={styles.plan__detail__li}>
              {
                list.length > 0 &&
                list.map(item => (
                  <Text key={item} className={styles.plan__detail__item}>wr</Text>
                ))
              }
              {
                !visible && !loading &&
                list.length === 0 &&
                <Empty description='暂无数据' size='small' />
              }
            </View>
          </View>
          <View className={styles.plan__rate}>
            {/*<Text className={styles.plan__rate__percent}>*/}
            {/*  <Text className={styles.plan__rate__percent__count}>{proBase?.sustainWin}</Text>*/}
            {/*  <Text className={styles.plan__rate__percent__unit}>%</Text>*/}
            {/*</Text>*/}
            {/*<Text className={styles.plan__rate__eval}>本场回报率</Text>*/}
          </View>
        </View>
        {
          sugList.length > 0 &&
          sugList.map(sugItem => (
            <View className={styles.course} key={sugItem}>
              <View className={styles.course__time}>
                <Text className={styles.course__time__week}>{sugItem?.matchLotteryOne1}</Text>
                <Text className={styles.course__time__name}>{sugItem?.matchTypeName1}</Text>
              </View>
              <View className={styles.course__ball}>
                <View className={styles.course__ball__item}>
                  <Text className={styles.course__ball__item__name}>{sugItem?.homeName1}</Text>
                  <Image
                    className={styles.course__ball__item__icon}
                    src={sugItem?.homeLogo1}
                    mode='aspectFit'
                  />
                </View>
                <View className={styles.course__ball__vs}>VS</View>
                <View className={styles.course__ball__item}>
                  <Image
                    className={styles.course__ball__item__icon}
                    src={sugItem?.awayLogo1}
                    mode='aspectFit'
                  />
                  <Text className={styles.course__ball__item__name}>{sugItem?.awayName1}</Text>
                </View>
              </View>
              <View className={styles.course__score}>
                <View className={styles.course__score__left}>
                  <View className={styles.course__score__left__res}>
                    {sugItem?.forecast1}
                  </View>
                </View>
                <View className={styles.course__score__right}>
                  {sugItem?.winstate11 === 0 ? '负' : '胜'}({sugItem?.winRate1})
                </View>
                <View className={`${styles.course__score__right} ${styles.course__score__right__r}`}>
                  {sugItem?.winstate12 === 0 ? '负' : '胜'}({sugItem?.winRate11})
                </View>
                <View className={styles.course__score__left}>
                  <View className={styles.course__score__left__res}>
                    {sugItem?.forecast11}
                  </View>
                </View>
              </View>
          {
            sugItem?.suggestType === 1
            &&
            <>
              <View className={styles.course__time}>
                <Text className={styles.course__time__week}>{sugItem?.matchLotteryOne2}</Text>
                <Text className={styles.course__time__name}>{sugItem?.matchTypeName2}</Text>
              </View>
              <View className={styles.course__ball}>
                <View className={styles.course__ball__item}>
                  <Text className={styles.course__ball__item__name}>{sugItem?.homeName2}</Text>
                  <Image
                    className={styles.course__ball__item__icon}
                    src={sugItem?.homeLogo2}
                    mode='aspectFit'
                  />
                </View>
                <View className={styles.course__ball__vs}>VS</View>
                <View className={styles.course__ball__item}>
                  <Image
                    className={styles.course__ball__item__icon}
                    src={sugItem?.awayLogo2}
                    mode='aspectFit'
                  />
                  <Text className={styles.course__ball__item__name}>{sugItem?.awayName2}</Text>
                </View>
              </View>
              <View className={styles.course__score}>
                <View className={styles.course__score__left}>
                  <View className={styles.course__score__left__res}>
                    {sugItem?.forecast2}
                  </View>
                </View>
                <View className={styles.course__score__right}>
                  {sugItem?.winstate21 === 0 ? '负' : '胜'}({sugItem?.winRate2})
                </View>
                <View className={`${styles.course__score__right} ${styles.course__score__right__r}`}>
                  {sugItem?.winstate22 === 0 ? '负' : '胜'}({sugItem?.winRate21})
                </View>
                <View className={styles.course__score__left}>
                  <View className={styles.course__score__left__res}>
                    {sugItem?.forecast21}
                  </View>
                </View>
              </View>
            </>

          }
            </View>
          ))
        }
        {
          !visible && !loading && sugList.length === 0 &&
          <Empty description='暂无数据' size='small' />
        }
      </View>
      <Overlay visible={visible} closeOnOverlayClick={false}>
        <div className={styles.expert__detail__overlay}>
          <div className={styles.expert__detail__overlay__content}>
            <Text className={styles.expert__detail__overlay__content__text}>解锁专家方案需要{proBase?.cost}币</Text>
            <Text className={styles.expert__detail__overlay__content__btn} onClick={onClose}>立即解锁</Text>
          </div>
        </div>
      </Overlay>
    </>
  )
}
