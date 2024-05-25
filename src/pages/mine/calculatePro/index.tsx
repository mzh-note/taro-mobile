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
  const [selectMatch, setSelectMatch] = useState<any>([])

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

  const selectItem = (item, forecast) => {
    let newList = [...selectMatch]
    let existItem = newList.filter(currItem => {
      return currItem?.matchId === item.matchId && currItem?.forecast === forecast
    })
    if (existItem.length > 0) {
      // 当前选项已存在，则剔除
      const arr = newList.filter(currItem => {
        return !(currItem?.matchId === item.matchId && currItem?.forecast === forecast)
      })
      setSelectMatch(arr)
      return false
    }
    // 不存在，继续添加
    const newType = forecast > 4 ? 2 : 1 // 1: 上半部分选择，2: 下半部分选择，上下只能选其一
    let type = 0
    newList.forEach(currItem => {
      if (currItem.matchId === item.matchId) {
        type = currItem.type
      }
    })
    if (type !== 0 && type !== newType) {
      Taro.showToast({
        icon: 'none',
        title: '选择多种玩法，需重新开一单进行选择'
      })
      return false
    }
    const arr = newList.filter(currItem => {
      return currItem?.matchId === item.matchId
    })
    if (arr.length === 2) {
      console.log('同一行最多选2个')
      return false
    }
    newList.push({
      type: newType,
      matchId: item.matchId,
      forecast: forecast
    })
    let keys = newList.map(item => item.matchId)
    keys = [...new Set(keys)]
    if (keys.length > 2) {
      Taro.showToast({
        icon: 'none',
        title: '最多选择2场比赛'
      })
      return false
    }
    setSelectMatch([...newList])
  }
  const calculate = async () => {
    if (selectMatch.length === 0) {
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
    const suggestList = selectMatch.map(item => {
      return {
        matchId: item.matchId,
        forecast: item.forecast
      }
    })
    const data = {
      suggestList,
      cost
    }
    const res = await addSuggest(data)
    if (res?.statusCode != 200) {
      Taro.showToast({
        icon: 'none',
        title: '保存失败'
      })
      return false
    }
    Taro.showToast({
      icon: 'none',
      title: '保存成功'
    })
    setTimeout(() => {
      Taro.switchTab({
        url: '/pages/mine/mine'
      })
    }, 1000)
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
                            onClick={() => selectItem(item2, 1)}
                            className={`
                              ${styles['calculate-pro__list__odds__right__text']}
                              ${selectMatch.filter(currItem => currItem?.matchId === item2.matchId && currItem?.forecast === 1).length > 0 ?
                              styles['calculate-pro__list__odds__right__text_active'] : ''}
                            `}
                          >
                            胜 {item2?.rateList[1]}
                          </View>
                          <View
                            onClick={() => selectItem(item2, 2)}
                            className={`
                              ${styles['calculate-pro__list__odds__right__text']}
                              ${selectMatch.filter(currItem => currItem?.matchId === item2.matchId && currItem?.forecast === 2).length > 0 ?
                              styles['calculate-pro__list__odds__right__text_active'] : ''}
                            `}
                          >
                            平 {item2?.rateList[2]}
                          </View>
                          <View
                            onClick={() => selectItem(item2, 3)}
                            className={`
                              ${styles['calculate-pro__list__odds__right__text']}
                              ${selectMatch.filter(currItem => currItem?.matchId === item2.matchId && currItem?.forecast === 3).length > 0 ?
                              styles['calculate-pro__list__odds__right__text_active'] : ''}
                            `}
                          >
                            负 {item2?.rateList[3]}
                          </View>
                        </View>
                        <View className={styles['calculate-pro__list__odds__right__down']}>
                          <View
                            onClick={() => selectItem(item2, 5)}
                            className={`
                              ${styles['calculate-pro__list__odds__right__text']}
                              ${selectMatch.filter(currItem => currItem?.matchId === item2.matchId && currItem?.forecast === 5).length > 0 ?
                              styles['calculate-pro__list__odds__right__text_active'] : ''}
                            `}
                          >
                            胜 {item2?.rateList[5]}
                          </View>
                          <View
                            onClick={() => selectItem(item2, 6)}
                            className={`
                              ${styles['calculate-pro__list__odds__right__text']}
                              ${selectMatch.filter(currItem => currItem?.matchId === item2.matchId && currItem?.forecast === 6).length > 0 ?
                              styles['calculate-pro__list__odds__right__text_active'] : ''}
                            `}
                          >
                            平 {item2?.rateList[6]}
                          </View>
                          <View
                            onClick={() => selectItem(item2, 7)}
                            className={`
                              ${styles['calculate-pro__list__odds__right__text']}
                              ${selectMatch.filter(currItem => currItem?.matchId === item2.matchId && currItem?.forecast === 7).length > 0 ?
                              styles['calculate-pro__list__odds__right__text_active'] : ''}
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
