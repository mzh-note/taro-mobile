import Taro, {useDidShow} from '@tarojs/taro';
import {View} from '@tarojs/components';
import {Empty} from '@nutui/nutui-react-taro';
import {useEffect, useState} from 'react';
import {allList, hotMatchList, towList} from '@/http/api';
import ExpertItem from '@/components/ExpertItem';

import {useAppSelector} from '@/store/hooks';
import HotLiItem from '@/components/HotLiItem';
import styles from './index.module.less'

export default function RecommendExpert (props) {
  const score = useAppSelector(state => state.score.score)
  const type = props.type
  const [list, setList] = useState([])
  const [hotList, setHotList] = useState<any>([])

  useDidShow(() => {
    const newList = hotList.map(item => {
      if (item.matchId === score.matchId) {
        return {
          ...item,
          favorite_state: score.state
        }
      } else {
        return item
      }
    })
    setHotList(newList)
  })
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
    setList(result?.data?.data)
    Taro.hideLoading()
  }
  const getTowList = async () => {
    const result = await towList()
    setList(result?.data?.data)
    Taro.hideLoading()
  }
  const getHotList = async () => {
    const result = await hotMatchList()
    const data = result?.data?.data.map(item => {
      const percent = item.totalHome + item.totalAway + item.totalDraw
      item.totalHome = `${(item.totalHome / percent * 100).toFixed(0)}%`
      item.totalAway = `${(item.totalAway / percent * 100).toFixed(0)}%`
      item.totalDraw = `${(item.totalDraw / percent * 100).toFixed(0)}%`
      return item;
    })
    setHotList(data)
    Taro.hideLoading()
  }
  const updateParent = (matchId, value) => {
    const newList = hotList.map(item => {
      if (item?.matchId === matchId) {
        return {
          ...item,
          favorite_state: value
        }
      } else {
        return item
      }
    })
    setHotList(newList)
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
          <HotLiItem key={item.matchId} item={item} updateParent={updateParent} />
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
