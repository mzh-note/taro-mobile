import {View} from '@tarojs/components';
import {useState} from 'react';
import Header from '@/components/Header'
import {Button} from '@nutui/nutui-react-taro';
import useShareApp from '@/hooks/useShareApp';
import RecommendExpert from '@/pages/recommend/components/RecommendExpert';

import styles from './index.module.less'

export default function Recommend () {
  useShareApp()
  const [type, setType] = useState(1)
  return (
    <View className={styles.recommend}>
      <Header />
      <View className={styles.recommend_tabs}>
        <View className={styles.tabs}>
          <Button className={`${styles.tabs__item} ${type === 1 ? styles.active : ''}`} onClick={() => setType(1)}>名家推荐</Button>
          <Button className={`${styles.tabs__item} ${type === 2 ? styles.active : ''}`}  onClick={() => setType(2)}>二串专区</Button>
        </View>
      </View>
      <View className={styles.container}>
        {
          type === 1 &&
          <RecommendExpert type={type} />
        }
        {
          type === 2 &&
          <RecommendExpert type={type} />
        }
      </View>
    </View>
  )
}
