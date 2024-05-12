import {View} from "@tarojs/components";
import Header from '@/components/Header'
import {Button, Sticky} from '@nutui/nutui-react-taro';

import styles from './index.module.less'

export default function Score () {
  return (
    <>
      <Header />
      <View className={styles.score}>
        <Sticky
          threshold={150}
        >
          <Button type='primary'>吸顶</Button>
        </Sticky>
        <View style={{height: '150px'}}>11</View>
        <View style={{height: '150px'}}>11</View>
        <View style={{height: '150px'}}>11</View>
        <View style={{height: '150px'}}>11</View>
        <View style={{height: '150px'}}>11</View>
        <View style={{height: '150px'}}>11</View>
      </View>
    </>
  )
}
