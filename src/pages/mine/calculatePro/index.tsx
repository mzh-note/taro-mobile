import { InputNumber , Empty, Button } from '@nutui/nutui-react-taro';
import {View, Text, Image, ScrollView} from '@tarojs/components';
import { useState } from 'react';
import styles from './index.module.less'

export default function CalculatePro() {
  const [list, setList] = useState([1,2,3,4,5,6])
  const [amount, setAmount] = useState(1)
  const calculate = () => {
    console.log(amount)
  }
  return (
    <View className={styles['calculate-pro']}>
      <ScrollView scrollY className={styles['calculate-pro__scroll']}>
        {
          list.length > 0 &&
          list.map(item => (
            <View className={styles['calculate-pro__list']} key={item}>
              <View className={styles['calculate-pro__list__title']}>周六 05月17日 1场</View>
              <View className={styles['calculate-pro__list__item']}>
                <Text className={styles['calculate-pro__list__item__date']}>周六 015</Text>
                <Text className={styles['calculate-pro__list__item__time']}>05/18 13:34</Text>
                <Text className={styles['calculate-pro__list__item__team']}>意甲</Text>
              </View>
              <View className={styles['calculate-pro__list__item']}>
                <View className={styles['calculate-pro__list__item__name']}>
                    <Text className={styles['calculate-pro__list__item__name__text']}>博尔特</Text>
                    <Image
                      className={styles['calculate-pro__list__item__name__logo']}
                      src="https://storage.360buyimg.com/imgtools/e067cd5b69-07c864c0-dd02-11ed-8b2c-d7f58b17086a.png"
                      mode='aspectFit'
                    />
                </View>
                <View className={styles['calculate-pro__list__item__vs']}>VS</View>
                <View className={styles['calculate-pro__list__item__name']}>
                    <Image
                      className={styles['calculate-pro__list__item__name__logo']}
                    src="https://storage.360buyimg.com/imgtools/e067cd5b69-07c864c0-dd02-11ed-8b2c-d7f58b17086a.png"
                      mode='aspectFill'
                    />
                    <Text className={styles['calculate-pro__list__item__name__text']}>博尔特</Text>
                </View>
              </View>
              <View className={styles['calculate-pro__list__odds']}>
                <View className={styles['calculate-pro__list__odds__left']}>
                    <View className={styles['calculate-pro__list__odds__left__score']}>0</View>
                    <View className={styles['calculate-pro__list__odds__left__score']}>-1</View>           
                </View>
                <View className={styles['calculate-pro__list__odds__right']}>
                  
                <View className={styles['calculate-pro__list__odds__right__up']}>
                    <View className={styles['calculate-pro__list__odds__right__text']}>胜 1.67</View>
                    <View className={styles['calculate-pro__list__odds__right__text']}>平 3.45</View>
                    <View className={styles['calculate-pro__list__odds__right__text']}>平 3.45</View>
                  </View>
                  <View className={styles['calculate-pro__list__odds__right__down']}>
                    <View className={styles['calculate-pro__list__odds__right__text']}>胜 1.67</View>
                    <View className={styles['calculate-pro__list__odds__right__text']}>平 3.45</View>
                    <View className={styles['calculate-pro__list__odds__right__text']}>平 3.45</View>
                  </View>
                </View>
              </View>
            </View>
          ))
        }
        {
          // list.length === 0 &&
          <View className={styles['calculate-pro__list']}>
            <Empty description='暂无数据' size='small' />
          </View>
        }
      </ScrollView>
      <View className={styles['calculate-pro__fix']}>
        <View className={styles['calculate-pro__fix__item']}>
          <Text className={styles['calculate-pro__fix__item__text']}>已选10个</Text>
          <View className={styles['calculate-pro__fix__item__input']}>
            <Text className={styles['calculate-pro__fix__item__input__text']}>倍数:</Text>
            <InputNumber
              className={styles['calculate-pro__fix__item__input__number']}
              defaultValue={1}
              readOnly
              value={amount}
              onChange={(amount) => setAmount(amount)}
            />
          </View>
        </View>
        <View className={styles['calculate-pro__fix__submit']}>
            <View className={styles['calculate-pro__fix__submit__left']}>
              <Text className={styles['calculate-pro__fix__submit__left__text']}>
                <Text className={styles['calculate-pro__red']}>{amount}</Text>注
                <Text className={styles['calculate-pro__red']}>12</Text>元
              </Text>
              <Text className={styles['calculate-pro__fix__submit__left__text']}>预计奖金
                <Text className={styles['calculate-pro__red']}>1</Text>元
              </Text>
            </View>
            <View className={styles['calculate-pro__fix__submit__right']}>
              <Button type='primary' onClick={calculate}>保存选择</Button>
            </View>
        </View>
      </View>
    </View>
  )
}
