import ini from 'ini'
import { createRoute, logger } from '@/core'
import { isString } from '@daysnap/utils'

export const onGet = createRoute(async (ctx) => {
  const { options, configServer } = ctx
  const { get: key, json } = options

  let config = await configServer.get(key)
  if (!json && !isString(config)) {
    config = ini.stringify(config)
  }

  logger.info(config)
})
