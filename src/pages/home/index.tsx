import { useEffect, useState } from 'react'
import { Text, View, ScrollView, Image } from "@tarojs/components";
import Taro, {useLoad, useReady} from '@tarojs/taro'
import { Loading } from '@nutui/nutui-react-taro';
// import Thread_list from '../../components/Thread_list/index';

import { getChannels, getArticles } from '@/http/api'
import styles from './index.module.less'


type ThreadsType = {
  id: number,
  name: string,
}
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

export default function Home() {
  const [channelid, setChannelid] = useState<number | null>(null)
  const [threads, setThreads] = useState<ThreadsType[]>([])
  const [articles, setArticles] = useState<ArticleItemType[]>([])
  const [hasmore, setHasmore] = useState(false)
  // console.log(Taro.getStorageSync('id'), articles)
  // console.log(process.env.TARO_ENV)
  let [refresherTriggered, setRefresherTriggered] = useState(false)
  useEffect(() => {
    getThreads()
  }, []);
  useEffect(() => {
    if (channelid !== null) {
      getArticlesList()
    }
  }, [channelid])

  useEffect(() => {
    if (hasmore) {
      console.log('触底加载更多')
      getArticlesList(true)
    }
  }, [hasmore])

  useEffect(() => {
    if (threads.length > 0) {
      setChannelid(threads[0]?.id)
    }
  }, [threads])

  const getThreads = async () => {
    Taro.showLoading()
    const res = await getChannels()
    Taro.hideLoading()
    setThreads(res.data.data.channels)
  }
  const getArticlesList = async (loadMore?: boolean) => {
    const params = {
      channel_id: channelid,
      timestamp: new Date().getTime(),
      with_top: 1
    }
    if (!loadMore) {
      Taro.showLoading()
    }
    const res = await getArticles(params)
    Taro.hideLoading()
    if (loadMore) {
      setArticles([...articles, ...res.data.data.results])
      setHasmore(false)
    } else {
      setArticles(res.data.data.results)
      setRefresherTriggered(false)
    }
  }

  const onRefresherRefresh = () => {
    console.log('下拉刷新')
    if (refresherTriggered) {
      return
    }
    // 手动调整刷新状态
    setRefresherTriggered(true)
    getArticlesList();
  }
  useLoad(() => {
    console.log('home Page loaded.')
  });

  useReady(() => {
    console.log('home Page ready.')
  });

  return (
    <>
      <View className={styles.header}>
        <View className={styles.tabs}>
          <ScrollView className={styles['album-tabs']} scrollX>
            {
              threads.map(item => (
                <View
                  key={item.id}
                  className={`${styles['tab-item']} ${channelid === item.id ? styles.active : ''}`}
                  onClick={() => setChannelid(item.id)}
                >
                  <Text>{item.name}</Text>
                </View>
              ))
            }
          </ScrollView>
        </View>
      </View>
      <ScrollView
        scrollY
        enablePassive
        refresherEnabled
        refresherTriggered={refresherTriggered}
        onRefresherRefresh={onRefresherRefresh}
        onScrollToLower={() => setHasmore(true)}
        className={`${styles.container} ${process.env.TARO_ENV === 'weapp' ? styles['weapp-container']:''}`}
      >
        {
          articles.map((item, index) => (
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
                    item.cover?.images.map((i, index) => <Image className={styles.img} src={i} key={index}/>)
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
        {
          hasmore
          &&
          <View className={styles.more}><Loading>加载更多</Loading></View>
        }
      </ScrollView>
    </>
  )
}
