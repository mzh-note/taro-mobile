import {Image, Video, View} from "@tarojs/components";
import styles from './index.module.less'
import logo from '../../assets/logo.png'

export default function Header () {
  return (
    <View className={styles.header}>
      <Image className={styles.header__img} src={logo} mode='aspectFit' />

      {/*<Video*/}
      {/*  className={styles.header__img}*/}
      {/*  src={`${process.env.TARO_APP_BASEURL}/images/4.mp4`}*/}
      {/*  initialTime={0}*/}
      {/*  controls={false}*/}
      {/*  autoplay*/}
      {/*  loop*/}
      {/*  muted*/}
      {/*  showProgress={false}*/}
      {/*  showFullscreenBtn={false}*/}
      {/*  showPlayBtn={false}*/}
      {/*  showCenterPlayBtn={false}*/}
      {/*  enableProgressGesture={false}*/}
      {/*  showBottomProgress={false}*/}
      {/*  vslideGesture={false}*/}
      {/*/>*/}
    </View>
  )
}
