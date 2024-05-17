import {Image, View} from "@tarojs/components";

import styles from './index.module.less'
import logo from '../../assets/logo.png'

export default function Header () {
  return (
    <View className={styles.header}>
        {/*<Image className={styles.header__img} src={logo} mode='aspectFit' />*/}
    </View>
  )
}
