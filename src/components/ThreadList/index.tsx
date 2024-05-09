import {Image, Text, View} from '@tarojs/components'
import Taro, { useReady } from '@tarojs/taro'
import styles from './index.module.less'

type ArticleItemType = {
  art_id: string,
  aut_name: string,
  pubdate: string,
  title: string,
  comm_count: number,
  cover: {
    images: any[],
    type: number
  }
}
type PropType = {
  item: ArticleItemType
}
export default function ThreadList({item}: PropType) {
  useReady(() => {
    console.log('threads', item)
  })
  // 跳转到详情页
  const goDetail = () => {
    Taro.navigateTo({
      url: `/pages/detail/index?art_id=${item.art_id}`
    })
  }
  return (
    <>
      <View className={styles.article} onClick={goDetail}>
        <View className={`${styles['article-title']} ${item.cover.type === 1 ? styles['article-flex'] : ''}`}>
          <Text className={styles.title}>{item.title}</Text>
          {
            item.cover.type === 1 &&
            <Text className={styles['r-img']}>
              <Image className={styles.img} src={item.cover.images[0]} />
            </Text>
          }
        </View>

        {
          item.cover.type > 1 &&
          <View className={styles.imgs}>
            {
              item.cover?.images.map((i, j) => <Image className={styles.img} src={i} key={j} />)
            }
          </View>
        }
        <View className={styles['info-box']}>
          <Text className={styles.item}>{item.aut_name}</Text>
          <Text className={styles.item}>{item.comm_count}评论</Text>
          <Text className={styles.item}>{item.pubdate}</Text>
        </View>
      </View>
    </>
  )
}
