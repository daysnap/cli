import { createRoute } from '@/core'
import { isString } from '@daysnap/utils'
import { logger } from '@/core'
import ini from 'ini'

export default createRoute(async (ctx) => {
  const { options, configServer } = ctx
  const { json } = options

  let config = await configServer.get()
  if (!json && !isString(config)) {
    config = ini.stringify(config)
  }

  logger.info(config)
})
