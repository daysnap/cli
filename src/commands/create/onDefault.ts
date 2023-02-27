import { createRoute } from '@/core'
import inquirer from 'inquirer'
import { getReposList, parseAppName, parseUrl } from './utils'
import { spinner } from '@/utils'
import { Config } from './config'

export default createRoute(async (ctx) => {
  spinner.start(`正在准备创建项目...`)
  const { configServer, args, options } = ctx
  const [appname] = args
  const { name, output, inPlace } = parseAppName(appname)
  const config = Object.assign(
    await configServer.get<Config>('create'),
    options,
  )
  const { depositUrl, repoUrl } = parseUrl(config)
  const { ok, template } = await inquirer.prompt<{
    ok: boolean
    template: string
  }>([
    {
      type: 'confirm',
      message: `在当前目录中生成项目？`,
      name: 'ok',
      when: inPlace,
      default: true,
    },
    {
      type: 'list',
      message: `请选择一个模板项目：`,
      name: 'template',
      when: (res) => res.ok,
      choices: config.template ? [] : await getReposList(depositUrl),
      default: config.template,
    },
  ])

  // 不继续执行
  if (!ok) {
    return process.exit(1)
  }

  spinner.start(`正在拉取模板...`)

  spinner.succeed(`创建项目完成！${name} : ${output}`)
})
