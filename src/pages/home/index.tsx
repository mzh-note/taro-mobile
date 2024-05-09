import Taro from '@tarojs/taro';
import {useState} from 'react'
import {Image, RichText, Text, View} from '@tarojs/components';
import { Input, Button } from '@nutui/nutui-react-taro'

import styles from './index.module.less'

import logo from '../../assets/logo.png'

export default function Home() {
  const [code, setCode] = useState('')
  const prediction = () => {
    Taro.showToast({
      title: '即将预测的编号为' + code,
      icon: 'none'
    })
    setCode('')
  }
  return (
    <View className={styles.home}>
      <View className={styles.home__logo}>
        <Image className={styles.img__logo} mode='aspectFit' src={logo} />
      </View>
      <View className={styles.search__form}>
        <div className={styles.search__input}>
          <Input type='number' style={{'--nutui-input-color': '#333'}}
            className={styles.input}
            placeholder='输入竞彩赛事编号如025'
            value={code}
            onChange={setCode}
          />
          <Button className={styles.search__button} onClick={prediction}>
            <RichText nodes='预测<br />一下'></RichText>
          </Button>
        </div>
        <Text>*本次推荐仅作测试参考之用，并不构成购彩建议。</Text>
        <Text>一切互联网彩票均属违法，请到线下彩站购买。</Text>
      </View>
    </View>
  )
}
