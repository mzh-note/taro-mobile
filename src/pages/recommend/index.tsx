import {ScrollView, View} from '@tarojs/components';
import {useRef, useState} from 'react';
import Header from '@/components/Header'
import {Button} from '@nutui/nutui-react-taro';

import RecommendExpert from '@/pages/recommend/components/RecommendExpert';
import SecondZone from '@/pages/recommend/components/SecondZone';

import styles from './index.module.less'

export default function Recommend () {
  const [type, setType] = useState(1)
  return (
    <>
      <Header />
      <ScrollView
        scrollY
        scrollWithAnimation
        className={styles.recommend}
      >
        <View className={styles.tabs}>
          <Button className={`${styles.tabs__item} ${type === 1 ? styles.active : ''}`} onClick={() => setType(1)}>名家推荐</Button>
          <Button className={`${styles.tabs__item} ${type === 2 ? styles.active : ''}`}  onClick={() => setType(2)}>二串专区</Button>
        </View>
        {
          type === 1 &&
          <RecommendExpert />
        }
        {
          type === 2 &&
          <SecondZone />
        }
      </ScrollView>
    </>
  )
}
