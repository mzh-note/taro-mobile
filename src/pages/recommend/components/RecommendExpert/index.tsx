import {Image, Text, View} from "@tarojs/components";
import like from "@/assets/like.png";
import styles from './index.module.less';

export default function RecommendExpert () {
  const list = [1,2,3,4,5,6,7,8]
  return (
    <>
      <View className={styles.expert__list}>
        {
          list.map(item => (
            <View key={item} className={styles.expert__list__li}>
              <Image className={styles.expert__list__img} src='https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png' mode='aspectFit' />
              <Text className={styles.expert__list__name}>小李飞刀</Text>
              <Text className={styles.expert__list__num}>5连红</Text>
            </View>
          ))
        }
      </View>
      <View className={styles.hot__title}>热门赛事</View>
      <View className={styles.hot__li}>
        <View className={styles.hot__detail}>
          <View className={styles.hot__country}>
            <Image
              className={styles.hot__img}
              src='https://storage.360buyimg.com/imgtools/e067cd5b69-07c864c0-dd02-11ed-8b2c-d7f58b17086a.png'
              mode='aspectFill'
            />
            <Text className={styles.hot__name}>圣路易斯竞技</Text>
          </View>
          <View className={styles.hot__score}>1:5</View>
          <View className={styles.hot__country}>
            <Image
              className={styles.hot__img}
              src='https://storage.360buyimg.com/imgtools/e067cd5b69-07c864c0-dd02-11ed-8b2c-d7f58b17086a.png'
              mode='aspectFill'
            />
            <Text className={styles.hot__name}>托卢卡</Text>
          </View>
        </View>
        <View className={styles.hot__progress}>
          <View className={styles.hot__percent}>26%&emsp;27%&emsp;48%</View>
          <View className={styles.hot__part}>
            <Text className={styles.hot__part__p1} style={{width: '30%'}}></Text>
            <Text className={styles.hot__part__p2} style={{width: '30%'}}></Text>
            <Text className={styles.hot__part__p3}></Text>
          </View>
        </View>
        <View className={styles.hot__note}>
          <Text className={styles.hot__time}>2024-04-20 11:00:00</Text>
          <Image className={styles.hot__like} src={like} mode='aspectFit' />
        </View>
      </View>
      <View className={styles.hot__li}>
        <View className={styles.hot__detail}>
          <View className={styles.hot__country}>
            <Image
              className={styles.hot__img}
              src='https://storage.360buyimg.com/imgtools/e067cd5b69-07c864c0-dd02-11ed-8b2c-d7f58b17086a.png'
              mode='aspectFill'
            />
            <Text className={styles.hot__name}>圣路易斯竞技</Text>
          </View>
          <View className={styles.hot__score}>1:5</View>
          <View className={styles.hot__country}>
            <Image
              className={styles.hot__img}
              src='https://storage.360buyimg.com/imgtools/e067cd5b69-07c864c0-dd02-11ed-8b2c-d7f58b17086a.png'
              mode='aspectFill'
            />
            <Text className={styles.hot__name}>托卢卡</Text>
          </View>
        </View>
        <View className={styles.hot__progress}>
          <View className={styles.hot__percent}>26%&emsp;27%&emsp;48%</View>
          <View className={styles.hot__part}>
            <Text className={styles.hot__part__p1} style={{width: '30%'}}></Text>
            <Text className={styles.hot__part__p2} style={{width: '30%'}}></Text>
            <Text className={styles.hot__part__p3}></Text>
          </View>
        </View>
        <View className={styles.hot__note}>
          <Text className={styles.hot__time}>2024-04-20 11:00:00</Text>
          <Image className={styles.hot__like} src={like} mode='aspectFit' />
        </View>
      </View>
    </>
  )
}
