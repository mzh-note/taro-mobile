export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/login/index',
    'pages/mine/mine',
    'pages/question/index',
    'pages/video/index',
    'pages/hot/hot'
  ],
  tabBar: {
    list: [
      {
        iconPath: 'static/tabbar/home.png',
        selectedIconPath: 'static/tabbar/home-active.png',
        pagePath: 'pages/home/index',
        text: '首页'
      },
      {
        iconPath: 'static/tabbar/question.png',
        selectedIconPath: 'static/tabbar/question-active.png',
        pagePath: 'pages/question/index',
        text: '问答'
      },
      {
        iconPath: 'static/tabbar/video.png',
        selectedIconPath: 'static/tabbar/video-active.png',
        pagePath: 'pages/video/index',
        text: '视频'
      },
      {
        iconPath: 'static/tabbar/mine.png',
        selectedIconPath: 'static/tabbar/mine-active.png',
        pagePath: 'pages/mine/mine',
        text: '我的',
      }
    ],
    color: '#999999',
    selectedColor: '#f22222',
    backgroundColor: '#f7f8fa',
    borderStyle: 'white',
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#f5c897',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  lazyCodeLoading: 'requiredComponents' // 微信小程序配置，组件按需加载
})
