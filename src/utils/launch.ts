import { logger } from '@/core'

export function launch(...args: any[]) {
  const file = args[0]
  logger.info(`正在打开 ${file}...`)

  let cb = args[args.length - 1]
  if (typeof cb !== 'function') {
    cb = null
  }
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('launch-editor')(...args, (fileName: any, errorMessage: any) => {
    logger.error(`无法打开 '${fileName}' : ${errorMessage}`)

    if (cb) cb(fileName, errorMessage)
  })
}
