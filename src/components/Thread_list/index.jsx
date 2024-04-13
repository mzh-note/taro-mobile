import { View, Text } from '@tarojs/components'
import { useReady } from '@tarojs/taro'
import styles from './index.module.less'

export default function Thread_list({threads}) {
  useReady(() => {
    console.log('threads', threads)
  })
  return (
    <>
      <View className={styles.list}>
        {
          threads.map(thread => (
            <View className={styles['list-item']} key={thread.id}>{thread.name}</View>
          ))
        }
      </View>
    </>
  )
}
