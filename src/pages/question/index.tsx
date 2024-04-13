import { View, Text, Image } from "@tarojs/components"
import Taro, { usePullDownRefresh, useReachBottom } from "@tarojs/taro"
import { useEffect, useState } from "react"
import { getArticles } from '@/http/api'
import styles from './index.module.less'

type ListType = {
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
export default function Question() {
  const [list, setList] = useState<ListType[]>([])

  useEffect(() => {
    // 页面加载时触发
    getArticlesList()
  }, [])
  usePullDownRefresh(() => {
    console.log("下拉刷新")
    getArticlesList()
  })
  useReachBottom(() => {
    console.log('触底加载数据')
    getArticlesList(true)
  })

  const getArticlesList = async (loadMore?: boolean) => {
    const params = {
      channel_id: 2,
      timestamp: new Date().getTime(),
      with_top: 1
    }
    const res = await getArticles(params)
    if (loadMore) {
      setList([...list, ...res.data.data.results])
    } else {
      setList(res.data.data.results)
      Taro.stopPullDownRefresh()
    }
  }
  return (
    <>
      <View className={styles.question}>
        {
          list.map((item, index) => (
            <View className={styles.article} key={index}>
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
                    item.cover.images.map((i, j) => <Image className={styles.img} src={i} key={j} />)
                  }
                </View>
              }
              <View className={styles['info-box']}>
                <Text className={styles.item}>{item.aut_name}</Text>
                <Text className={styles.item}>{item.comm_count}评论</Text>
                <Text className={styles.item}>{item.pubdate}</Text>
              </View>
            </View>
          ))
        }
      </View>
    </>
  )
}
