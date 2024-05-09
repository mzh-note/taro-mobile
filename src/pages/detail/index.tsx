import {View} from "@tarojs/components";
import {useEffect, useRef} from "react";
import Taro, {useLoad, useReachBottom, useReady, useRouter, useUnload} from "@tarojs/taro";
import {Button, Sticky} from "@nutui/nutui-react-taro";
import {getDetail} from "@/http/api";

import styles from './index.module.less'

export default function Detail() {
  const router = useRouter()
  const id = router.params.art_id as string

  const containerRef = useRef(null)
  useLoad(() => {
    console.log('useLoad', id)
    Taro.setNavigationBarTitle({
      title: '手动修改标题详情' + id
    })
    Taro.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#894EEE'
    })
  })
  useEffect(() => {
    console.log('useEffect1', id)
    const fn = async () => {
      const res = await getDetail(id)
      console.log(res.data.data)
    }
    // fn();
  }, [id])

  useReady(() => {
    console.log('useReady可以访问dom节点', id)
  })

  useReachBottom(() => {
    console.log('触底加载更多')
  })
  useUnload(() => {
    console.log('useUnload')
  })
  const onScrollToLower = () => {
    console.log('加载更多')
  }
  return (
    <>
      <View style={{marginTop: '100px',marginBottom: '150px'}}>基础用法</View>
      <Sticky
        threshold={0}
      >
        <Button type='primary'>吸顶</Button>
      </Sticky>
      <View style={{marginTop: '20px',marginBottom: '20px'}}>间隙</View>
      <Sticky
        threshold={120}
      >
        <Button type='primary'>距离顶部120px</Button>
      </Sticky>
      <View style={{height: '800px', backgroundColor: '#ddd'}} ref={containerRef}>
        内容区域
        <Sticky
          container={containerRef}
          threshold={Taro.getEnv() === 'WEB' ? 0 : 0}
        >
          <Button type="info" style={{ marginLeft: '100px' }}>
            内容区域内，吸顶
          </Button>
        </Sticky>
      </View>
      <View style={{height: '100px', padding: '20px', backgroundColor: '#fac'}}>
        <Sticky threshold={0} position='bottom'>
          <Button type='primary'>固定底部内容</Button>
        </Sticky>
      </View>
    </>
  )
}
