import Taro from '@tarojs/taro';
import {Image, Text, View} from '@tarojs/components';
import {Empty} from '@nutui/nutui-react-taro';
import {useEffect, useState} from 'react';
import {allList, favoriteAddMatch, favoriteDelMatch, hotMatchList, towList} from '@/http/api';
import ExpertItem from '@/components/ExpertItem';
import like from '@/assets/like.png';
import like_active from '@/assets/like_active.png'

import styles from './index.module.less'

export default function RecommendExpert (props) {
  const type = props.type
  const [list, setList] = useState([])
  const [hotList, setHotList] = useState<any>([])
  useEffect(() => {
    Taro.showLoading()
    if (type === 1) {
      getAllList().then()
    } else {
      getTowList().then()
    }
    getHotList().then()
  }, [type]);
  const getAllList = async () => {
    const result = await allList()
    setList(result.data.data)
    Taro.hideLoading()
  }
  const getTowList = async () => {
    const result = await towList()
    setList(result.data.data)
    Taro.hideLoading()
  }
  const getHotList = async () => {
    const result = await hotMatchList()
    const data = result.data.data.map(item => {
      const percent = item.totalHome + item.totalAway + item.totalDraw
      item.totalHome = `${(item.totalHome / percent * 100).toFixed(0)}%`
      item.totalAway = `${(item.totalAway / percent * 100).toFixed(0)}%`
      item.totalDraw = `${(item.totalDraw / percent * 100).toFixed(0)}%`
      return item;
    })
    setHotList(data)
    Taro.hideLoading()
  }
  const toAddMatch = async (selectItem) => {
    console.log('关注比赛', selectItem)
    if (!selectItem.matchId) {
      return false
    }
    if (selectItem.favorite_state === 0) {
      const res = await favoriteAddMatch({matchId: selectItem.matchId})
      console.log(res.data.status)
      if (res.data.status === 0) {
        Taro.showToast({
          icon: 'none',
          title: '收藏成功'
        })
        const newList = hotList.map((item: any) => {
          if (item?.matchId === selectItem.matchId) {
            return {
              ...item,
              favorite_state: 1
            }
          } else {
            return item
          }
        })
        setHotList(newList)
      }
    } else {
      const res = await favoriteDelMatch({matchId: selectItem.matchId})
      if (res.data.status === 0) {
        Taro.showToast({
          icon: 'none',
          title: '取消收藏成功'
        })
        const newList = hotList.map((item: any) => {
          if (item?.matchId === selectItem.matchId) {
            return {
              ...item,
              favorite_state: 0
            }
          } else {
            return item
          }
        })
        setHotList(newList)
      }
    }
  }
  return (
    <>
      <View className={styles.expert__list}>
        {
          list.map((currItem: any) => (
            <ExpertItem item={currItem} key={currItem.proId} />
          ))
        }
      </View>
      <View className={styles.hot__title}>热门赛事</View>
      {
        hotList.length > 0 &&
        hotList.map(item => (
          <View className={styles.hot__li} key={item}>
            <View className={styles.hot__detail}>
              <View className={styles.hot__country}>
                <Image
                  className={styles.hot__img}
                  src={`https://images.weserv.nl/?url=${item?.homeLogo}`}
                  mode='aspectFit'
                />
                <Text className={styles.hot__name}>{item?.homeName}</Text>
              </View>
              <View className={styles.hot__score}>{item?.homeScore[0]} : {item?.awayScore[0]}</View>
              <View className={styles.hot__country}>
                <Image
                  className={styles.hot__img}
                  src={`https://images.weserv.nl/?url=${item?.awayLogo}`}
                  mode='aspectFit'
                />
                <Text className={styles.hot__name}>{item?.awayName}</Text>
              </View>
            </View>
            <View className={styles.hot__progress}>
              <View className={styles.hot__percent}>
                {item?.totalHome}&emsp;{item?.totalAway}&emsp;{item?.totalDraw}
              </View>
              <View className={styles.hot__part}>
                <Text className={styles.hot__part__p1} style={{width: item?.totalHome}}></Text>
                <Text className={styles.hot__part__p2} style={{width: item?.totalAway}}></Text>
                <Text className={styles.hot__part__p3}></Text>
              </View>
            </View>
            <View className={styles.hot__note}>
              <Text className={styles.hot__time}>{item?.startTime?.slice(0, 19)}</Text>
              <Image
                className={styles.hot__like}
                src={`${item?.favorite_state === 0 ? like : like_active}`}
                mode='aspectFit'
                onClick={() => toAddMatch(item)}
              />
            </View>
          </View>
        ))
      }
      {
        hotList.length === 0 &&
        <View className={styles.hot__li}>
          <Empty description='无数据' imageSize={80} />
        </View>
      }
    </>
  )
}
