import { createRoute, logger } from '@/core'
import { spinner } from '@/utils'
import { formatReposToMessages, getReposList, parseUrl } from './utils'
import { Config } from './config'

export const onList = createRoute(async (ctx) => {
  spinner.start(`正在查询模板列表...`)
  const { configServer, options } = ctx
  const config = Object.assign(
    await configServer.get<Config>('create'),
    options,
  )
  const { depositUrl } = parseUrl(config)
  const repos = await getReposList(depositUrl)
  if (!Array.isArray(repos)) {
    throw new Error(`${repos.message || repos}：${depositUrl}`)
  }
  if (!repos.length) {
    throw new Error(`未找到相关模板：${depositUrl}`)
  }
  spinner.succeed(`查询模板列表完成，模板如下：`)
  logger.br().print(formatReposToMessages(repos))
})
