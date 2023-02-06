import { createRoute } from '@/core'
import { isBoolean, isString } from '@daysnap/utils'
import { logger } from '@/core'
import ini from 'ini'

export const onGet = createRoute(async (ctx) => {
  const { options, configServer } = ctx
  const { get: key, json } = options
  let config = await configServer.get(isBoolean(key) ? '' : key)
  if (!json && !isString(config)) {
    config = ini.stringify(config)
  }
  logger.info(config)
})
