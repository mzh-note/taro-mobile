import { Image, ScrollView, Text, View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import {useCallback, useEffect, useState} from 'react';
import {CircleProgress, Progress, Tabs} from '@nutui/nutui-react-taro';
import Header from '@/components/Header';
import LineChart from '@/components/LineChart';
import PineChart from '@/components/PieChart';
import like from '@/assets/like.png';
import {matchInfo} from '@/http/api';
import styles from './index.module.less'

export default function Detail() {
  const instance = Taro.getCurrentInstance()
  const id = instance?.router?.params?.id

  const [detail, setDetail] = useState({})
  const [tab1value, setTab1value] = useState<string | number>('0')
  const [list, setList] = useState([]) //进球
  const [list2, setList2] = useState([]) // 胜平负下半部分
  const [list21, setList21] = useState([]) // 胜平负上半部分
  const [list3, setList3] = useState([]) // 总进球

  const getMatchInfo = useCallback(async () => {
    const res = await matchInfo({matchId: id})
    const result = res?.data?.data
    result.baseInfo.confidence = (result.baseInfo.confidence * 100).toFixed(0)
    result.bf.homeRate = `${(result?.bf?.homeRate * 100).toFixed(0)}%`
    result.bf.drawRate = `${(result?.bf?.drawRate * 100).toFixed(0)}%`
    result.bf.awayRate = `${(result?.bf?.awayRate * 100).toFixed(0)}%`

    // 处理胜平负的数据，计算最高值，最低值，平均值
    result.average = [
      {
        name: '最高值',
        val: []
      },
      {
        name: '最低值',
        val: []
      },
      {
        name: '平均值',
        val: []
      }
    ]
    // 所有胜平负数据
    const total: any[] = Array.from({length: 8}, () => [])
    for (let i = 0; i < total.length; i++) {
      let item: string[] = []
      for (let j = 0; j < result.sf.length; j++) {
        item.push(result?.sf[j]?.val[i] as string)
      }
      total[i].push(item)
    }
    for (let k = 0; k < total.length; k++) {
      result.average[0].val[k] = Math.max.apply(null, total[k][0])
      result.average[1].val[k] = Math.min.apply(null, total[k][0])
      const sum = total[k][0].reduce((prev: string, next: string) => Number(prev) + Number(next))
      result.average[2].val[k] = (sum /total[k][0].length).toFixed(2)
    }
    setDetail(result)
    // 让球
    setList(result.rq)
    // 胜平负
    setList2(result.sf)
    setList21(result.average)
    // 总进球
    setList3(result.zjq)
  },[id])
  useEffect(() => {
    getMatchInfo().then()
  }, [getMatchInfo]);

  return (
    <View className={styles.detail}>
      <Header />
      <ScrollView
        scrollY
        scrollWithAnimation
        className={styles.container}
      >
        <View className={styles.hot__li}>
          <View className={styles.hot__detail}>
            <View className={styles.hot__country}>
              <Image
                className={styles.hot__img}
                src={`https://images.weserv.nl/?url=${detail?.baseInfo?.home_logo}`}
                mode='aspectFit'
              />
              <Text className={styles.hot__name}>{detail?.baseInfo?.home_name}</Text>
            </View>
            <View className={styles.hot__score}>
              {detail?.baseInfo?.home_score} : {detail?.baseInfo?.away_score}
            </View>
            <View className={styles.hot__country}>
              <Image
                className={styles.hot__img}
                src={`https://images.weserv.nl/?url=${detail?.baseInfo?.away_logo}`}
                mode='aspectFit'
              />
              <Text className={styles.hot__name}>{detail?.baseInfo?.away_name}</Text>
            </View>
          </View>
          <View className={styles.hot__progress}>
            <View className={styles.hot__percent}>
              {detail?.bf?.homeRate}&emsp;{detail?.bf?.drawRate}&emsp;{detail?.bf?.awayRate}
            </View>
            <View className={styles.hot__part}>
              <Text className={styles.hot__part__p1} style={{width: detail?.bf?.homeRate}}></Text>
              <Text className={styles.hot__part__p2} style={{width: detail?.bf?.drawRate}}></Text>
              <Text className={styles.hot__part__p3}></Text>
            </View>
          </View>
          <View className={styles.hot__note}>
            <Text className={styles.hot__time}>{detail?.baseInfo?.start_time?.slice(0, 19)}</Text>
            <Image className={styles.hot__like} src={like} mode='aspectFit' />
          </View>
        </View>
        <View className={styles.result}>
          <View className={styles.result__detail}>
            <View className={styles.result__detail__h3}>Ai预测结果：</View>
            <View className={styles.result__detail__res}>
              {detail?.baseInfo?.ai_forecast}
            </View>
            <View className={styles.result__detail__p}>结合Ai模型预测，专家预<br />测及必发指数的综合信心指数。</View>
            <View className={styles.result__detail__p}>该预测可能会随比赛临近而改变。</View>
          </View>
          <View className={styles.result__chart}>
            <CircleProgress
              key={1}
              percent={detail?.baseInfo?.confidence}
              radius={50}
              strokeWidth={10}
              color={{'0%': '#a3221b', '50%': '#a5211b', '100%': '#541c17'}}
            >
              {detail?.baseInfo?.confidence}%
            </CircleProgress>
          </View>
        </View>
        <View className={styles.percent}>
          <View className={styles.percent__rate}>信心指数：
            <Text className={styles.percent__rate__p}>
              {detail?.baseInfo?.confidence}%
            </Text>
          </View>
          <View className={styles.percent__win}><Text className={styles.percent__win__tip}></Text>胜概率</View>
        </View>
        {
          detail?.baseInfo?.intelligence &&
          <View className={styles.intelligence}>
            <Text className={styles.intelligence__h3}>情报抓取：</Text>
            <ScrollView
              scrollY
              enhanced
              showScrollbar
              className={styles.intelligence__scroll}
            >
              <View className={styles.intelligence__scroll__container}>
                {detail?.baseInfo?.intelligence}
              </View>
            </ScrollView>
          </View>
        }
        <View className={styles.warning}>
          {
            detail?.baseInfo?.is_warning !== 0
            &&
            <View className={styles.warning__title}>
              <Text className={styles.warning__title__status}>预警</Text>
              <Text className={styles.warning__title__tip}>重要提示，本场比赛有出下盘爆冷风险。</Text>
            </View>
          }
          <View className={styles.warning__chart}>
            {
              list2.length > 0 &&
              <LineChart item={detail?.sf} />
            }
          </View>
          <View className={styles.warning__chart__legend}>
            <View className={styles.warning__chart__legend__item}>
              <View className={styles.warning__chart__legend__item__progress}>
                <Progress percent={100} color='#da251c' strokeWidth='5' />
              </View>
              <View className={styles.warning__chart__legend__item__txt}>胜赔</View>
            </View>
            <View className={styles.warning__chart__legend__item}>
              <View className={styles.warning__chart__legend__item__progress}>
                <Progress percent={100} color='#aaa9a9' strokeWidth='5' />
              </View>
              <Text className={styles.warning__chart__legend__item__txt}>平赔</Text>
            </View>
            <View className={styles.warning__chart__legend__item}>
              <View className={styles.warning__chart__legend__item__progress}>
                <Progress percent={100} color='#5f5d5c' strokeWidth='5' />
              </View>
              <Text className={styles.warning__chart__legend__item__txt}>负赔</Text>
            </View>
          </View>
          <View className={styles.warning__tips}>
            温馨提示：胜负概率曲线是基于足球大数据AI机器模型自动生成，从而产生预测方向，欺负变化越大，越有可能产生冷门。
          </View>
        </View>
        <Tabs
          autoHeight
          value={tab1value}
          onChange={(value) => {
            setTab1value(value)
          }}
          activeType='card'
          className={styles.tabs}
        >
          <Tabs.TabPane title='让球'>
            <View className={styles.list__header}>
              <View className={styles.list__header__item}>公司</View>
              <View className={styles.list__header__item}>初始</View>
              <View className={styles.list__header__item}>即时</View>
            </View>
            {
              list.map((item, index) => (
                <View className={styles.list__li} key={index}>
                  <Text className={styles.list__li__item}>{item?.name}</Text>
                  <Text className={styles.list__li__item}>{item?.val[0]}</Text>
                  <Text className={styles.list__li__item}>{item?.val[1]}</Text>
                  <Text className={styles.list__li__item}>{item?.val[2]}</Text>
                  <Text className={styles.list__li__item}>{item?.val[4]}</Text>
                  <Text className={styles.list__li__item}>{item?.val[5]}</Text>
                  <Text className={styles.list__li__item}>{item?.val[6]}</Text>
                </View>
              ))
            }
          </Tabs.TabPane>
          <Tabs.TabPane title='胜平负'>
            <View className={styles.spfli__header}>
              <View className={styles.spfli__header__item}></View>
              <View className={styles.spfli__header__item}></View>
              <View className={styles.spfli__header__item}>主胜</View>
              <View className={styles.spfli__header__item}>平局</View>
              <View className={styles.spfli__header__item}>客胜</View>
            </View>
            {
              list21.map((item, index) => (
                <View className={styles.list__li} key={index}>
                  <View className={styles.spfli__li__item}>{item?.name}</View>
                  <View className={styles.spfli__li__item}>
                    <Text className={styles.spfli__li__item__td}>初始</Text>
                    <Text className={styles.spfli__li__item__td}>即时</Text>
                  </View>
                  <View className={styles.spfli__li__item}>
                    <Text className={styles.spfli__li__item__td}>{item?.val[0]}</Text>
                    <Text className={styles.spfli__li__item__td}>{item?.val[4]}</Text>
                  </View>
                  <View className={styles.spfli__li__item}>
                    <Text className={styles.spfli__li__item__td}>{item?.val[1]}</Text>
                    <Text className={styles.spfli__li__item__td}>{item?.val[5]}</Text>
                  </View>
                  <View className={styles.spfli__li__item}>
                    <Text className={styles.spfli__li__item__td}>{item?.val[2]}</Text>
                    <Text className={styles.spfli__li__item__td}>{item?.val[6]}</Text>
                  </View>
                </View>
              ))
            }
            <View className={styles.spfli__header}>
              <View className={styles.spfli__header__item}>公司</View>
              <View className={styles.spfli__header__item}>即时</View>
              <View className={styles.spfli__header__item}>主胜</View>
              <View className={styles.spfli__header__item}>平局</View>
              <View className={styles.spfli__header__item}>客胜</View>
            </View>
            {
              list2.map((item, index) => (
                <View className={`${styles.spfli__li} ${index === 0 ? `${styles.spfli__li_active}` : ''}`} key={index}>
                  <View className={styles.spfli__li__item}>{item?.name}</View>
                  <View className={styles.spfli__li__item}>
                    <Text className={styles.spfli__li__item__td}>初始</Text>
                    <Text className={styles.spfli__li__item__td}>即时</Text>
                  </View>
                  <View className={styles.spfli__li__item}>
                    <Text className={styles.spfli__li__item__td}>{item?.val[0]}</Text>
                    <Text className={styles.spfli__li__item__td}>{item?.val[4]}</Text>
                  </View>
                  <View className={styles.spfli__li__item}>
                    <Text className={styles.spfli__li__item__td}>{item?.val[1]}</Text>
                    <Text className={styles.spfli__li__item__td}>{item?.val[5]}</Text>
                  </View>
                  <View className={styles.spfli__li__item}>
                    <Text className={styles.spfli__li__item__td}>{item?.val[2]}</Text>
                    <Text className={styles.spfli__li__item__td}>{item?.val[6]}</Text>
                  </View>
                </View>
              ))
            }
          </Tabs.TabPane>
          <Tabs.TabPane title='总进球'>
            <View className={styles.list__header}>
              <View className={styles.list__header__item}>公司</View>
              <View className={styles.list__header__item}>初始</View>
              <View className={styles.list__header__item}>即时</View>
            </View>
            {
              list3.map((item, index) => (
                <View className={styles.list__li} key={index}>
                  <Text className={styles.list__li__item}>{item?.name}</Text>
                  <Text className={styles.list__li__item}>{item?.val[0]}</Text>
                  <Text className={styles.list__li__item}>{item?.val[1]}</Text>
                  <Text className={styles.list__li__item}>{item?.val[2]}</Text>
                  <Text className={styles.list__li__item}>{item?.val[4]}</Text>
                  <Text className={styles.list__li__item}>{item?.val[5]}</Text>
                  <Text className={styles.list__li__item}>{item?.val[6]}</Text>
                </View>
              ))
            }
          </Tabs.TabPane>
          <Tabs.TabPane title='必发'>
            <View className={styles.bflist}>
              <View className={styles.bflist__left}>
                <View className={styles.bflist__left__li}>
                  <View className={styles.bflist__left__li__name}>主</View>
                  <View className={styles.bflist__left__li__num}>
                    <Text className={styles.bflist__left__li__num__percent}>{detail?.bf?.homeRate}</Text>
                    <Text className={styles.bflist__left__li__num__count}>{detail?.bf?.total_home}</Text>
                  </View>
                </View>
                <View className={styles.bflist__left__li}>
                  <View className={styles.bflist__left__li__name}>和</View>
                  <View className={styles.bflist__left__li__num}>
                    <Text className={styles.bflist__left__li__num__percent}>{detail?.bf?.drawRate}</Text>
                    <Text className={styles.bflist__left__li__num__count}>{detail?.bf?.total_draw}</Text>
                  </View>
                </View>
                <View className={styles.bflist__left__li}>
                  <View className={styles.bflist__left__li__name}>客</View>
                  <View className={styles.bflist__left__li__num}>
                    <Text className={styles.bflist__left__li__num__percent}>{detail?.bf?.awayRate}</Text>
                    <Text className={styles.bflist__left__li__num__count}>{detail?.bf?.total_away}</Text>
                  </View>
                </View>
              </View>
              <View className={styles.bflist__right}>
                <View className={styles.bflist__right__total}>
                  总数：¥{detail?.bf?.total_home + detail?.bf?.total_draw + detail?.bf?.total_away}
                </View>
                {
                  detail?.bf &&
                  <PineChart item={detail?.bf} />
                }
              </View>
            </View>
            <View className={styles.bflist__table}>
              <View className={styles.bflist__table__tr}>
                <Text className={styles.bflist__table__tr__th}></Text>
                <Text className={styles.bflist__table__tr__th}>奖金</Text>
                <Text className={styles.bflist__table__tr__th}>总数</Text>
              </View>
              <View className={styles.bflist__table__tr}>
                <Text className={styles.bflist__table__tr__td}>主</Text>
                <Text className={styles.bflist__table__tr__td}>{detail?.bf?.detail_home?.price}</Text>
                <Text className={styles.bflist__table__tr__td}>{detail?.bf?.detail_home?.turn_over}</Text>
              </View>
              <View className={styles.bflist__table__tr}>
                <Text className={styles.bflist__table__tr__td}>和</Text>
                <Text className={styles.bflist__table__tr__td}>{detail?.bf?.detail_draw?.price}</Text>
                <Text className={styles.bflist__table__tr__td}>{detail?.bf?.detail_draw?.turn_over}</Text>
              </View>
              <View className={styles.bflist__table__tr}>
                <Text className={styles.bflist__table__tr__td}>客</Text>
                <Text className={styles.bflist__table__tr__td}>{detail?.bf?.detail_away?.price}</Text>
                <Text className={styles.bflist__table__tr__td}>{detail?.bf?.detail_away?.turn_over}</Text>
              </View>
            </View>
          </Tabs.TabPane>
        </Tabs>
      </ScrollView>
    </View>
  )
}
