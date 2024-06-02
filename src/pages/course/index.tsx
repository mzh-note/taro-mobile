import {ScrollView, View} from '@tarojs/components';
import Header from '@/components/Header';
import useShareApp from '@/hooks/useShareApp';

import ScoreItem from '@/components/ScoreItem';
import {Empty} from '@nutui/nutui-react-taro';
import ExpertItem from '@/components/ExpertItem';
import {useEffect, useState} from 'react';
import Taro, {useDidHide, useDidShow, useReady} from '@tarojs/taro';
import {favoriteMatchList, favoriteProList} from '@/http/api';

import styles from './index.module.less'

export default function Course() {
  useShareApp()
  const app = Taro.getApp()
  const tabValue = 3;
  const [scoreList, setScoreList] = useState<any>([])
  const [list, setList] = useState([])

  useDidShow(() => {
    console.log('useDidShow')
    if (app.isPreviewShareHide) {
      app.isPreviewShareHide = false
      return false
    }
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
    const res = await favoriteMatchList()
    if (res?.data?.data?.length > 0) {
      setScoreList(res?.data?.data)
    } else {
      setScoreList([])
    }
  }
  const updateParent = async (_matchId, _value) => {
    getFavoriteMatchList().then()
  }

  const getFavoriteProList = async () => {
    const res = await favoriteProList()
    if (res?.data?.data?.length > 0) {
      setList(res?.data?.data)
    } else {
      setList([])
    }
  }
  return (
    <>
      <Header />
      <ScrollView
        scrollY
        className={styles.course}
      >
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
          <View className={`${styles.my__attention__expert__li} ${list.length === 0 ? styles.my__attention__expert__li_empty : ''}`}>
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
      </ScrollView>
    </>
  )
}
