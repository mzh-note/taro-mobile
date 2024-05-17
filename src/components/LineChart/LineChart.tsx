import { useEffect } from 'react';
import {View, Canvas} from '@tarojs/components';
import Taro from '@tarojs/taro';

import styles from './index.module.less'

export default function LineChart () {
  // 绘制平滑曲线
  const drawSmoothCurve = () => {
    const ctx = Taro.createCanvasContext('myCanvas');

    function aa(ctx, color, data) {
      var points = data.map(function (value, index) {
        return {
          x: index * 50,
          y: value * 50,
        };
      });

      ctx.setStrokeStyle(color);
      ctx.setLineWidth(2);

      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      const p0 = points[0];
      const p1 = points[1];
      const p2 = points[2];

      const cp1x = p0.x + (p1.x - p0.x) / 2;
      const cp1y = p0.y + (p1.y - p0.y) / 2;
      ctx.quadraticCurveTo(cp1x, cp1y, p1.x, p1.y);

      for (let i = 1; i < points.length - 1; i++) {
        const p0 = i === 1 ? points[0] : points[i - 1];
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = i === points.length - 2 ? points[points.length - 1] : points[i + 2];

        const cp1x = p1.x + (p2.x - p0.x) / 5;
        const cp1y = p1.y + (p2.y - p0.y) / 5;
        const cp2x = p2.x - (p3.x - p1.x) / 5;
        const cp2y = p2.y - (p3.y - p1.y) / 5;

        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
      }

      ctx.stroke();
    }

    var data = [
      0.91, 0.89, 1.1, 0.94, 0.86, 0.86, 1.05, 0.9, 0.97, 0.88, 0.94, 0.9,
      0.88, 0.81, 0.91, 1.19, 0.81,
    ];
    var data2 = [
      0.75, 0.8, 0.83, 0.78, 0.82, 0.85, 0.9, 1.01, 1.04, 1.12, 1.15, 1.14,
      1.1, 1.06, 1.03, 1.01, 0.98,
    ];
    var data3 = [
      1.02, 1.04, 1.01, 1.05, 1.06, 1.09, 1.1, 1.13, 1.18, 1.15, 1.12, 1.1,
      1.06, 1.03, 1.01, 1.0, 0.99,
    ];

    aa(ctx, '#da251c', data);
    aa(ctx, '#aaa9a9', data2);
    aa(ctx,  '#5f5d5c', data3);
    ctx.draw();
  }
  useEffect(() => {
    drawSmoothCurve()
  }, [])
  return (
    <View className={styles.line__chart}>
      <Canvas className={styles.line__chart_canvas} canvasId='myCanvas' canvas-id='myCanvas'></Canvas>
    </View>
  )
}
