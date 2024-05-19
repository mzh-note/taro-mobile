import {Image, Text, View} from '@tarojs/components';
import like from '@/assets/like.png';
import like_active from '@/assets/like_active.png';
import {favoriteAddMatch, favoriteDelMatch} from '@/http/api';
import Taro from '@tarojs/taro';
import {useAppDispatch} from '@/store/hooks';
import {setScore} from '@/store/modules/scoreReducer';

import styles from './index.module.less'

export default function HotLiItem (props) {
  const item = props.item
  const dispatch = useAppDispatch()
  const toAddMatch = async (selectItem) => {
    if (!selectItem.matchId) {
      return false
    }
    if (selectItem.favorite_state === 0) {
      const res = await favoriteAddMatch({matchId: selectItem.matchId})
      if (res?.data?.status === 0) {
        Taro.showToast({
          icon: 'none',
          title: '收藏成功'
        })
        props.updateParent(selectItem.matchId, 1)
        dispatch(setScore({
          matchId: selectItem.matchId,
          state: 1
        }))
      }
    } else {
      const res = await favoriteDelMatch({matchId: selectItem.matchId})
      if (res?.data?.status === 0) {
        Taro.showToast({
          icon: 'none',
          title: '取消收藏成功'
        })
        props.updateParent(selectItem.matchId, 0)
        dispatch(setScore({
          matchId: selectItem.matchId,
          state: 0
        }))
      }
    }
  }
  return (
    <>
      <View className={styles.hot__li}>
        <View className={styles.hot__detail}>
          <View className={styles.hot__country}>
            <Image
              className={styles.hot__img}
              src={`https://images.weserv.nl/?url=${item?.homeLogo}`}
              mode='aspectFit'
            />
            <Text className={styles.hot__name}>{item?.homeName}</Text>
          </View>
          <View className={styles.hot__score}>{item?.homeScore[0]} : {item?.awayScore[0]}</View>
          <View className={styles.hot__country}>
            <Image
              className={styles.hot__img}
              src={`https://images.weserv.nl/?url=${item?.awayLogo}`}
              mode='aspectFit'
            />
            <Text className={styles.hot__name}>{item?.awayName}</Text>
          </View>
        </View>
        <View className={styles.hot__progress}>
          <View className={styles.hot__percent}>
            {item?.totalHome}&emsp;{item?.totalAway}&emsp;{item?.totalDraw}
          </View>
          <View className={styles.hot__part}>
            <Text className={styles.hot__part__p1} style={{width: item?.totalHome}}></Text>
            <Text className={styles.hot__part__p2} style={{width: item?.totalAway}}></Text>
            <Text className={styles.hot__part__p3}></Text>
          </View>
        </View>
        <View className={styles.hot__note}>
          <Text className={styles.hot__time}>{item?.startTime?.slice(0, 19)}</Text>
          <Image
            className={styles.hot__like}
            src={`${item?.favorite_state === 0 ? like : like_active}`}
            mode='aspectFit'
            onClick={() => toAddMatch(item)}
          />
        </View>
      </View>
    </>
  )
}
