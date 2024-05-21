import Taro from '@tarojs/taro';
import {Empty, Button, Input} from '@nutui/nutui-react-taro';
import {View, Text, Image, ScrollView} from '@tarojs/components';
import {useEffect, useState} from 'react';
import {calculatorList} from '@/http/api';
import styles from './index.module.less'

export default function CalculatePro() {
  const [list, setList] = useState<any>([])
  const [amount, setAmount] = useState(1)

  useEffect(() => {
    const fn = async () => {
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
      console.log(newList)
    }
    fn()
  }, []);

  const calculate = () => {
    console.log(amount)
    if (amount < 1) {
      Taro.showToast({
        icon: 'none',
        title: '请输入币'
      })
    }
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
                          <View className={styles['calculate-pro__list__odds__right__text']}>胜 {item2?.rateList[1]}</View>
                          <View className={styles['calculate-pro__list__odds__right__text']}>平 {item2?.rateList[2]}</View>
                          <View className={styles['calculate-pro__list__odds__right__text']}>负 {item2?.rateList[3]}</View>
                        </View>
                        <View className={styles['calculate-pro__list__odds__right__down']}>
                          <View className={styles['calculate-pro__list__odds__right__text']}>胜 {item2?.rateList[5]}</View>
                          <View className={styles['calculate-pro__list__odds__right__text']}>平 {item2?.rateList[6]}</View>
                          <View className={styles['calculate-pro__list__odds__right__text']}>负 {item2?.rateList[7]}</View>
                        </View>
                      </View>
                    </View>
                    <View></View>
                  </>
                ))
              }
            </View>
          ))
        }
        {
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
                value={amount}
                className={styles['calculate-pro__fix__submit__left__input']}
                type='number'
                onChange={val => setAmount(val)}
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
