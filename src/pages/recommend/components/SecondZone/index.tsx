import {View, Text, Image} from '@tarojs/components';
import styles from './index.module.less'
import {Avatar, Button} from '@nutui/nutui-react-taro';

export default function SecondZone () {
  return (
    <View className={styles.second__zone}>
      <View className={styles.overview}>
        <Avatar className={styles.overview__img}
          size="normal"
          src="https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png"
        />
        <View className={styles.overview__info}>
          <View className={styles.info__author}>小狐仙竞彩</View>
          <View className={styles.info__rate}>
            <Text className={styles.info__rate__connect}>连中8场</Text>
            <Text className={styles.info__rate__hit}>二串一命中率75%</Text>
          </View>
        </View>
        <Button className={styles.info__follow} type='primary' size='small'>关注</Button>
      </View>
      <View className={styles.plan}>
        <View className={styles.plan__detail}>
          <Text className={styles.plan__detail__title}>二串一</Text>
          <Text className={styles.plan__detail__status}>近10命中</Text>
          <View className={styles.plan__detail__li}>
            <Text className={`${styles.plan__detail__item} ${styles.grey}`}>RT</Text>
            <Text className={styles.plan__detail__item}>wr</Text>
            <Text className={styles.plan__detail__item}>RT</Text>
            <Text className={styles.plan__detail__item}>wr</Text>
            <Text className={styles.plan__detail__item}>RT</Text>
            <Text className={styles.plan__detail__item}>wr</Text>
            <Text className={styles.plan__detail__item}>RT</Text>
            <Text className={styles.plan__detail__item}>wr</Text>
            <Text className={styles.plan__detail__item}>RT</Text>
            <Text className={styles.plan__detail__item}>wr</Text>
          </View>
        </View>
        <View className={styles.plan__rate}>
          <Text className={styles.plan__rate__percent}>
            <Text className={styles.plan__rate__percent__count}>125</Text>
            <Text className={styles.plan__rate__percent__unit}>%</Text>
          </Text>
          <Text className={styles.plan__rate__eval}>本场回报率</Text>
        </View>
      </View>
      <View className={styles.course}>
        <View className={styles.course__time}>
          <Text className={styles.course__time__week}>周一001</Text>
          <Text className={styles.course__time__name}>U23亚洲杯</Text>
        </View>
        <View className={styles.course__ball}>
          <View className={styles.course__ball__item}>
            <Text className={styles.course__ball__item__name}>日本U23</Text>
            <Image
              className={styles.course__ball__item__icon}
              src='https://storage.360buyimg.com/imgtools/e067cd5b69-07c864c0-dd02-11ed-8b2c-d7f58b17086a.png'
              mode='aspectFill' />
          </View>
          <View className={styles.course__ball__vs}>VS</View>
          <View className={styles.course__ball__item}>
            <Image
              className={styles.course__ball__item__icon}
              src='https://storage.360buyimg.com/imgtools/e067cd5b69-07c864c0-dd02-11ed-8b2c-d7f58b17086a.png'
              mode='aspectFill' />
            <Text className={styles.course__ball__item__name}>日本U23</Text>
          </View>
        </View>
        <View className={styles.course__score}>
          <View className={styles.course__score__left}>
            <View className={styles.course__score__left__res}>胜平负</View>
          </View>
          <View className={styles.course__score__right}>负(1.65)</View>
        </View>
      </View>
      <View className={styles.course}>
        <View className={styles.course__time}>
          <Text className={styles.course__time__week}>周一001</Text>
          <Text className={styles.course__time__name}>U23亚洲杯</Text>
        </View>
        <View className={styles.course__ball}>
          <View className={styles.course__ball__item}>
            <Text className={styles.course__ball__item__name}>日本U23</Text>
            <Image
              className={styles.course__ball__item__icon}
              src='https://storage.360buyimg.com/imgtools/e067cd5b69-07c864c0-dd02-11ed-8b2c-d7f58b17086a.png'
              mode='aspectFill' />
          </View>
          <View className={styles.course__ball__vs}>VS</View>
          <View className={styles.course__ball__item}>
            <Image
              className={styles.course__ball__item__icon}
              src='https://storage.360buyimg.com/imgtools/e067cd5b69-07c864c0-dd02-11ed-8b2c-d7f58b17086a.png'
              mode='aspectFill' />
            <Text className={styles.course__ball__item__name}>日本U23</Text>
          </View>
        </View>
        <View className={styles.course__score}>
          <View className={styles.course__score__left}>
            <View className={styles.course__score__left__res}>让球</View>
            <View className={styles.course__score__left__res}>-1</View>
          </View>
          <View className={styles.course__score__right}>负(1.65)</View>
        </View>

        <View className={styles.course__time}>
          <Text className={styles.course__time__week}>周一001</Text>
          <Text className={styles.course__time__name}>U23亚洲杯</Text>
        </View>
        <View className={styles.course__ball}>
          <View className={styles.course__ball__item}>
            <Text className={styles.course__ball__item__name}>日本U23</Text>
            <Image
              className={styles.course__ball__item__icon}
              src='https://storage.360buyimg.com/imgtools/e067cd5b69-07c864c0-dd02-11ed-8b2c-d7f58b17086a.png'
              mode='aspectFill' />
          </View>
          <View className={styles.course__ball__vs}>VS</View>
          <View className={styles.course__ball__item}>
            <Image
              className={styles.course__ball__item__icon}
              src='https://storage.360buyimg.com/imgtools/e067cd5b69-07c864c0-dd02-11ed-8b2c-d7f58b17086a.png'
              mode='aspectFill' />
            <Text className={styles.course__ball__item__name}>日本U23</Text>
          </View>
        </View>
        <View className={styles.course__score}>
          <View className={styles.course__score__left}>
            <View className={styles.course__score__left__res}>胜平负</View>
          </View>
          <View className={styles.course__score__right}>负(1.65)</View>
        </View>
      </View>
    </View>
  )
}
