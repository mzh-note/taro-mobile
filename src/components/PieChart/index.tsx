import {useEffect, useRef, useState} from 'react';
import { View } from '@tarojs/components';
import { EChart } from 'echarts-taro3-react';
import styles from './index.module.less'

export default function PineChart(props) {
  const { item } = props
  const [chart, _setChart] = useState(null)
  const chartRef = useRef(null)
  useEffect(() => {
    if (item) {
      const data = [
        { value: item.total_home, name: '主' },
        { value: item.total_draw, name: '和' },
        { value: item.total_away, name: '客' }
      ]
      const options = {
        grid: {
          top: '0',
          left: '20%',
          right: '0%',
          bottom: '0',
          containLabel: true
        },
        color: ['#da251c', '#459ee1', '#6bb772'],
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['40%', '55%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
              normal: {
                show: true,
                position: 'center',
                color: '#4c4a4a',
                formatter: '百分比',
              },
              emphasis: {//中间文字显示
                show: true,
              }
            },
            emphasis: {
              label: {
                show: false,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: data
          }
        ]
      };
      chartRef?.current?.refresh(options)
    }
  }, [item, chart]);
  return (
    <View className={styles.pie__chart}>
      <EChart force-use-old-canvas='{{false}}' ref={chartRef} canvasId='pie-canvas' />
    </View>
  );
}
