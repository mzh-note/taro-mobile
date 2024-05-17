import { Image, ScrollView, Text, View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import {useEffect, useState} from 'react';
import {CircleProgress, Progress, Table, Tabs} from '@nutui/nutui-react-taro';
import Header from '@/components/Header';
import LineChart from '@/components/LineChart/LineChart';
import like from '@/assets/like.png';
import styles from './index.module.less'

interface TableColumnProps {
  key: string
  title?: string
  align?: string
  sorter?: ((a: any, b: any) => number) | boolean | string
  render?: (rowData: any, rowIndex: number) => string | React.ReactNode
  fixed?: 'left' | 'right'
  width?: number
}

export default function Detail() {
  const instance = Taro.getCurrentInstance()
  const id = instance?.router?.params?.id
  const [tab1value, setTab1value] = useState<string | number>('0')
  const [columns, _setColumns] = useState<Array<TableColumnProps>>([
    {
      title: 'ID',
      key: 'id',
      render: (_record: any, index) => {
        return index + 1
      },
    },
    {
      title: '姓名',
      key: 'name',
    },
    {
      title: '性别',
      key: 'sex',
      render: (record: any) => {
        return (
          <span style={{ color: record.sex === '女' ? 'blue' : 'green' }}>
            {record.sex}
          </span>
        )
      },
    },
    {
      title: '学历',
      key: 'record',
    },
  ])

  const [table, _setTable] = useState([
    {
      name: 'Tom',
      sex: '男',
      record: '小学',
    },
    {
      name: 'Lucy',
      sex: '女',
      record: '本科',
    },
    {
      name: 'Jack',
      sex: '男',
      record: '高中',
    },
  ])
  useEffect(() => {

  }, []);
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
                src='https://storage.360buyimg.com/imgtools/e067cd5b69-07c864c0-dd02-11ed-8b2c-d7f58b17086a.png'
                mode='aspectFill'
              />
              <Text className={styles.hot__name}>圣路易斯竞技</Text>
            </View>
            <View className={styles.hot__score}>1:5</View>
            <View className={styles.hot__country}>
              <Image
                className={styles.hot__img}
                src='https://storage.360buyimg.com/imgtools/e067cd5b69-07c864c0-dd02-11ed-8b2c-d7f58b17086a.png'
                mode='aspectFill'
              />
              <Text className={styles.hot__name}>托卢卡</Text>
            </View>
          </View>
          <View className={styles.hot__progress}>
            <View className={styles.hot__percent}>26%&emsp;27%&emsp;48%</View>
            <View className={styles.hot__part}>
              <Text className={styles.hot__part__p1} style={{width: '30%'}}></Text>
              <Text className={styles.hot__part__p2} style={{width: '30%'}}></Text>
              <Text className={styles.hot__part__p3}></Text>
            </View>
          </View>
          <View className={styles.hot__note}>
            <Text className={styles.hot__time}>2024-04-20 11:00:00</Text>
            <Image className={styles.hot__like} src={like} mode='aspectFit' />
          </View>
        </View>
        <View className={styles.result}>
          <View className={styles.result__detail}>
            <View className={styles.result__detail__h3}>Ai预测结果：</View>
            <View className={styles.result__detail__res}>让胜</View>
            <View className={styles.result__detail__p}>结合Ai模型预测，专家预<br />测及必发指数的综合信心指数。</View>
            <View className={styles.result__detail__p}>该预测可能会随比赛临近而改变。</View>
          </View>
          <View className={styles.result__chart}>
            <CircleProgress
              key={1}
              percent={80}
              radius={50}
              strokeWidth={10}
              color={{'0%': '#a3221b', '50%': '#a5211b', '100%': '#541c17'}}
            >
              50%
            </CircleProgress>
          </View>
        </View>
        <View className={styles.percent}>
          <View className={styles.percent__rate}>信心指数：
            <Text className={styles.percent__rate__p}>85%</Text>
          </View>
          <View className={styles.percent__win}><Text className={styles.percent__win__tip}></Text>胜概率</View>
        </View>
        <View className={styles.intelligence}>
          <Text className={styles.intelligence__h3}>情报抓取：</Text>
          <ScrollView
            scrollY
            enhanced
            showScrollbar
            className={styles.intelligence__scroll}
          >
            <View className={styles.intelligence__scroll__container}>
              考虑到那不勒斯的防守问题和恩波利在主场的稳健表现，这场比赛恩波利完全有可能给那不勒斯制造麻烦，那不勒斯的进攻依然十分强劲，但防守不稳可能会给恩波利提供机会，指数当下也是徘徊在那不勒斯-0.75，并不牢靠，因此本场着好思波利主场不败。推荐让胜1:12:2
            </View>
          </ScrollView>
        </View>
        <View className={styles.warning}>
          <View className={styles.warning__title}>
            <Text className={styles.warning__title__status}>预警</Text>
            <Text className={styles.warning__title__tip}>重要提示，本场比赛有出下盘爆冷风险。</Text>
          </View>
          <View className={styles.warning__chart}>
            <LineChart />
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
          value={tab1value}
          onChange={(value) => {
            setTab1value(value)
          }}
          activeType='card'
          className={styles.tabs}
        >
          <Tabs.TabPane title='让球'>
            <Table
              striped
              style={{border: 0}}
              columns={columns}
              data={table} bordered={false}
            />
          </Tabs.TabPane>
          <Tabs.TabPane title='胜平负'>
            <Table
              striped
              style={{border: 0}}
              columns={columns}
              data={table}
              bordered={false}
            />
          </Tabs.TabPane>
        </Tabs>
      </ScrollView>
    </View>
  )
}
