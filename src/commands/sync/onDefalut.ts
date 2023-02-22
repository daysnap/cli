import { createRoute } from '@/core'
import { isExists } from '@/utils'

export default createRoute(async (ctx) => {
  const { configServer, args } = ctx
  const [names] = args

  if (!names.length) {
    const pkgPath = `${process.cwd()}/package.json`
    if (await isExists(pkgPath)) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { name } = require(pkgPath)
      names.push(name)
    }
    if (names.length === 0) {
      throw new Error('未指定需要同步的 npm 包名')
    }
  }

  // 需要同步的
  console.log('args => ', names)
})
