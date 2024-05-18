import {View, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import Header from '@/components/Header';
import {Avatar, Button} from '@nutui/nutui-react-taro';
import {useCallback, useEffect, useState} from 'react';
import {proInfo, suggestList} from '@/http/api';

import styles from './index.module.less'

export default function ExpertDetail () {
  const instance = Taro.getCurrentInstance()
  const proId = instance?.router?.params.proId
  const [proBase, setProBase] = useState({})
  const [list, setList] = useState([])
  const [sugList, setSugList] = useState([])

  const getInfo = useCallback(async () => {
    const result = await proInfo({proId})
    setProBase(result.data.data.proBase)
    setList(result.data.data.tenList.forecast_result)
  }, [proId])

  const getSuggestList = useCallback(async () => {
    const result = await suggestList({proId})
    setSugList(result.data.data)
  }, [proId])
  useEffect(() => {
    getInfo().then()
    getSuggestList().then()
  }, [getInfo, getSuggestList])
  return (
    <>
      <Header />
      <View className={styles.expert__detail}>
        <View className={styles.overview}>
          <Avatar
            className={styles.overview__img}
            size='normal'
            src={`${process.env.TARO_APP_BASEURL}/images/${proBase.avatar}`}
          />
          <View className={styles.overview__info}>
            <View className={styles.info__author}>{proBase.nickName}</View>
            <View className={styles.info__rate}>
              <Text className={styles.info__rate__connect}>连中{proBase.sustainWin}场</Text>
              <Text className={styles.info__rate__hit}>二串一命中率{proBase.towRate}%</Text>
            </View>
          </View>
          <Button className={styles.info__follow} type='primary' size='small'>关注</Button>
        </View>
        <View className={styles.plan}>
          <View className={styles.plan__detail}>
            <Text className={styles.plan__detail__title}>二串一</Text>
            <Text className={styles.plan__detail__status}>近10命中</Text>
            <View className={styles.plan__detail__li}>
              {
                list.map(item => (
                  <Text key={item} className={styles.plan__detail__item}>wr</Text>
                ))
              }
              {/*<Text className={`${styles.plan__detail__item} ${styles.grey}`}>RT</Text>*/}
              {/*<Text className={styles.plan__detail__item}>wr</Text>*/}
              {/*<Text className={styles.plan__detail__item}>RT</Text>*/}
              {/*<Text className={styles.plan__detail__item}>wr</Text>*/}
              {/*<Text className={styles.plan__detail__item}>RT</Text>*/}
              {/*<Text className={styles.plan__detail__item}>wr</Text>*/}
              {/*<Text className={styles.plan__detail__item}>RT</Text>*/}
              {/*<Text className={styles.plan__detail__item}>wr</Text>*/}
              {/*<Text className={styles.plan__detail__item}>RT</Text>*/}
              {/*<Text className={styles.plan__detail__item}>wr</Text>*/}
            </View>
          </View>
          <View className={styles.plan__rate}>
            <Text className={styles.plan__rate__percent}>
              <Text className={styles.plan__rate__percent__count}>{proBase.sustainWin}</Text>
              <Text className={styles.plan__rate__percent__unit}>%</Text>
            </Text>
            <Text className={styles.plan__rate__eval}>本场回报率</Text>
          </View>
        </View>
        {
          sugList.map(sugItem => (
            <View className={styles.course} key={sugItem}>
              <View className={styles.course__time}>
                <Text className={styles.course__time__week}>{sugItem.matchLotteryOne1}</Text>
                <Text className={styles.course__time__name}>{sugItem.matchTypeName1}</Text>
              </View>
              <View className={styles.course__ball}>
                <View className={styles.course__ball__item}>
                  <Text className={styles.course__ball__item__name}>{sugItem.homeName1}</Text>
                  <Image
                    className={styles.course__ball__item__icon}
                    src={`https://images.weserv.nl/?url=${sugItem.homeLogo1}`}
                    mode='aspectFit'
                  />
                </View>
                <View className={styles.course__ball__vs}>VS</View>
                <View className={styles.course__ball__item}>
                  <Image
                    className={styles.course__ball__item__icon}
                    src={`https://images.weserv.nl/?url=${sugItem.awayLogo1}`}
                    mode='aspectFit'
                  />
                  <Text className={styles.course__ball__item__name}>{sugItem.awayName1}</Text>
                </View>
              </View>
              <View className={styles.course__score}>
                <View className={styles.course__score__left}>
                  <View className={styles.course__score__left__res}>
                    {sugItem.forecast1}
                  </View>
                </View>
                <View className={styles.course__score__right}>
                  {sugItem.winState1 === 0 ? '负' : '胜'}({sugItem.winRate1})
                </View>
              </View>
          {
            sugItem.suggestType === 1
            &&
            <>
              <View className={styles.course__time}>
                <Text className={styles.course__time__week}>{sugItem.matchLotteryOne2}</Text>
                <Text className={styles.course__time__name}>{sugItem.matchTypeName2}</Text>
              </View>
              <View className={styles.course__ball}>
                <View className={styles.course__ball__item}>
                  <Text className={styles.course__ball__item__name}>{sugItem.homeName2}</Text>
                  <Image
                    className={styles.course__ball__item__icon}
                    src={`https://images.weserv.nl/?url=${sugItem.homeLogo2}`}
                    mode='aspectFit'
                  />
                </View>
                <View className={styles.course__ball__vs}>VS</View>
                <View className={styles.course__ball__item}>
                  <Image
                    className={styles.course__ball__item__icon}
                    src={`https://images.weserv.nl/?url=${sugItem.awayLogo2}`}
                    mode='aspectFit'
                  />
                  <Text className={styles.course__ball__item__name}>{sugItem.awayName2}</Text>
                </View>
              </View>
              <View className={styles.course__score}>
                <View className={styles.course__score__left}>
                  <View className={styles.course__score__left__res}>
                    {sugItem.forecast2}
                  </View>
                </View>
                <View className={styles.course__score__right}>
                  {sugItem.winState2 === 0 ? '负' : '胜'}({sugItem.winRate2})
                </View>
              </View>
            </>

          }
            </View>
          ))
        }
      </View>
    </>
  )
}
