import {useAppSelector} from '@/store/hooks';
import Taro, {useLoad, useShareAppMessage, useShareTimeline} from '@tarojs/taro';

// 分享朋友、朋友圈
export default function useShareApp () {
  const userInfo = useAppSelector(state => state.user.user)
  const app = Taro.getApp()
  useLoad(() => {
    // console.log('useLoad')
    Taro.showShareMenu({
      withShareTicket: true,
      showShareItems: ['shareAppMessage', 'shareTimeline'],
      // success: function (res) {
      //   console.log('showShareMenu', res)
      // }
    })
  })
  useShareAppMessage((res) => {
    console.log('当前分享url', `/pages/login/index?inviteCode=${userInfo.inviteCode}`)
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    } else if (res.from === 'menu') {
      // 来自底部的分享转发按钮
      // console.log(res)
    }
    app.isPreviewShare = true
    return {
      title: '百宝AI足球预测',
      path: `/pages/login/index?inviteCode=${userInfo.inviteCode}`,
    }
  })
  useShareTimeline(() => {
    app.isPreviewShare = true
    return {
      title: '百宝AI足球预测',
      path: `/pages/login/index?inviteCode=${userInfo.inviteCode}`,
    }
  })
}
