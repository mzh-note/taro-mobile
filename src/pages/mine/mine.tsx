import AboutList from '@/pages/mine/components/AboutList';
import useShareApp from '@/hooks/useShareApp';

export default function Mine () {
  useShareApp()
  return <AboutList />
}
