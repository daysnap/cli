import { createRoute } from '@/core'
import { isBoolean } from '@daysnap/utils'
import { logger } from '@/core'
import ini from 'ini'

export const onGet = createRoute(async (ctx) => {
  const { options, configServer } = ctx
  const { get: key, json } = options
  let config = await configServer.get(isBoolean(key) ? '' : key)
  console.log('key => ', key, config)
  if (!json) {
    config = ini.stringify(config)
  }
  logger.info(config)
})
