import {ScrollView, View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import {Tabs, Swiper, Calendar, Empty} from '@nutui/nutui-react-taro';
import {Calendar as CalendarIcon} from '@nutui/icons-react-taro';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';

import Header from '@/components/Header'
import MyAttention from '@/components/MyAttention';

import {getScoreList} from '@/http/api'
import { currentDate, lastWeek } from '@/utils';

import ScoreItem from '@/components/ScoreItem';

import styles from './index.module.less'

export default function Course () {
  const [tabValue, setTabValue] = useState<string | number>('0')
  const swiperRef = useRef(null)

  const [isVisible, setIsVisible] = useState(false)
  const [date, setDate] = useState(currentDate())
  const [scoreList, setScoreList] = useState([])

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
    setTabValue(current.detail?.current)
    // @ts-ignore
  }
  const apis = useMemo(() => {
    return ['matchAll', 'matchLive', 'matchSaiCheng', 'matchSaiGuo', 'attention']
  }, [])

  const getList = useCallback(async () => {
    // 关注
    if (tabValue === 4) {
      setScoreList([])
      return false
    }
    Taro.showLoading()
    const matchDate = date.replace(/\//g, '-')
    const params = {
      matchDate
    }
    const result = await getScoreList(apis[tabValue], params)
    if (result?.data?.data && result?.data?.data.length) {
      setScoreList(result?.data?.data || [])
    } else {
      setScoreList([])
    }
    Taro.hideLoading()
  }, [date, apis, tabValue])
  // const getList = async () => {
  //   const params = {
  //     matchDate: date
  //   }
  //   const result = await getScoreList(apis[tabValue], params)
  //   console.log(result.data.data)
  //   setScoreList(result.data.data)
  // }
  useEffect(() => {
    getList().then()
  }, [getList, tabValue])
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
          <Tabs.TabPane title='关注'></Tabs.TabPane>
        </Tabs>
        {
          tabValue !== 4
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
                {
                  tabValue !== 4 &&
                  <View className={styles.outer}>
                    {
                      scoreList.length > 0 &&
                      scoreList.map((scoreItem: any) => (
                        <ScoreItem scoreItem={scoreItem} tabValue={tabValue} key={scoreItem.matchId} />
                      ))
                    }
                    {
                      scoreList.length === 0 && <Empty description='无数据' imageSize={80} />
                    }
                  </View>
                }
                {
                  tabValue === 4 &&
                  <MyAttention />
                }
              </ScrollView>
            </Swiper.Item>
          ))}
        </Swiper>
      </View>
    </>
  )
}
