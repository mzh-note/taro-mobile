import {View, Image, Text} from '@tarojs/components';
import styles from './index.module.less'
import defaultIcon from '@/assets/default-icon.png'
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
    </View>
  )
}
