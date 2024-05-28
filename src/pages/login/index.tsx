import AboutList from '@/pages/mine/components/AboutList';
import useShareApp from '@/hooks/useShareApp';
import Taro, {useDidShow} from '@tarojs/taro';

export default function Login () {
  useShareApp()

  useDidShow(() => {
    Taro.hideHomeButton()
  });

  return <AboutList />
}
