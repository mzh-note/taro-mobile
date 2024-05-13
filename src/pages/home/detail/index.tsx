import {Canvas, Image, ScrollView, Text, View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import {useEffect, useState} from 'react';
import {CircleProgress, Progress, Table, Tabs} from '@nutui/nutui-react-taro';
import Header from '@/components/Header';
import {Canvas as FCanvas, Chart, Legend, Axis, Line } from '@antv/f2';
import like from '@/assets/like.png';
import styles from './index.module.less'

interface TableColumnProps {
  key: string
  title?: string
  align?: string
  sorter?: ((a: any, b: any) => number) | boolean | string
  render?: (rowData: any, rowIndex: number) => string | React.ReactNode
  fixed?: 'left' | 'right'
  width?: number
}

export default function Detail() {
  const instance = Taro.getCurrentInstance()
  const id = instance?.router?.params?.id
  const [tab1value, setTab1value] = useState<string | number>('0')
  const [columns, setColumns] = useState<Array<TableColumnProps>>([
    {
      title: 'ID',
      key: 'id',
      render: (record: any, index) => {
        return index + 1
      },
    },
    {
      title: '姓名',
      key: 'name',
    },
    {
      title: '性别',
      key: 'sex',
      render: (record: any) => {
        return (
          <span style={{ color: record.sex === '女' ? 'blue' : 'green' }}>
            {record.sex}
          </span>
        )
      },
    },
    {
      title: '学历',
      key: 'record',
    },
  ])

  const [table, setTable] = useState([
    {
      name: 'Tom',
      sex: '男',
      record: '小学',
    },
    {
      name: 'Lucy',
      sex: '女',
      record: '本科',
    },
    {
      name: 'Jack',
      sex: '男',
      record: '高中',
    },
  ])

  useEffect(() => {
    // console.log(id)
    const ctx = Taro.createCanvasContext('myCanvas')
    console.log(ctx?.ctx)
    // F2 对数据源格式的要求，仅仅是 JSON 数组，数组的每个元素是一个标准 JSON 对象。
    const data = [
        {
          "date": "2010-01-10",
          "type": "能源",
          "value": 99.9
        },
        {
          "date": "2010-01-10",
          "type": "金属",
          "value": 96.6
        },
        {
          "date": "2010-01-10",
          "type": "农副产品",
          "value": 96.2
        },
        {
          "date": "2010-02-10",
          "type": "能源",
          "value": 96.7
        },
        {
          "date": "2010-02-10",
          "type": "金属",
          "value": 91.1
        },
        {
          "date": "2010-02-10",
          "type": "农副产品",
          "value": 93.4
        },
        {
          "date": "2010-03-10",
          "type": "能源",
          "value": 100.2
        },
        {
          "date": "2010-03-10",
          "type": "金属",
          "value": 99.4
        },
        {
          "date": "2010-03-10",
          "type": "农副产品",
          "value": 91.7
        },
        {
          "date": "2010-04-10",
          "type": "能源",
          "value": 104.7
        },
        {
          "date": "2010-04-10",
          "type": "金属",
          "value": 108.1
        },
        {
          "date": "2010-04-10",
          "type": "农副产品",
          "value": 93.1
        },
        {
          "date": "2010-05-10",
          "type": "能源",
          "value": 95.6
        },
        {
          "date": "2010-05-10",
          "type": "金属",
          "value": 96
        },
        {
          "date": "2010-05-10",
          "type": "农副产品",
          "value": 92.3
        },
        {
          "date": "2010-06-10",
          "type": "能源",
          "value": 95.6
        },
        {
          "date": "2010-06-10",
          "type": "金属",
          "value": 89.1
        },
        {
          "date": "2010-06-10",
          "type": "农副产品",
          "value": 92.5
        },
        {
          "date": "2010-07-10",
          "type": "能源",
          "value": 95.3
        },
        {
          "date": "2010-07-10",
          "type": "金属",
          "value": 89.2
        },
        {
          "date": "2010-07-10",
          "type": "农副产品",
          "value": 95.7
        },
        {
          "date": "2010-08-10",
          "type": "能源",
          "value": 96.1
        },
        {
          "date": "2010-08-10",
          "type": "金属",
          "value": 97.6
        },
        {
          "date": "2010-08-10",
          "type": "农副产品",
          "value": 99.9
        },
        {
          "date": "2010-09-10",
          "type": "能源",
          "value": 96.1
        },
        {
          "date": "2010-09-10",
          "type": "金属",
          "value": 100.6
        },
        {
          "date": "2010-09-10",
          "type": "农副产品",
          "value": 103.8
        },
        {
          "date": "2010-10-10",
          "type": "能源",
          "value": 101.6
        },
        {
          "date": "2010-10-10",
          "type": "金属",
          "value": 108.3
        },
        {
          "date": "2010-10-10",
          "type": "农副产品",
          "value": 108.9
        },
        {
          "date": "2010-11-10",
          "type": "能源",
          "value": 105.6
        },
        {
          "date": "2010-11-10",
          "type": "金属",
          "value": 109.4
        },
        {
          "date": "2010-11-10",
          "type": "农副产品",
          "value": 113.7
        },
        {
          "date": "2010-12-10",
          "type": "能源",
          "value": 112.7
        },
        {
          "date": "2010-12-10",
          "type": "金属",
          "value": 114.5
        },
        {
          "date": "2010-12-10",
          "type": "农副产品",
          "value": 118.8
        },
        {
          "date": "2011-01-11",
          "type": "能源",
          "value": 117
        },
        {
          "date": "2011-01-11",
          "type": "金属",
          "value": 120.8
        },
        {
          "date": "2011-01-11",
          "type": "农副产品",
          "value": 124.3
        },
        {
          "date": "2011-02-11",
          "type": "能源",
          "value": 121.8
        },
        {
          "date": "2011-02-11",
          "type": "金属",
          "value": 125.8
        },
        {
          "date": "2011-02-11",
          "type": "农副产品",
          "value": 130.1
        },
        {
          "date": "2011-03-11",
          "type": "能源",
          "value": 133.1
        },
        {
          "date": "2011-03-11",
          "type": "金属",
          "value": 121.4
        },
        {
          "date": "2011-03-11",
          "type": "农副产品",
          "value": 125.8
        },
        {
          "date": "2011-04-11",
          "type": "能源",
          "value": 141.9
        },
        {
          "date": "2011-04-11",
          "type": "金属",
          "value": 124.3
        },
        {
          "date": "2011-04-11",
          "type": "农副产品",
          "value": 127.4
        },
        {
          "date": "2011-05-11",
          "type": "能源",
          "value": 133.1
        },
        {
          "date": "2011-05-11",
          "type": "金属",
          "value": 118.5
        },
        {
          "date": "2011-05-11",
          "type": "农副产品",
          "value": 123.9
        },
        {
          "date": "2011-06-11",
          "type": "能源",
          "value": 131.2
        },
        {
          "date": "2011-06-11",
          "type": "金属",
          "value": 117
        },
        {
          "date": "2011-06-11",
          "type": "农副产品",
          "value": 123.2
        },
        {
          "date": "2011-07-11",
          "type": "能源",
          "value": 133.7
        },
        {
          "date": "2011-07-11",
          "type": "金属",
          "value": 121
        },
        {
          "date": "2011-07-11",
          "type": "农副产品",
          "value": 122.6
        },
        {
          "date": "2011-08-11",
          "type": "能源",
          "value": 125.2
        },
        {
          "date": "2011-08-11",
          "type": "金属",
          "value": 114.8
        },
        {
          "date": "2011-08-11",
          "type": "农副产品",
          "value": 123.2
        },
        {
          "date": "2011-09-11",
          "type": "能源",
          "value": 125.5
        },
        {
          "date": "2011-09-11",
          "type": "金属",
          "value": 109.1
        },
        {
          "date": "2011-09-11",
          "type": "农副产品",
          "value": 121.6
        },
        {
          "date": "2011-10-11",
          "type": "能源",
          "value": 124.2
        },
        {
          "date": "2011-10-11",
          "type": "金属",
          "value": 98.4
        },
        {
          "date": "2011-10-11",
          "type": "农副产品",
          "value": 115.6
        },
        {
          "date": "2011-11-11",
          "type": "能源",
          "value": 129.4
        },
        {
          "date": "2011-11-11",
          "type": "金属",
          "value": 95.8
        },
        {
          "date": "2011-11-11",
          "type": "农副产品",
          "value": 112.2
        },
        {
          "date": "2011-12-11",
          "type": "能源",
          "value": 128
        },
        {
          "date": "2011-12-11",
          "type": "金属",
          "value": 95.1
        },
        {
          "date": "2011-12-11",
          "type": "农副产品",
          "value": 109.1
        },
        {
          "date": "2012-01-12",
          "type": "能源",
          "value": 130.6
        },
        {
          "date": "2012-01-12",
          "type": "金属",
          "value": 100.5
        },
        {
          "date": "2012-01-12",
          "type": "农副产品",
          "value": 111
        },
        {
          "date": "2012-02-12",
          "type": "能源",
          "value": 136.2
        },
        {
          "date": "2012-02-12",
          "type": "金属",
          "value": 104
        },
        {
          "date": "2012-02-12",
          "type": "农副产品",
          "value": 113.4
        },
        {
          "date": "2012-03-12",
          "type": "能源",
          "value": 141.2
        },
        {
          "date": "2012-03-12",
          "type": "金属",
          "value": 103.5
        },
        {
          "date": "2012-03-12",
          "type": "农副产品",
          "value": 114.6
        },
        {
          "date": "2012-04-12",
          "type": "能源",
          "value": 136.1
        },
        {
          "date": "2012-04-12",
          "type": "金属",
          "value": 101
        },
        {
          "date": "2012-04-12",
          "type": "农副产品",
          "value": 114.8
        },
        {
          "date": "2012-05-12",
          "type": "能源",
          "value": 126.3
        },
        {
          "date": "2012-05-12",
          "type": "金属",
          "value": 96.6
        },
        {
          "date": "2012-05-12",
          "type": "农副产品",
          "value": 113.1
        },
        {
          "date": "2012-06-12",
          "type": "能源",
          "value": 111.5
        },
        {
          "date": "2012-06-12",
          "type": "金属",
          "value": 91.6
        },
        {
          "date": "2012-06-12",
          "type": "农副产品",
          "value": 110.7
        },
        {
          "date": "2012-07-12",
          "type": "能源",
          "value": 118.6
        },
        {
          "date": "2012-07-12",
          "type": "金属",
          "value": 91.2
        },
        {
          "date": "2012-07-12",
          "type": "农副产品",
          "value": 118.7
        },
        {
          "date": "2012-08-12",
          "type": "能源",
          "value": 127.7
        },
        {
          "date": "2012-08-12",
          "type": "金属",
          "value": 87.7
        },
        {
          "date": "2012-08-12",
          "type": "农副产品",
          "value": 118.6
        },
        {
          "date": "2012-09-12",
          "type": "能源",
          "value": 128.5
        },
        {
          "date": "2012-09-12",
          "type": "金属",
          "value": 93.6
        },
        {
          "date": "2012-09-12",
          "type": "农副产品",
          "value": 118.5
        },
        {
          "date": "2012-10-12",
          "type": "能源",
          "value": 125.9
        },
        {
          "date": "2012-10-12",
          "type": "金属",
          "value": 94
        },
        {
          "date": "2012-10-12",
          "type": "农副产品",
          "value": 115.2
        },
        {
          "date": "2012-11-12",
          "type": "能源",
          "value": 124.1
        },
        {
          "date": "2012-11-12",
          "type": "金属",
          "value": 92.4
        },
        {
          "date": "2012-11-12",
          "type": "农副产品",
          "value": 113
        },
        {
          "date": "2012-12-12",
          "type": "能源",
          "value": 124.2
        },
        {
          "date": "2012-12-12",
          "type": "金属",
          "value": 97.4
        },
        {
          "date": "2012-12-12",
          "type": "农副产品",
          "value": 112.4
        },
        {
          "date": "2013-01-13",
          "type": "能源",
          "value": 128.4
        },
        {
          "date": "2013-01-13",
          "type": "金属",
          "value": 100.3
        },
        {
          "date": "2013-01-13",
          "type": "农副产品",
          "value": 111.5
        },
        {
          "date": "2013-02-13",
          "type": "能源",
          "value": 131.2
        },
        {
          "date": "2013-02-13",
          "type": "金属",
          "value": 101.3
        },
        {
          "date": "2013-02-13",
          "type": "农副产品",
          "value": 110.4
        },
        {
          "date": "2013-03-13",
          "type": "能源",
          "value": 126.2
        },
        {
          "date": "2013-03-13",
          "type": "金属",
          "value": 94.5
        },
        {
          "date": "2013-03-13",
          "type": "农副产品",
          "value": 108.4
        },
        {
          "date": "2013-04-13",
          "type": "能源",
          "value": 123.1
        },
        {
          "date": "2013-04-13",
          "type": "金属",
          "value": 90.7
        },
        {
          "date": "2013-04-13",
          "type": "农副产品",
          "value": 106
        },
        {
          "date": "2013-05-13",
          "type": "能源",
          "value": 123.2
        },
        {
          "date": "2013-05-13",
          "type": "金属",
          "value": 88.3
        },
        {
          "date": "2013-05-13",
          "type": "农副产品",
          "value": 108.1
        },
        {
          "date": "2013-06-13",
          "type": "能源",
          "value": 122.9
        },
        {
          "date": "2013-06-13",
          "type": "金属",
          "value": 85.4
        },
        {
          "date": "2013-06-13",
          "type": "农副产品",
          "value": 107.7
        },
        {
          "date": "2013-07-13",
          "type": "能源",
          "value": 128.1
        },
        {
          "date": "2013-07-13",
          "type": "金属",
          "value": 85.7
        },
        {
          "date": "2013-07-13",
          "type": "农副产品",
          "value": 105.6
        },
        {
          "date": "2013-08-13",
          "type": "能源",
          "value": 130.9
        },
        {
          "date": "2013-08-13",
          "type": "金属",
          "value": 89.6
        },
        {
          "date": "2013-08-13",
          "type": "农副产品",
          "value": 103.8
        },
        {
          "date": "2013-09-13",
          "type": "能源",
          "value": 131.6
        },
        {
          "date": "2013-09-13",
          "type": "金属",
          "value": 88.2
        },
        {
          "date": "2013-09-13",
          "type": "农副产品",
          "value": 103.6
        },
        {
          "date": "2013-10-13",
          "type": "能源",
          "value": 128.3
        },
        {
          "date": "2013-10-13",
          "type": "金属",
          "value": 89.1
        },
        {
          "date": "2013-10-13",
          "type": "农副产品",
          "value": 104
        },
        {
          "date": "2013-11-13",
          "type": "能源",
          "value": 125.4
        },
        {
          "date": "2013-11-13",
          "type": "金属",
          "value": 87.8
        },
        {
          "date": "2013-11-13",
          "type": "农副产品",
          "value": 103.3
        },
        {
          "date": "2013-12-13",
          "type": "能源",
          "value": 129.5
        },
        {
          "date": "2013-12-13",
          "type": "金属",
          "value": 88.7
        },
        {
          "date": "2013-12-13",
          "type": "农副产品",
          "value": 103.4
        },
        {
          "date": "2014-01-14",
          "type": "能源",
          "value": 126.4
        },
        {
          "date": "2014-01-14",
          "type": "金属",
          "value": 88.1
        },
        {
          "date": "2014-01-14",
          "type": "农副产品",
          "value": 102.3
        },
        {
          "date": "2014-02-14",
          "type": "能源",
          "value": 130.6
        },
        {
          "date": "2014-02-14",
          "type": "金属",
          "value": 86.2
        },
        {
          "date": "2014-02-14",
          "type": "农副产品",
          "value": 106.1
        },
        {
          "date": "2014-03-14",
          "type": "能源",
          "value": 127.9
        },
        {
          "date": "2014-03-14",
          "type": "金属",
          "value": 83
        },
        {
          "date": "2014-03-14",
          "type": "农副产品",
          "value": 108
        },
        {
          "date": "2014-04-14",
          "type": "能源",
          "value": 128.4
        },
        {
          "date": "2014-04-14",
          "type": "金属",
          "value": 85.5
        },
        {
          "date": "2014-04-14",
          "type": "农副产品",
          "value": 107.2
        },
        {
          "date": "2014-05-14",
          "type": "能源",
          "value": 129
        },
        {
          "date": "2014-05-14",
          "type": "金属",
          "value": 84.8
        },
        {
          "date": "2014-05-14",
          "type": "农副产品",
          "value": 107.2
        },
        {
          "date": "2014-06-14",
          "type": "能源",
          "value": 131.5
        },
        {
          "date": "2014-06-14",
          "type": "金属",
          "value": 84.4
        },
        {
          "date": "2014-06-14",
          "type": "农副产品",
          "value": 105.2
        },
        {
          "date": "2014-07-14",
          "type": "能源",
          "value": 126.9
        },
        {
          "date": "2014-07-14",
          "type": "金属",
          "value": 88.2
        },
        {
          "date": "2014-07-14",
          "type": "农副产品",
          "value": 103.2
        },
        {
          "date": "2014-08-14",
          "type": "能源",
          "value": 121.2
        },
        {
          "date": "2014-08-14",
          "type": "金属",
          "value": 88
        },
        {
          "date": "2014-08-14",
          "type": "农副产品",
          "value": 102.1
        },
        {
          "date": "2014-09-14",
          "type": "能源",
          "value": 116.6
        },
        {
          "date": "2014-09-14",
          "type": "金属",
          "value": 85.1
        },
        {
          "date": "2014-09-14",
          "type": "农副产品",
          "value": 98.4
        },
        {
          "date": "2014-10-14",
          "type": "能源",
          "value": 106.2
        },
        {
          "date": "2014-10-14",
          "type": "金属",
          "value": 82.6
        },
        {
          "date": "2014-10-14",
          "type": "农副产品",
          "value": 98
        },
        {
          "date": "2014-11-14",
          "type": "能源",
          "value": 96.4
        },
        {
          "date": "2014-11-14",
          "type": "金属",
          "value": 82.9
        },
        {
          "date": "2014-11-14",
          "type": "农副产品",
          "value": 98.3
        },
        {
          "date": "2014-12-14",
          "type": "能源",
          "value": 78.6
        },
        {
          "date": "2014-12-14",
          "type": "金属",
          "value": 78.8
        },
        {
          "date": "2014-12-14",
          "type": "农副产品",
          "value": 96.8
        },
        {
          "date": "2015-01-15",
          "type": "能源",
          "value": 63.1
        },
        {
          "date": "2015-01-15",
          "type": "金属",
          "value": 73.9
        },
        {
          "date": "2015-01-15",
          "type": "农副产品",
          "value": 94.7
        },
        {
          "date": "2015-02-15",
          "type": "能源",
          "value": 70.4
        },
        {
          "date": "2015-02-15",
          "type": "金属",
          "value": 72.4
        },
        {
          "date": "2015-02-15",
          "type": "农副产品",
          "value": 93.4
        },
        {
          "date": "2015-03-15",
          "type": "能源",
          "value": 68.1
        },
        {
          "date": "2015-03-15",
          "type": "金属",
          "value": 71.8
        },
        {
          "date": "2015-03-15",
          "type": "农副产品",
          "value": 90.7
        },
        {
          "date": "2015-04-15",
          "type": "能源",
          "value": 72.2
        },
        {
          "date": "2015-04-15",
          "type": "金属",
          "value": 72.1
        },
        {
          "date": "2015-04-15",
          "type": "农副产品",
          "value": 90.4
        },
        {
          "date": "2015-05-15",
          "type": "能源",
          "value": 77.8
        },
        {
          "date": "2015-05-15",
          "type": "金属",
          "value": 74.6
        },
        {
          "date": "2015-05-15",
          "type": "农副产品",
          "value": 90.1
        },
        {
          "date": "2015-06-15",
          "type": "能源",
          "value": 76.3
        },
        {
          "date": "2015-06-15",
          "type": "金属",
          "value": 70.3
        },
        {
          "date": "2015-06-15",
          "type": "农副产品",
          "value": 90.2
        },
        {
          "date": "2015-07-15",
          "type": "能源",
          "value": 68.8
        },
        {
          "date": "2015-07-15",
          "type": "金属",
          "value": 65.7
        },
        {
          "date": "2015-07-15",
          "type": "农副产品",
          "value": 90.8
        },
        {
          "date": "2015-08-15",
          "type": "能源",
          "value": 59.5
        },
        {
          "date": "2015-08-15",
          "type": "金属",
          "value": 62.7
        },
        {
          "date": "2015-08-15",
          "type": "农副产品",
          "value": 87.5
        },
        {
          "date": "2015-09-15",
          "type": "能源",
          "value": 59.7
        },
        {
          "date": "2015-09-15",
          "type": "金属",
          "value": 63.4
        },
        {
          "date": "2015-09-15",
          "type": "农副产品",
          "value": 85.8
        },
        {
          "date": "2015-10-15",
          "type": "能源",
          "value": 59.7
        },
        {
          "date": "2015-10-15",
          "type": "金属",
          "value": 62.2
        },
        {
          "date": "2015-10-15",
          "type": "农副产品",
          "value": 86.8
        },
        {
          "date": "2015-11-15",
          "type": "能源",
          "value": 55.2
        },
        {
          "date": "2015-11-15",
          "type": "金属",
          "value": 57.8
        },
        {
          "date": "2015-11-15",
          "type": "农副产品",
          "value": 85.7
        },
        {
          "date": "2015-12-15",
          "type": "能源",
          "value": 47.8
        },
        {
          "date": "2015-12-15",
          "type": "金属",
          "value": 56.3
        },
        {
          "date": "2015-12-15",
          "type": "农副产品",
          "value": 85.4
        },
        {
          "date": "2016-01-16",
          "type": "能源",
          "value": 40.5
        },
        {
          "date": "2016-01-16",
          "type": "金属",
          "value": 55.2
        },
        {
          "date": "2016-01-16",
          "type": "农副产品",
          "value": 83.5
        },
        {
          "date": "2016-02-16",
          "type": "能源",
          "value": 41.2
        },
        {
          "date": "2016-02-16",
          "type": "金属",
          "value": 57.7
        },
        {
          "date": "2016-02-16",
          "type": "农副产品",
          "value": 84.2
        },
        {
          "date": "2016-03-16",
          "type": "能源",
          "value": 47.3
        },
        {
          "date": "2016-03-16",
          "type": "金属",
          "value": 61.2
        },
        {
          "date": "2016-03-16",
          "type": "农副产品",
          "value": 85.9
        },
        {
          "date": "2016-04-16",
          "type": "能源",
          "value": 51.1
        },
        {
          "date": "2016-04-16",
          "type": "金属",
          "value": 62
        },
        {
          "date": "2016-04-16",
          "type": "农副产品",
          "value": 88.3
        },
        {
          "date": "2016-05-16",
          "type": "能源",
          "value": 56.6
        },
        {
          "date": "2016-05-16",
          "type": "金属",
          "value": 60
        },
        {
          "date": "2016-05-16",
          "type": "农副产品",
          "value": 91.1
        },
        {
          "date": "2016-06-16",
          "type": "能源",
          "value": 59.4
        },
        {
          "date": "2016-06-16",
          "type": "金属",
          "value": 60.3
        },
        {
          "date": "2016-06-16",
          "type": "农副产品",
          "value": 93.8
        },
        {
          "date": "2016-07-16",
          "type": "能源",
          "value": 56.6
        },
        {
          "date": "2016-07-16",
          "type": "金属",
          "value": 63.5
        },
        {
          "date": "2016-07-16",
          "type": "农副产品",
          "value": 91.9
        },
        {
          "date": "2016-08-16",
          "type": "能源",
          "value": 57.6
        },
        {
          "date": "2016-08-16",
          "type": "金属",
          "value": 63.8
        },
        {
          "date": "2016-08-16",
          "type": "农副产品",
          "value": 90.9
        },
        {
          "date": "2016-09-16",
          "type": "能源",
          "value": 58.2
        },
        {
          "date": "2016-09-16",
          "type": "金属",
          "value": 62.8
        },
        {
          "date": "2016-09-16",
          "type": "农副产品",
          "value": 90.5
        },
        {
          "date": "2016-10-16",
          "type": "能源",
          "value": 63.7
        },
        {
          "date": "2016-10-16",
          "type": "金属",
          "value": 64.1
        },
        {
          "date": "2016-10-16",
          "type": "农副产品",
          "value": 89.5
        },
        {
          "date": "2016-11-16",
          "type": "能源",
          "value": 59.4
        },
        {
          "date": "2016-11-16",
          "type": "金属",
          "value": 71.5
        },
        {
          "date": "2016-11-16",
          "type": "农副产品",
          "value": 89.9
        },
        {
          "date": "2016-12-16",
          "type": "能源",
          "value": 68.4
        },
        {
          "date": "2016-12-16",
          "type": "金属",
          "value": 73.5
        },
        {
          "date": "2016-12-16",
          "type": "农副产品",
          "value": 89.4
        },
        {
          "date": "2017-01-17",
          "type": "能源",
          "value": 68.9
        },
        {
          "date": "2017-01-17",
          "type": "金属",
          "value": 74.5
        },
        {
          "date": "2017-01-17",
          "type": "农副产品",
          "value": 91.3
        },
        {
          "date": "2017-02-17",
          "type": "能源",
          "value": 69.4
        },
        {
          "date": "2017-02-17",
          "type": "金属",
          "value": 77.9
        },
        {
          "date": "2017-02-17",
          "type": "农副产品",
          "value": 91.3
        },
        {
          "date": "2017-03-17",
          "type": "能源",
          "value": 65.3
        },
        {
          "date": "2017-03-17",
          "type": "金属",
          "value": 77.3
        },
        {
          "date": "2017-03-17",
          "type": "农副产品",
          "value": 89.2
        },
        {
          "date": "2017-04-17",
          "type": "能源",
          "value": 67.1
        },
        {
          "date": "2017-04-17",
          "type": "金属",
          "value": 74
        },
        {
          "date": "2017-04-17",
          "type": "农副产品",
          "value": 87.7
        },
        {
          "date": "2017-05-17",
          "type": "能源",
          "value": 64.3
        },
        {
          "date": "2017-05-17",
          "type": "金属",
          "value": 72.2
        },
        {
          "date": "2017-05-17",
          "type": "农副产品",
          "value": 88.9
        },
        {
          "date": "2017-06-17",
          "type": "能源",
          "value": 60.4
        },
        {
          "date": "2017-06-17",
          "type": "金属",
          "value": 71.7
        },
        {
          "date": "2017-06-17",
          "type": "农副产品",
          "value": 87.4
        },
        {
          "date": "2017-07-17",
          "type": "能源",
          "value": 62.3
        },
        {
          "date": "2017-07-17",
          "type": "金属",
          "value": 75.4
        },
        {
          "date": "2017-07-17",
          "type": "农副产品",
          "value": 88.1
        },
        {
          "date": "2017-08-17",
          "type": "能源",
          "value": 65
        },
        {
          "date": "2017-08-17",
          "type": "金属",
          "value": 81.6
        },
        {
          "date": "2017-08-17",
          "type": "农副产品",
          "value": 86.5
        },
        {
          "date": "2017-09-17",
          "type": "能源",
          "value": 68.5
        },
        {
          "date": "2017-09-17",
          "type": "金属",
          "value": 82.7
        },
        {
          "date": "2017-09-17",
          "type": "农副产品",
          "value": 87.7
        }
      ]
    const { props } = (
      // @ts-ignore
        <FCanvas context={ctx?.ctx}>
          <Chart data={data}>
            <Axis
              field="date"
              tickCount={3}
              style={{
                label: { align: 'between' },
              }}
            />
            <Axis field="value" tickCount={5} />
            <Line x="date" y="value" lineWidth="4px" color="type" />
            <Legend
              position="bottom"
              style={{
                justifyContent: 'center',
              }}
              triggerMap={{
                press: (items, records, legend) => {
                  const map = {};
                  items.forEach((item) => (map[item.name] = _.clone(item)));
                  records.forEach((record) => {
                    map[record.type].value = record.value;
                  });
                  legend.setItems(_.values(map));
                },
                pressend: (items, records, legend) => {
                  legend.setItems(items);
                },
              }}
            />
          </Chart>
        </FCanvas>
    );
    const canvas = new FCanvas(props);
    canvas.render();
  }, []);
  return (
    <View className={styles.detail}>
      <Header />
      <ScrollView
        scrollY
        scrollWithAnimation
        className={styles.container}
      >
        <View className={styles.hot__li}>
          <View className={styles.hot__detail}>
            <View className={styles.hot__country}>
              <Image
                className={styles.hot__img}
                src='https://storage.360buyimg.com/imgtools/e067cd5b69-07c864c0-dd02-11ed-8b2c-d7f58b17086a.png'
                mode='aspectFill'
              />
              <Text className={styles.hot__name}>圣路易斯竞技</Text>
            </View>
            <View className={styles.hot__score}>1:5</View>
            <View className={styles.hot__country}>
              <Image
                className={styles.hot__img}
                src='https://storage.360buyimg.com/imgtools/e067cd5b69-07c864c0-dd02-11ed-8b2c-d7f58b17086a.png'
                mode='aspectFill'
              />
              <Text className={styles.hot__name}>托卢卡</Text>
            </View>
          </View>
          <View className={styles.hot__progress}>
            <View className={styles.hot__percent}>26%&emsp;27%&emsp;48%</View>
            <View className={styles.hot__part}>
              <Text className={styles.hot__part__p1} style={{width: '30%'}}></Text>
              <Text className={styles.hot__part__p2} style={{width: '30%'}}></Text>
              <Text className={styles.hot__part__p3}></Text>
            </View>
          </View>
          <View className={styles.hot__note}>
            <Text className={styles.hot__time}>2024-04-20 11:00:00</Text>
            <Image className={styles.hot__like} src={like} mode='aspectFit' />
          </View>
        </View>
        <View className={styles.result}>
          <View className={styles.result__detail}>
            <View className={styles.result__detail__h3}>Ai预测结果：</View>
            <View className={styles.result__detail__res}>让胜</View>
            <View className={styles.result__detail__p}>结合Ai模型预测，专家预<br />测及必发指数的综合信心指数。</View>
            <View className={styles.result__detail__p}>该预测可能会随比赛临近而改变。</View>
          </View>
          <View className={styles.result__chart}>
            <CircleProgress
              key={1}
              percent={80}
              radius={50}
              strokeWidth={10}
              color={{'0%': '#a3221b', '50%': '#a5211b', '100%': '#541c17'}}
            >
              50%
            </CircleProgress>
          </View>
        </View>
        <View className={styles.percent}>
          <View className={styles.percent__rate}>信心指数：
            <Text className={styles.percent__rate__p}>85%</Text>
          </View>
          <View className={styles.percent__win}><Text className={styles.percent__win__tip}></Text>胜概率</View>
        </View>
        <View className={styles.intelligence}>
          <Text className={styles.intelligence__h3}>情报抓取：</Text>
          <ScrollView
            scrollY
            enhanced
            showScrollbar
            className={styles.intelligence__scroll}
          >
            <View className={styles.intelligence__scroll__container}>
              考虑到那不勒斯的防守问题和恩波利在主场的稳健表现，这场比赛恩波利完全有可能给那不勒斯制造麻烦，那不勒斯的进攻依然十分强劲，但防守不稳可能会给恩波利提供机会，指数当下也是徘徊在那不勒斯-0.75，并不牢靠，因此本场着好思波利主场不败。推荐让胜1:12:2
            </View>
          </ScrollView>
        </View>
        <View className={styles.warning}>
          <View className={styles.warning__title}>
            <Text className={styles.warning__title__status}>预警</Text>
            <Text className={styles.warning__title__tip}>重要提示，本场比赛有出下盘爆冷风险。</Text>
          </View>
          <View className={styles.warning__chart}>
            <Canvas width='100%' height='100%' canvasId='myCanvas' id='myCanvas'></Canvas>
          </View>
          <View className={styles.warning__tips}>
            温馨提示：胜负概率曲线是基于足球大数据AI机器模型自动生成，从而产生预测方向，欺负变化越大，越有可能产生冷门。
          </View>
          <View className={styles.warning__chart__legend}>
            <View className={styles.warning__chart__legend__item}>
              <View className={styles.warning__chart__legend__item__progress}>
                <Progress percent={100} color='#da251c' strokeWidth='5' />
              </View>
              <View className={styles.warning__chart__legend__item__txt}>胜赔</View>
            </View>
            <View className={styles.warning__chart__legend__item}>
              <View className={styles.warning__chart__legend__item__progress}>
                <Progress percent={100} color='#aaa9a9' strokeWidth='5' />
              </View>
              <Text className={styles.warning__chart__legend__item__txt}>平赔</Text>
            </View>
            <View className={styles.warning__chart__legend__item}>
              <View className={styles.warning__chart__legend__item__progress}>
                <Progress percent={100} color='#5f5d5c' strokeWidth='5' />
              </View>
              <Text className={styles.warning__chart__legend__item__txt}>负赔</Text>
            </View>
          </View>
        </View>
        <Tabs
          value={tab1value}
          onChange={(value) => {
            setTab1value(value)
          }}
          activeType='card'
          className={styles.tabs}
        >
          <Tabs.TabPane title='让球'>
            <Table
              striped
              style={{border: 0}}
              columns={columns}
              data={table} bordered={false}
            />
          </Tabs.TabPane>
          <Tabs.TabPane title='胜平负'>
            <Table
              striped
              style={{border: 0}}
              columns={columns}
              data={table}
              bordered={false}
            />
          </Tabs.TabPane>
        </Tabs>
      </ScrollView>
    </View>
  )
}
