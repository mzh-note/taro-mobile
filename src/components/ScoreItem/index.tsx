import { Image, Text, View } from '@tarojs/components';

import { ArrowRight } from '@nutui/icons-react-taro';
import like from '@/assets/like.png';

import {favoriteAddMatch, favoriteDelMatch} from '@/http/api';
import Taro from '@tarojs/taro';
import like_active from '@/assets/like_active.png';
import styles from './index.module.less'

type IScoreItemType = {
  matchId: number,
  matchTypeName: string,
  startTime: string,
  state:number,
  homeName: string,
  homeScore: object,
  awayScore: object,
  awayName: string,
  aiResult: number,
  matchLotteryOne: string
}
export default function ScoreItem(props: {scoreItem: IScoreItemType, tabValue: number | string, updateParent: any}) {
  const {scoreItem, tabValue, updateParent} = props

  const toAddMatch = async (selectItem) => {
    if (!selectItem.matchId) {
      return false
    }
    if (selectItem.favorite_state === 0) {
      const res = await favoriteAddMatch({matchId: selectItem.matchId})
      if (res.data.status === 0) {
        Taro.showToast({
          icon: 'none',
          title: '收藏成功'
        })
      }
      updateParent(selectItem.matchId, 1)
    } else {
      const res = await favoriteDelMatch({matchId: selectItem.matchId})
      if (res.data.status === 0) {
        Taro.showToast({
          icon: 'none',
          title: '取消收藏成功'
        })
        updateParent(selectItem.matchId, 0)
      }
    }
  }

  const viewDetail = (item) => {
    Taro.navigateTo({
      url: '/pages/home/detail/index?id=' + item.matchId
    })
  }
  return (
    <>
      <View className={styles.item}>
        <View className={styles.item__top}>
          <View className={styles.item__top__left}>
            <Text className={styles.item__top__left__name}>{scoreItem.matchTypeName}</Text>
            <Text className={styles.item__top__left__time}>{scoreItem.startTime.slice(11, 16)}</Text>
          </View>
          <Text>{
            scoreItem.state === 1 ?
              '未开赛' : scoreItem.state === 4 ?
                '进行中' : '完'
          }</Text>
        </View>
        <View className={styles.item__lineup}>
          <View className={styles.item__lineup__like}>
            <Image
              className={styles.item__lineup__like__img}
              src={`${scoreItem?.favorite_state === 0 ? like : like_active}`}
              mode='aspectFit'
              onClick={() => toAddMatch(scoreItem)}
            />
          </View>
          <View className={styles.item__lineup__title}>
            <Text className={styles.item__lineup__title__name}>{scoreItem.homeName}</Text>
            <Text className={styles.item__lineup__title__score}>{scoreItem.homeScore[0]}-{scoreItem.awayScore[0]}</Text>
            <Text className={styles.item__lineup__title__name}>{scoreItem.awayName}</Text>
          </View>
          <View className={styles.item__lineup__result} onClick={() => viewDetail(scoreItem)}>
            {
              tabValue === 3 &&
              <Text className={styles.item__lineup__result__txt}>{scoreItem.aiResult === 0 ? '否' : '中'}</Text>
            }
            <ArrowRight size={10} color='#999' />
          </View>
        </View>
        <View className={styles.item__bottom}>
          <Text className={styles.item__bottom__left}>{scoreItem.matchLotteryOne}</Text>
          <Text>半：{scoreItem.homeScore[2]}-{scoreItem.awayScore[2]} 角：{scoreItem.homeScore[4]}-{scoreItem.awayScore[4]}</Text>
        </View>
      </View>
    </>
  )
}
