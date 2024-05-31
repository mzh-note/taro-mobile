import {useTabItemTap} from '@tarojs/taro';
import AboutList from '@/pages/mine/components/AboutList';
import useShareApp from '@/hooks/useShareApp';

export default function Mine () {
  useShareApp()
  useTabItemTap((item) => {
    console.log('切换tabBar', item)
  })
  return <AboutList />
}
