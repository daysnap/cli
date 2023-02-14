import { createRoute, logger } from '@/core'
import { getAbsolutePath, isExists } from '@/utils'

// 获取配置
function getOssConfig(filepath: string) {
  //
}

export default createRoute(async (ctx) => {
  const { program } = ctx
  let [input, output, { config }] = ctx.args

  if (config) {
    config = getAbsolutePath(config)

    if (!(await isExists(config))) {
      // logger.error(`没有找到配置文件：${config}`)
      throw new Error(`没有找到配置文件：${config}`)
    }
  }
  // const config = requireFile('.')
  // 格式化参数
  if (output) {
    // const
  }

  console.log('program => ', ctx.args, ctx.argv)
  // console.log('11', process.cwd())
  // const filterRegExp = buildFilter(['config'])
  // const files = dir
  //   .files(`${process.cwd()}/src`, { sync: true })
  //   .filter((item) => {
  //     return filterRegExp?.test(item)
  //   })
  // console.log('files => ', filterRegExp, files)
})
