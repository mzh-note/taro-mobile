import { PropsWithChildren } from 'react'
import { useDidHide, useDidShow, useError, useLaunch } from '@tarojs/taro'
import '@nutui/nutui-react-taro/dist/style.css'
import './app.less'

function App({ children }: PropsWithChildren<any>) {

  useLaunch(() => {
    console.log('App launched.')
  })

  useDidShow(() => {
    console.log('App did show.')
  })

  useDidHide(() => {
    console.log('App did hide.')
  })

  useError(() => {
    console.log('App error.')
  })
  // children 是将要会渲染的页面
  return children
}

export default App
