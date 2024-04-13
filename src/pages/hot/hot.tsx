import { View, Text } from "@tarojs/components";
import styles from './hot.module.less'

export default function Hot() {
  return (
    <>
      <View className={styles.hot}>
        <Text>这是热门页面</Text>
      </View>
    </>
  )
}