import { View } from '@tarojs/components'

import { Empty } from '@nutui/nutui-react-taro';
import {useEffect, useState} from 'react';

import Taro, {useDidHide, useDidShow, useReady} from '@tarojs/taro';
import ScoreItem from '@/components/ScoreItem';
import ExpertItem from '@/components/ExpertItem';

import {favoriteMatchList, favoriteProList} from '@/http/api';

import styles from './index.module.less'

export default function MyAttention() {
  const tabValue = 3;
  const [scoreList, setScoreList] = useState<any>([])
  const [list, setList] = useState([])

  useDidShow(() => {
    console.log('useDidShow')
    getFavoriteMatchList().then()
    getFavoriteProList().then()
  })
  useDidHide(() => {
    console.log('usedidhide')
  })
  useReady(() => {
    console.log('useReady')
  })
  useEffect(() => {
    console.log('useEffect')
  }, []);

  const getFavoriteMatchList = async () => {
    Taro.showLoading()
    const res = await favoriteMatchList()
    if (res.data.data.length > 0) {
      setScoreList(res.data.data)
    } else {
      setScoreList([])
    }
    Taro.hideLoading()
  }
  const updateParent = async (_matchId, _value) => {
    getFavoriteMatchList().then()
  }

  const getFavoriteProList = async () => {
    Taro.showLoading()
    const res = await favoriteProList()
    if (res.data.data.length > 0) {
      setList(res.data.data)
    } else {
      setList([])
    }
    Taro.hideLoading()
  }
  return (
    <View className={styles.my__attention}>
      <View className={styles.my__attention__title}>
        关注比赛
      </View>
      <View className={styles.my__attention__li}>
        {
          scoreList.length > 0 &&
          scoreList.map((scoreItem: any) => (
            <ScoreItem
              scoreItem={scoreItem}
              tabValue={tabValue}
              key={scoreItem.matchId}
              updateParent={updateParent}
            />
          ))
        }
        {
          scoreList.length === 0 &&
          <Empty description='无数据' imageSize={50} />
        }
      </View>
      <View className={styles.my__attention__title}>
        关注专家
      </View>
      <View className={styles.my__attention__li}>
        {
          list.length > 0 &&
          list.map((currItem: any) => (
            <ExpertItem item={currItem} key={currItem.proId} />
          ))
        }
        {
          list.length === 0 && <Empty description='无数据' imageSize={60} />
        }
      </View>
    </View>
  )
}
