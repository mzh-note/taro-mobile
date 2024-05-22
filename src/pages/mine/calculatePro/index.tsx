import Taro from '@tarojs/taro';
import {Empty, Button, Input} from '@nutui/nutui-react-taro';
import {View, Text, Image, ScrollView} from '@tarojs/components';
import {useEffect, useState} from 'react';
import {addSuggest, calculatorList} from '@/http/api';
import styles from './index.module.less'

export default function CalculatePro() {
  const [loading, setLoading] = useState(false)
  const [list, setList] = useState<any>([])
  const [cost, setCost] = useState(1)
  const [selectMatch, setSelectMatch] = useState({})
  const [active, setActive] = useState({})

  useEffect(() => {
    const fn = async () => {
      setLoading(true)
      const res = await calculatorList()
      const result = res?.data?.data.map(item => {
        item.time = item.startTime.slice(5, -3).replace(/T/, ' ')
        item.title = item.matchLotteryOne.slice(0, 2) + ' ' + item.startTime.slice(0, 10)
        return item
      })
      const newResult = result.reduce((acc, obj) => {
        const category = obj.title
        acc[category] = acc[category] || []
        acc[category].push(obj)
        return acc
      }, {})
      const newList: any = []
      for (let key in newResult) {
        newList.push({
          name: key,
          lists: newResult[key]
        })
      }
      setList(newList)
      setLoading(false)
    }
    fn()
  }, []);

  const selectItem = (time, item, forecast) => {
    const keys = Object.keys(selectMatch)
    let curr = {...selectMatch}
    if (keys.indexOf(time) === -1) {
      curr = {}
    }
    if (keys.length > 1) {
      delete curr[keys[0]]
    }
    if (curr[time]) {
      if (curr[time].matchId === item.matchId) {
        const newMatch = {
          [time]: {
            ...curr[time],
            matchId: item.matchId,
            forecast: forecast
          }
        }
        updateDate(newMatch, time)
      } else if (curr[time].matchId2 === item.matchId) {
        const newMatch = {
          [time]: {
            ...curr[time],
            matchId2: item.matchId,
            forecast2: forecast
          }
        }
        updateDate(newMatch, time)
      } else if (curr[time].matchId2 === 0) {
        if (curr[time].matchId === item.matchId) {
          const newMatch = {
            [time]: {
              matchId: item.matchId,
              forecast: forecast,
              matchId2: 0,
              forecast2: 0
            }
          }
          updateDate(newMatch, time)
        } else {
          const newMatch = {
            [time]: {
              ...curr[time],
              matchId2: item.matchId,
              forecast2: forecast
            }
          }
          updateDate(newMatch, time)
        }
      } else {
        const newMatch = {
          [time]: {
            matchId: item.matchId,
            forecast: forecast,
            matchId2: curr[time].matchId,
            forecast2: curr[time].forecast
          }
        }
        updateDate(newMatch, time)
      }
    } else {
      const newMatch = {
        [time]: {
          matchId: item.matchId,
          forecast: forecast,
          matchId2: 0,
          forecast2: 0
        }
      }
      updateDate(newMatch, time)
    }
  }
  const updateDate = (newMatch, time) => {
    setActive(newMatch[time])
    setSelectMatch(newMatch)
  }
  const calculate = async () => {
    const keys = Object.keys(selectMatch)
    if (keys.length === 0) {
      Taro.showToast({
        icon: 'none',
        title: '请选择方案'
      })
      return
    }
    if (cost < 1) {
      Taro.showToast({
        icon: 'none',
        title: '请输入币'
      })
      return
    }
    const data = {
      ...selectMatch[keys[0]],
      cost
    }
    await addSuggest(data)
    Taro.showToast({
      icon: 'none',
      title: '保存成功'
    })
    setSelectMatch([])
    setActive({})
    setCost(1)
  }
  return (
    <View className={styles['calculate-pro']}>
      <ScrollView scrollY className={styles['calculate-pro__scroll']}>
        <View className={styles['calculate-pro__scroll__container']}>
        {
          list.length > 0 &&
          list.map(item => (
            <View className={styles['calculate-pro__list']} key={item}>
              <View className={styles['calculate-pro__list__title']}>{item.name} {item.lists.length}场</View>
              {
                item.lists.map(item2 => (
                  <>
                    <View className={styles['calculate-pro__list__top']}>
                      <Text className={styles['calculate-pro__list__top__date']}>{item2?.matchLotteryOne}</Text>
                      <Text className={styles['calculate-pro__list__top__time']}>{item2.time}</Text>
                      <Text className={styles['calculate-pro__list__top__team']}>{item2.matchTypeName}</Text>
                    </View>
                    <View className={styles['calculate-pro__list__item']}>
                      <View className={styles['calculate-pro__list__item__name']}>
                        <Text className={styles['calculate-pro__list__item__name__text']}>{item2?.homeName}</Text>
                        <Image
                          className={styles['calculate-pro__list__item__name__logo']}
                          src={`https://images.weserv.nl/?url=${item2?.homeLogo}`}
                          mode='aspectFit'
                        />
                      </View>
                      <View className={styles['calculate-pro__list__item__vs']}>VS</View>
                      <View className={styles['calculate-pro__list__item__name']}>
                        <Image
                          className={styles['calculate-pro__list__item__name__logo']}
                          src={`https://images.weserv.nl/?url=${item2?.awayLogo}`}
                          mode='aspectFill'
                        />
                        <Text className={styles['calculate-pro__list__item__name__text']}>{item2?.awayName}</Text>
                      </View>
                    </View>
                    <View className={styles['calculate-pro__list__odds']}>
                      <View className={styles['calculate-pro__list__odds__left']}>
                        <View className={styles['calculate-pro__list__odds__left__score']}>{item2?.rateList[0]}</View>
                        <View className={styles['calculate-pro__list__odds__left__score']}>{item2?.rateList[4] || '/'}</View>
                      </View>
                      <View className={styles['calculate-pro__list__odds__right']}>
                        <View className={styles['calculate-pro__list__odds__right__up']}>
                          <View
                            onClick={() => selectItem(item.name, item2, 1)}
                            className={`
                              ${styles['calculate-pro__list__odds__right__text']}
                              ${(active?.matchId === item2.matchId && active?.forecast === 1 || active?.matchId2 === item2.matchId && active?.forecast2 === 1) ?
                              `${styles['calculate-pro__list__odds__right__text_active']}` : ''}
                            `}
                          >
                            胜 {item2?.rateList[1]}
                          </View>
                          <View
                            onClick={() => selectItem(item.name, item2, 2)}
                            className={`
                              ${styles['calculate-pro__list__odds__right__text']}
                              ${(active?.matchId === item2.matchId && active?.forecast === 2 || active?.matchId2 === item2.matchId && active?.forecast2 === 2) ?
                              `${styles['calculate-pro__list__odds__right__text_active']}` : ''}
                            `}
                          >
                            平 {item2?.rateList[2]}
                          </View>
                          <View
                            onClick={() => selectItem(item.name, item2, 3)}
                            className={`
                              ${styles['calculate-pro__list__odds__right__text']}
                              ${(active?.matchId === item2.matchId && active?.forecast === 3 || active?.matchId2 === item2.matchId && active?.forecast2 === 3) ?
                              `${styles['calculate-pro__list__odds__right__text_active']}` : ''}
                            `}
                          >
                            负 {item2?.rateList[3]}
                          </View>
                        </View>
                        <View className={styles['calculate-pro__list__odds__right__down']}>
                          <View
                            onClick={() => selectItem(item.name, item2, 5)}
                            className={`
                              ${styles['calculate-pro__list__odds__right__text']}
                              ${(active?.matchId === item2.matchId && active?.forecast === 5 || active?.matchId2 === item2.matchId && active?.forecast2 === 5) ?
                              `${styles['calculate-pro__list__odds__right__text_active']}` : ''}
                            `}
                          >
                            胜 {item2?.rateList[5]}
                          </View>
                          <View
                            onClick={() => selectItem(item.name, item2, 6)}
                            className={`
                              ${styles['calculate-pro__list__odds__right__text']}
                              ${(active?.matchId === item2.matchId && active?.forecast === 6 || active?.matchId2 === item2.matchId && active?.forecast2 === 6) ?
                              `${styles['calculate-pro__list__odds__right__text_active']}` : ''}
                            `}
                          >
                            平 {item2?.rateList[6]}
                          </View>
                          <View
                            onClick={() => selectItem(item.name, item2, 7)}
                            className={`
                              ${styles['calculate-pro__list__odds__right__text']}
                              ${(active?.matchId === item2.matchId && active?.forecast === 7 || active?.matchId2 === item2.matchId && active?.forecast2 === 7) ?
                              `${styles['calculate-pro__list__odds__right__text_active']}` : ''}
                            `}
                          >
                            负 {item2?.rateList[7]}
                          </View>
                        </View>
                      </View>
                    </View>
                  </>
                ))
              }
            </View>
          ))
        }
        {
          !loading &&
          list.length === 0 &&
          <View className={styles['calculate-pro__list']}>
            <Empty description='暂无数据' size='small' />
          </View>
        }
        </View>
      </ScrollView>
      <View className={styles['calculate-pro__fix']}>
        <View className={styles['calculate-pro__fix__submit']}>
            <View className={styles['calculate-pro__fix__submit__left']}>
              <Input
                value={cost}
                className={styles['calculate-pro__fix__submit__left__input']}
                type='number'
                onChange={(val) => setCost(val)}
              />
              <div className={styles['calculate-pro__fix__submit__left__unit']}>币</div>
            </View>
            <View className={styles['calculate-pro__fix__submit__right']}>
              <Button type='primary' onClick={calculate}>保存选择</Button>
            </View>
        </View>
      </View>
    </View>
  )
}
