import { createRoute } from '@/core'

// 获取配置
function getOssConfig(filepath: string) {
  //
}

export default createRoute((ctx) => {
  const { program } = ctx
  const [input, output, { config }] = ctx.args
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
