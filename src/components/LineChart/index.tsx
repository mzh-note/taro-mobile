import {useEffect, useRef, useState} from 'react';
import { View } from '@tarojs/components';
import { EChart } from 'echarts-taro3-react';
import styles from './index.module.less'

export default function LineChart(props) {
  const { item: pieItem } = props
  const [chart, _setChart] = useState(null)
  const chartRef = useRef(null)
  useEffect(() => {
    const category = pieItem.map(x => x.name)
    const chartData = []
    const chartData2 = []
    const chartData3 = []
    for (let i = 0; i < pieItem.length; i++) {
      // @ts-ignore
      chartData.push(Number(pieItem[i]?.val[0]))
      chartData.push(Number(pieItem[i]?.val[4]))
      chartData2.push(Number(pieItem[i]?.val[1]))
      chartData2.push(Number(pieItem[i]?.val[5]))
      chartData3.push(Number(pieItem[i]?.val[2]))
      chartData3.push(Number(pieItem[i]?.val[6]))
    }
    const options = {
      grid: {
        top: '0',
        left: '0%',
        right: '0%',
        bottom: '0',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: category,
        axisLabel: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: false
        },
        axisTick: {
          show: false // 隐藏y轴的刻度线
        },
        axisLine: {
          show: false
        },
        axisLabel: {
          show: false
        }
      },
      series: [
        {
          data: chartData,
          type: 'line',
          smooth: true,
          symbol: 'none',
          color: '#da251c'
        },
        {
          data: chartData2,
          type: 'line',
          smooth: true,
          symbol: 'none',
          color: '#aaa9a9'
        },
        {
          data: chartData3,
          type: 'line',
          smooth: true,
          symbol: 'none',
          color: '#5f5d5c'
        },
      ],
    };
    chartRef?.current?.refresh(options)
  }, [chart]);
  return (
    <View className={styles.line__chart}>
      <EChart force-use-old-canvas='{{false}}' ref={chartRef} canvasId='line-canvas' />
    </View>
  );
}
