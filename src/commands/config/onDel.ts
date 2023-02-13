import ini from 'ini'
import { createRoute, logger } from '@/core'
import { writeFile } from '@/utils'

export const onDel = createRoute(async (ctx) => {
  const { configServer, options } = ctx
  const { del: key } = options

  const config = await configServer.get()
  let obj = config
  ;(key as string).split('.').forEach((key, index, arr) => {
    index === arr.length - 1 ? delete obj[key] : (obj = obj[key])
  })

  await writeFile(configServer.HOME_DSCRC, ini.stringify(config))

  logger.success(`删除成功：${key}`)
})
