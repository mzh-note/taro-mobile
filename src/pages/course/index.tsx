import { ScrollView } from '@tarojs/components';
import Header from '@/components/Header';
import MyAttention from '@/components/MyAttention';
import useShareApp from '@/hooks/useShareApp';

import styles from './index.module.less'

export default function Course() {
  useShareApp()
  return (
    <>
      <Header />
      <ScrollView
        scrollY
        className={styles.course}
      >
        <MyAttention />
      </ScrollView>
    </>
  )
}
