import { createRoute } from '@/core'
import { Config } from './config'
import { exec, spinner } from '@/utils'

export const onUse = createRoute(async (ctx) => {
  spinner.start(`正在切换源...`)

  const { configServer, options } = ctx
  const { use: name } = options

  const { registries } = await configServer.get<Config>('npm')
  const { registry } = registries[name] || {}
  if (!registry) {
    throw new Error(`${name} 源未找到`)
  }

  await exec(`npm config set registry ${registry}`)

  spinner.succeed(`切换源 ${name} => ${registry} 完成.`)
}, 'use')
