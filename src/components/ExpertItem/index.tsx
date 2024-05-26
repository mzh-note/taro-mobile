import { Image, Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';

import styles from './index.module.less'

type IItemType = {
  avatar: string,
  nickName: string,
  sustainWin: string,
  proId: number
}

export default function ExpertItem(props: {item: IItemType}) {
  const { item } = props
  const goDetail = (params: IItemType) => {
    Taro.navigateTo({
      url: `/pages/recommend/expertDetail/index?proId=${params.proId}`
    })
  }
  return (
    <>
      <View className={styles.expert__list__li} onClick={() => goDetail(item)}>
        <Image className={styles.expert__list__img} src={`${process.env.TARO_APP_BASEURL}/images/${item.avatar}`} mode='aspectFill' />
        <Text className={styles.expert__list__name}>{item.nickName}</Text>
        <Text className={styles.expert__list__num}>{item.sustainWin}连红</Text>
      </View>
    </>
  )
}
