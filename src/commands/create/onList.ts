import { createRoute, logger } from '@/core'
import { spinner } from '@/utils'
import { formatReposToMessages, getReposList, parseUrl } from './utils'
import { Config } from './config'

export const onList = createRoute(async (ctx) => {
  spinner.start(`正在查询模板列表...`)
  const { configServer } = ctx
  const config = await configServer.get<Config>('create')
  const { depositUrl } = parseUrl(config)
  const repos = await getReposList(depositUrl)
  if (!Array.isArray(repos)) {
    throw new Error(`${repos.message}：${depositUrl}`)
  }
  spinner.succeed(`查询模板列表完成，模板如下：`)
  logger.br().print(formatReposToMessages(repos))
})
