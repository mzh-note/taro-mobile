import {Image, Text, View} from "@tarojs/components";
import {Empty} from '@nutui/nutui-react-taro';
import {useEffect, useState} from 'react';
import {allList, hotMatchList, towList} from '@/http/api';
import like from "@/assets/like.png";
import styles from './index.module.less';
import Taro from '@tarojs/taro';

export default function RecommendExpert (props) {
  const type = props.type
  const [list, setList] = useState([])
  const [hotList, setHotList] = useState([])
  useEffect(() => {
    Taro.showLoading()
    if (type === 1) {
      getAllList().then()
    } else {
      getTowList().then()
    }
    getHotList().then()
  }, [type]);
  const getAllList = async () => {
    const result = await allList()
    setList(result.data.data)
    Taro.hideLoading()
  }
  const getTowList = async () => {
    const result = await towList()
    setList(result.data.data)
    Taro.hideLoading()
  }
  const getHotList = async () => {
    const result = await hotMatchList()
    const data = result.data.data.map(item => {
      const percent = item.totalHome + item.totalAway + item.totalDraw
      item.totalHome = `${item.totalHome / percent * 100}%`
      item.totalAway = `${item.totalAway / percent * 100}%`
      item.totalDraw = `${item.totalDraw / percent * 100}%`
      return item;
    })
    setHotList(data)
    Taro.hideLoading()
  }
  const goDetail = item => {
    Taro.navigateTo({
      url: `/pages/recommend/expertDetail/index?proId=${item.proId}`
    })
  }
  return (
    <>
      <View className={styles.expert__list}>
        {
          list.map(item => (
            <View
              key={item}
              className={styles.expert__list__li}
              onClick={() => goDetail(item)}
            >
              <Image className={styles.expert__list__img} src={`${process.env.TARO_APP_BASEURL}/images/${item.avatar}`} mode='aspectFit' />
              <Text className={styles.expert__list__name}>{item.nickName}</Text>
              <Text className={styles.expert__list__num}>{item.sustainWin}连红</Text>
            </View>
          ))
        }
      </View>
      <View className={styles.hot__title}>热门赛事</View>
      {
        hotList.length > 0 ?
        hotList.map(item => (
          <View className={styles.hot__li} key={item}>
            <View className={styles.hot__detail}>
              <View className={styles.hot__country}>
                <Image
                  className={styles.hot__img}
                  src={`https://images.weserv.nl/?url=${item.homeLogo}`}
                  mode='aspectFill'
                />
                <Text className={styles.hot__name}>{item.homeName}</Text>
              </View>
              <View className={styles.hot__score}>{item.homeScore[0]} : {item.awayScore[0]}</View>
              <View className={styles.hot__country}>
                <Image
                  className={styles.hot__img}
                  src={`https://images.weserv.nl/?url=${item.awayLogo}`}
                  mode='aspectFill'
                />
                <Text className={styles.hot__name}>{item.awayName}</Text>
              </View>
            </View>
            <View className={styles.hot__progress}>
              <View className={styles.hot__percent}>
                {item.totalHome}&emsp;{item.totalAway}&emsp;{item.totalDraw}
              </View>
              <View className={styles.hot__part}>
                <Text className={styles.hot__part__p1} style={{width: item.totalHome}}></Text>
                <Text className={styles.hot__part__p2} style={{width: item.totalAway}}></Text>
                <Text className={styles.hot__part__p3}></Text>
              </View>
            </View>
            <View className={styles.hot__note}>
              <Text className={styles.hot__time}>{item.startTime.replace(/T/, ' ')}</Text>
              <Image className={styles.hot__like} src={like} mode='aspectFit' />
            </View>
          </View>
        ))
          :
          <View className={styles.hot__li}>
            <Empty description='无数据' imageSize={80} />
          </View>
      }
      {/*<View className={styles.hot__li}>*/}
      {/*  <View className={styles.hot__detail}>*/}
      {/*    <View className={styles.hot__country}>*/}
      {/*      <Image*/}
      {/*        className={styles.hot__img}*/}
      {/*        src='https://storage.360buyimg.com/imgtools/e067cd5b69-07c864c0-dd02-11ed-8b2c-d7f58b17086a.png'*/}
      {/*        mode='aspectFill'*/}
      {/*      />*/}
      {/*      <Text className={styles.hot__name}>圣路易斯竞技</Text>*/}
      {/*    </View>*/}
      {/*    <View className={styles.hot__score}>1:5</View>*/}
      {/*    <View className={styles.hot__country}>*/}
      {/*      <Image*/}
      {/*        className={styles.hot__img}*/}
      {/*        src='https://storage.360buyimg.com/imgtools/e067cd5b69-07c864c0-dd02-11ed-8b2c-d7f58b17086a.png'*/}
      {/*        mode='aspectFill'*/}
      {/*      />*/}
      {/*      <Text className={styles.hot__name}>托卢卡</Text>*/}
      {/*    </View>*/}
      {/*  </View>*/}
      {/*  <View className={styles.hot__progress}>*/}
      {/*    <View className={styles.hot__percent}>26%&emsp;27%&emsp;48%</View>*/}
      {/*    <View className={styles.hot__part}>*/}
      {/*      <Text className={styles.hot__part__p1} style={{width: '30%'}}></Text>*/}
      {/*      <Text className={styles.hot__part__p2} style={{width: '30%'}}></Text>*/}
      {/*      <Text className={styles.hot__part__p3}></Text>*/}
      {/*    </View>*/}
      {/*  </View>*/}
      {/*  <View className={styles.hot__note}>*/}
      {/*    <Text className={styles.hot__time}>2024-04-20 11:00:00</Text>*/}
      {/*    <Image className={styles.hot__like} src={like} mode='aspectFit' />*/}
      {/*  </View>*/}
      {/*</View>*/}
      {/*<View className={styles.hot__li}>*/}
      {/*  <View className={styles.hot__detail}>*/}
      {/*    <View className={styles.hot__country}>*/}
      {/*      <Image*/}
      {/*        className={styles.hot__img}*/}
      {/*        src='https://storage.360buyimg.com/imgtools/e067cd5b69-07c864c0-dd02-11ed-8b2c-d7f58b17086a.png'*/}
      {/*        mode='aspectFill'*/}
      {/*      />*/}
      {/*      <Text className={styles.hot__name}>圣路易斯竞技</Text>*/}
      {/*    </View>*/}
      {/*    <View className={styles.hot__score}>1:5</View>*/}
      {/*    <View className={styles.hot__country}>*/}
      {/*      <Image*/}
      {/*        className={styles.hot__img}*/}
      {/*        src='https://storage.360buyimg.com/imgtools/e067cd5b69-07c864c0-dd02-11ed-8b2c-d7f58b17086a.png'*/}
      {/*        mode='aspectFill'*/}
      {/*      />*/}
      {/*      <Text className={styles.hot__name}>托卢卡</Text>*/}
      {/*    </View>*/}
      {/*  </View>*/}
      {/*  <View className={styles.hot__progress}>*/}
      {/*    <View className={styles.hot__percent}>26%&emsp;27%&emsp;48%</View>*/}
      {/*    <View className={styles.hot__part}>*/}
      {/*      <Text className={styles.hot__part__p1} style={{width: '30%'}}></Text>*/}
      {/*      <Text className={styles.hot__part__p2} style={{width: '30%'}}></Text>*/}
      {/*      <Text className={styles.hot__part__p3}></Text>*/}
      {/*    </View>*/}
      {/*  </View>*/}
      {/*  <View className={styles.hot__note}>*/}
      {/*    <Text className={styles.hot__time}>2024-04-20 11:00:00</Text>*/}
      {/*    <Image className={styles.hot__like} src={like} mode='aspectFit' />*/}
      {/*  </View>*/}
      {/*</View>*/}
    </>
  )
}
