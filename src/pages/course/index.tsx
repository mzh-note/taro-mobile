import {View} from '@tarojs/components';

import Header from '@/components/Header'
import styles from './index.module.less'
export default function Course(){
  return (
    <>
      <Header />
      <View className={styles.course}>这是赛程页面</View>
    </>
  )
}
