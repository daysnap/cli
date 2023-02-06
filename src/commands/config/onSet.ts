import merge from 'deepmerge'
import { parseObject } from '@daysnap/utils'
import { createRoute } from '@/core'
import { writeFile } from '@/utils'
import ini from 'ini'

export const onSet = createRoute(async (ctx) => {
  const { parseRestArgv, options, program, configServer } = ctx
  const [value] = parseRestArgv()
  const { set: key } = options
  if (!key || !value) {
    return ctx.command.outputHelp()
  }
  const config = merge(await configServer.get(), parseObject(key, value))
  await writeFile(configServer.CWD_DSCRC, ini.stringify(config))
})
