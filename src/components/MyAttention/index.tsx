import { View } from '@tarojs/components'

import { Empty } from '@nutui/nutui-react-taro';
import { useState } from 'react';

import ScoreItem from '@/components/ScoreItem';
import ExpertItem from '@/components/ExpertItem';

import styles from './index.module.less'

export default function MyAttention() {
  const tabValue = 3;
  const [scoreList, _setScoreList] = useState([])
  const [list, _setList] = useState([])
  return (
    <View className={styles.my__attention}>
      <View className={styles.my__attention__title}>
        关注比赛
      </View>
      <View className={styles.my__attention__li}>
        {
          scoreList.map((scoreItem: any) => (
            <ScoreItem scoreItem={scoreItem} tabValue={tabValue} key={scoreItem.matchId} />
          ))
        }
        <Empty description='无数据' imageSize={50} />
      </View>
      <View className={styles.my__attention__title}>
        关注专家
      </View>
      <View className={styles.my__attention__li}>
        {
          list.length > 0 &&
          list.map((currItem: any) => (
            <ExpertItem item={currItem} key={currItem.proId} />
          ))
        }
        {
          list.length === 0 && <Empty description='无数据' imageSize={60} />
        }
      </View>
    </View>
  )
}
