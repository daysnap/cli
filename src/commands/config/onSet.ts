import merge from 'deepmerge'
import { parseObject } from '@daysnap/utils'
import { createRoute, logger } from '@/core'
import { writeFile } from '@/utils'
import ini from 'ini'

export const onSet = createRoute(async (ctx) => {
  const { parseRestArgv, options, configServer } = ctx
  const [value] = parseRestArgv()
  const { set: key } = options

  if (!key || !value) {
    return ctx.command.outputHelp()
  }

  const config = merge(
    await configServer.get('', [
      configServer.PROJECT_ROOT_DSCRC,
      configServer.HOME_DSCRC,
    ]),
    parseObject(key, value),
  )
  await writeFile(configServer.HOME_DSCRC, ini.stringify(config))

  logger.success(`设置成功：${key} => ${value}`)
})
