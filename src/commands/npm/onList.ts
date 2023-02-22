import { createRoute, logger } from '@/core'
import { exec, geneDashLine, padding, spinner } from '@/utils'
import chalk from 'chalk'
import { Config } from './config'

export const onList = createRoute(async (ctx) => {
  spinner.start(`正在查询支持的源...`)
  const { configServer } = ctx

  const { registries } = await configServer.get<Config>('npm')
  const keys = Object.keys(registries)
  const length = Math.max(...keys.map((key) => key.length)) + 3
  const current = await exec(`npm config get registry`)

  const messages = keys.map((key) => {
    const { registry } = registries[key]
    const prefix = current === registry ? chalk.green.bold('* ') : `  `
    return padding(`${prefix}${key}${geneDashLine(key, length)}${registry}`, 2)
  })
  spinner.succeed('查询完成，支持的源如下：')
  logger.br().print(messages).br()
}, 'list')
