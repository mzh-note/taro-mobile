import fs from 'fs'
import path from 'path'

export default (ctx: any) => {
  // 接下来使用 ctx 的时候就能获得智能提示了
  ctx.onBuildStart(() => {
    const echartsJsPath = path.join(
      ctx.paths.nodeModulesPath,
      '/echarts-taro3-react/lib/ec-canvas/echarts.js'
    )

    const text = fs.readFileSync(echartsJsPath).toString()
    const str = text.replace(
      /r\??\.addEventListener\(o,a,s\)/g,
      'r.addEventListener?.(o,a,s)'
    )

    fs.writeFileSync(echartsJsPath, str)
  })
}
