import { Button } from "@nutui/nutui-react-taro"
import { View } from "@tarojs/components"
import Taro from "@tarojs/taro"
import styles from './mine.module.less'

export default function Mine() {

  const logout = () => {
    Taro.redirectTo({
      url: '/pages/login/index'
    })
  }
  return (
    <>
      <View className={styles.mine}>
        <View className={styles.logout}>
          <Button className={styles.btn} type="primary" onClick={logout}>退出登录</Button>
        </View>
      </View>
    </>
  )
}
