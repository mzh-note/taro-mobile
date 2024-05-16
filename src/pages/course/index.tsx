import {ScrollView, Text, View} from '@tarojs/components';
import Header from '@/components/Header'
import {Tabs, Swiper, Calendar, Empty} from '@nutui/nutui-react-taro';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';

import {ArrowRight} from '@nutui/icons-react-taro';
import Taro from '@tarojs/taro';

import {getScoreList} from '@/http/api'
import { currentDate } from '@/utils';
import styles from './index.module.less'

export default function Score () {
  const [tabValue, setTabValue] = useState<string | number>('0')
  const swiperRef = useRef(null)

  const [isVisible, setIsVisible] = useState(false)
  const [date, setDate] = useState(currentDate())
  const days = useMemo(() => {
    return ['', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
  }, [])
  const [dateWeek, setDateWeek] = useState(() => {
    return days[new Date().getDay()]
  })

  const [scoreList, setScoreList] = useState([])
  const openSwitch = () => {
    setIsVisible(true)
  }

  const closeSwitch = () => {
    setIsVisible(false)
  }

  const setChooseValue = (param: string) => {
    setDate(param[3])
    setDateWeek(param[4])
  }

  const select = (param: string) => {
    console.log(param)
  }
  const changeSwiper = (current: number) => {
    // @ts-ignore
    setTabValue(current.detail?.current)
    // @ts-ignore
  }
  // const apis = ['matchAll', 'matchLive', 'matchSaiCheng', 'matchSaiGuo']
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
    console.log('date', date)
    const matchDate = date.replace(/\//g, '-')
    const params = {
      matchDate
    }
    const result = await getScoreList(apis[tabValue], params)
    console.log(result.data.data)
    setScoreList(result.data.data)
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
      <View className={styles.course}>
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
        <View className={styles.date__tabs}>
          <Swiper
            defaultValue={0}
            loop={false}
            ref={swiperRef}
            height={35}
          >
            <Swiper.Item className={styles.date__tabs__container}>
              {/*<View className={styles.date__tabs__container__item}>*/}
              {/*  <View className={styles.date__tabs__container__item__date}>04/17</View>*/}
              {/*  <View className={styles.date__tabs__container__item__week}>星期二</View>*/}
              {/*</View>*/}
              {/*<View className={styles.date__tabs__container__item}>*/}
              {/*  <Text className={styles.date__tabs__container__item__date}>04/17</Text>*/}
              {/*  <Text className={styles.date__tabs__container__item__week}>星期三</Text>*/}
              {/*</View>*/}
              {/*<View className={styles.date__tabs__container__item}>*/}
              {/*  <Text className={styles.date__tabs__container__item__date}>04/17</Text>*/}
              {/*  <Text className={styles.date__tabs__container__item__week}>星期四</Text>*/}
              {/*</View>*/}
              {/*<View className={styles.date__tabs__container__item}>*/}
              {/*  <Text className={styles.date__tabs__container__item__date}>04/17</Text>*/}
              {/*  <Text className={styles.date__tabs__container__item__week}>星期五</Text>*/}
              {/*</View>*/}
              <View className={styles.date__tabs__container__item} onClick={openSwitch}>
                {date}&emsp;{dateWeek}
                {/*<Text className={styles.date__tabs__container__item__date}>{date}</Text>*/}
                {/*<Text className={styles.date__tabs__container__item__week}>{dateWeek}</Text>*/}
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
                <View className={styles.outer}>
                  {
                    scoreList.length > 0 &&
                    scoreList.map(scoreItem => (
                      <View className={styles.item} key={scoreItem.matchId}>
                        <View className={styles.item__top}>
                          <View className={styles.item__top__left}>
                            <Text className={styles.item__top__left__name}>{scoreItem.matchTypeName}</Text>
                            <Text className={styles.item__top__left__time}>{scoreItem.startTime.slice(-8,-3)}</Text>
                          </View>
                          <Text>{
                            scoreItem.state === 1 ?
                              '未开赛' : scoreItem.state === 4 ?
                                '进行中' : '完'
                          }</Text>
                        </View>
                        <View className={styles.item__lineup}>
                          <View></View>
                          <View className={styles.item__lineup__title}>
                            <Text className={styles.item__lineup__title__name}>{scoreItem.homeName}</Text>
                            <Text className={styles.item__lineup__title__score}>{scoreItem.homeScore[0]}-{scoreItem.awayScore[0]}</Text>
                            <Text className={styles.item__lineup__title__name}>{scoreItem.awayName}</Text>
                          </View>
                          {
                            tabValue === 3
                            &&
                            <View className={styles.item__lineup__result}>
                              <Text className={styles.item__lineup__result__txt}>{scoreItem.aiResult === 0 ? '否' : '中'}</Text>
                              <ArrowRight size={10} color='#999' />
                            </View>
                          }
                        </View>
                        <View className={styles.item__bottom}>
                          <Text className={styles.item__bottom__left}>{scoreItem.matchLotteryOne}</Text>
                          <Text>半：{scoreItem.homeScore[2]}-{scoreItem.awayScore[2]} 角：{scoreItem.homeScore[4]}-{scoreItem.awayScore[4]}</Text>
                        </View>
                      </View>
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
