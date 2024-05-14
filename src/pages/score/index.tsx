import {ScrollView, View} from '@tarojs/components';
import Header from '@/components/Header'
import {Tabs, Swiper, Calendar} from '@nutui/nutui-react-taro';
import {useRef, useState} from 'react';

import styles from './index.module.less'

export default function Score () {
  const [tab1value, setTab1value] = useState<string | number>('0')
  const swiperRef = useRef(null)
  const d = new Date()
  const currDay = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
  const [date, setDate] = useState(currDay)
  const [isVisible, setIsVisible] = useState(false)
  const [dateWeek, setDateWeek] = useState('')

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
  const list = [
    'https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg',
    'https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg',
    'https://storage.360buyimg.com/jdc-article/welcomenutui.jpg',
    'https://storage.360buyimg.com/jdc-article/fristfabu.jpg',
    'https://storage.360buyimg.com/jdc-article/welcomenutui.jpg',
  ]
  const changeSwiper = (current: number) => {
    // @ts-ignore
    setTab1value(current.detail?.current)
    // @ts-ignore
    console.log(`切换到了${current.detail?.current}`)
  }
  return (
    <>
      <Header />
      <View className={styles.score}>
        <Tabs
          className={styles.tabs}
          value={tab1value}
          onChange={(value) => {
            // @ts-ignore
            swiperRef?.current?.to(value)
            setTab1value(value)
          }}
        >
          <Tabs.TabPane title='全部'></Tabs.TabPane>
          <Tabs.TabPane title='进行中'></Tabs.TabPane>
          <Tabs.TabPane title='赛程'></Tabs.TabPane>
          <Tabs.TabPane title='赛果'></Tabs.TabPane>
          <Tabs.TabPane title='关注'></Tabs.TabPane>
        </Tabs>
        <View className={styles.date__tabs} onClick={openSwitch}>
          {date ? `${date} ${dateWeek}` : '请选择'}
11      </View>
        <Calendar visible={isVisible} showTitle={false} defaultValue={date} onClose={closeSwitch} onConfirm={setChooseValue} onDayClick={select} />
        <Swiper
          className='score-swiper'
          ref={swiperRef}
          loop={false}
          defaultValue={0}
          onChange={changeSwiper}
        >
          {list.map((item) => (
            <Swiper.Item key={item} className='score-swiper-item'>
              <ScrollView
                enhanced
                showScrollbar={false}
                scrollY
                style={{height: '100%'}}
              >
                <View style={{height: '200px'}}>222</View>
                <View style={{height: '200px'}}>333</View>
                <View style={{height: '200px'}}>444</View>
                <View style={{height: '200px'}}>555</View>
                <View style={{height: '200px'}}>666</View>
              </ScrollView>
            </Swiper.Item>
          ))}
        </Swiper>
      </View>
    </>
  )
}
