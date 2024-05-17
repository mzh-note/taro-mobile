import { ScrollView } from '@tarojs/components';
import Header from '@/components/Header';
import MyAttention from '@/components/MyAttention';

import styles from './index.module.less'

export default function Course() {
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
