import { View, Text } from '@tarojs/components'
import Taro, { usePullDownRefresh, useReady } from '@tarojs/taro'
import styles from './index.module.less'

export default function Video() {
  useReady(() => {
    console.log('onready')
  })
  usePullDownRefresh(() => {
    console.log('下拉刷新')
    setTimeout(() => {
      Taro.stopPullDownRefresh()
    }, 1000)
  })
  return (
    <>
      <View className={styles.video}>
        视频列表
      </View>
    </>
  )
}
