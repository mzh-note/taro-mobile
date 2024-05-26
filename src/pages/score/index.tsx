import {ScrollView, View} from '@tarojs/components';
import Taro, {useDidShow, useLoad} from '@tarojs/taro';
import {Tabs, Swiper, Calendar, Empty} from '@nutui/nutui-react-taro';
import {Calendar as CalendarIcon} from '@nutui/icons-react-taro';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';

import Header from '@/components/Header'

import ScoreItem from '@/components/ScoreItem';
import {getScoreList} from '@/http/api'
import { currentDate, lastWeek } from '@/utils';

import {useAppSelector} from '@/store/hooks';
import styles from './index.module.less'

export default function Course () {
  const score = useAppSelector(state => state.score.score)
  const [tabValue, setTabValue] = useState<string | number>('0')
  const swiperRef = useRef(null)

  const [isVisible, setIsVisible] = useState(false)
  const [date, setDate] = useState(currentDate())
  const [scoreList, setScoreList] = useState<any>([])
  const currentD = currentDate()

  let weeks = useMemo(() => {
    return lastWeek(date)
  }, [date])

  const openSwitch = () => {
    setIsVisible(true)
  }
  const changeDate = (d: string) => {
    setDate(d)
  }
  const closeSwitch = () => {
    setIsVisible(false)
  }

  const setChooseValue = (param: string) => {
    setDate(param[3].replace(/\//g, '-'))
  }

  const select = (_param: string) => {
    // console.log(_param)
  }
  const changeSwiper = (current: number) => {
    // @ts-ignore
    setTabValue(current?.detail?.current)
    // @ts-ignore
  }
  const apis = useMemo(() => {
    return ['matchAll', 'matchLive', 'matchSaiCheng', 'matchSaiGuo']
  }, [])

  const getList = useCallback(async () => {
    const matchDate = date.replace(/\//g, '-')
    const params = {
      matchDate
    }
    if (tabValue < '2') {
      params.matchDate = currentD
    }
    const result = await getScoreList(apis[tabValue], params)
    if (result?.data?.data && result?.data?.data.length) {
      setScoreList(result?.data?.data || [])
    } else {
      setScoreList([])
    }
  }, [date, apis, tabValue])

  useEffect(() => {
    console.log('useEffect')
    getList().then()
  }, [getList])

  useLoad(() => {
    console.log('useLoad')
  })
  useDidShow(() => {
    const newList = scoreList.map(item => {
      if (item.matchId === score.matchId) {
        return {
          ...item,
          favorite_state: score.state
        }
      } else {
        return item
      }
    })
    setScoreList(newList)
  })
  const updateParent = (matchId, value) => {
    const newList = scoreList.map(item => {
      if (item?.matchId === matchId) {
        return {
          ...item,
          favorite_state: value
        }
      } else {
        return item
      }
    })
    setScoreList(newList)
  }
  Taro.useTabItemTap((payload) => {
    console.log('点击了当前tab', payload)
  })

  return (
    <>
      <Header />
      <View className={styles.score}>
        <Tabs
          className={styles.tabs}
          value={tabValue}
          onChange={(value) => {
            swiperRef?.current?.to(value)
            setTabValue(value)
          }}
        >
          <Tabs.TabPane title='全部'></Tabs.TabPane>
          <Tabs.TabPane title='进行中'></Tabs.TabPane>
          <Tabs.TabPane title='赛程'></Tabs.TabPane>
          <Tabs.TabPane title='赛果'></Tabs.TabPane>
        </Tabs>
        {
          tabValue > '1'
          &&
          <>
            <View className={styles.date__tabs}>
              <Swiper
                defaultValue={0}
                loop={false}
                ref={swiperRef}
                height={35}
              >
                <Swiper.Item className={styles.date__tabs__container}>
                  {
                    weeks.map(item => (
                      <View
                        className={
                          `${styles.date__tabs__container__item} ${item.date === date ?
                            `${styles.date__tabs__container__item_active}` : ''}`
                        }
                        key={item.date}
                        onClick={() => changeDate(item.date)}
                      >
                        <View className={styles.date__tabs__container__item__date}>{item.date.slice(5)}</View>
                        <View className={styles.date__tabs__container__item__week}>{item.week}</View>
                      </View>
                    ))
                  }
                  <View  className={styles.date__tabs__container__icon} onClick={openSwitch}>
                    <CalendarIcon color='#d4231c' />
                  </View>
                </Swiper.Item>
              </Swiper>
            </View>
            <Calendar
              visible={isVisible}
              showTitle={false}
              defaultValue={date}
              onClose={closeSwitch}
              onConfirm={setChooseValue}
              onDayClick={select}
              startDate='2023-01-01'
            />
            </>
        }
        <Swiper
          className='score-swiper'
          ref={swiperRef}
          loop={false}
          defaultValue={0}
          onChange={changeSwiper}
        >
          {apis.map((item) => (
            <Swiper.Item key={item} className='score-swiper-item'>
              <ScrollView
                enhanced
                showScrollbar={false}
                scrollY
                style={{height: '100%'}}
              >
                <View className={`${styles.score__outer} ${tabValue > '1' ? '' : styles.score__outer2}`}>
                  {
                    scoreList.length > 0 &&
                    scoreList.map((scoreItem: any) => (
                      <ScoreItem
                        scoreItem={scoreItem}
                        tabValue={tabValue}
                        updateParent={updateParent}
                        key={scoreItem.matchId}
                      />
                    ))
                  }
                  {
                    scoreList.length === 0 && <Empty description='无数据' imageSize={80} />
                  }
                </View>
              </ScrollView>
            </Swiper.Item>
          ))}
        </Swiper>
      </View>
    </>
  )
}
