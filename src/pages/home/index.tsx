import Taro from '@tarojs/taro';
import {useState} from 'react'
import {Image, RichText, Text, View} from '@tarojs/components';
import { Input, Button } from '@nutui/nutui-react-taro'

import {getMatchId} from '@/http/api';

import logo from '../../assets/logo.png'
import styles from './index.module.less'

export default function Home() {
  const [code, setCode] = useState('')
  const prediction = async () => {
    // if (code.length === 0) {
    //   Taro.showToast({
    //     title: '请输入赛事编号',
    //     icon: 'none'
    //   })
    //   return
    // }
    // Taro.showToast({
    //   title: '即将预测的编号为' + code,
    //   icon: 'none'
    // })
    const res = await getMatchId({code: ''})
    setCode('')
    if (res?.data?.data?.matchId) {
      Taro.navigateTo({
        url: '/pages/home/detail/index?id=' + res.data.data.matchId
      })
    } else {
      Taro.showToast({
        icon: 'none',
        title: '当前无可查赛事详情'
      })
    }
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
