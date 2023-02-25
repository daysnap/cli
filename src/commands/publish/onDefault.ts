import semver from 'semver'
import { createRoute } from '@/core'
import { parsePackage, spinner } from '@/utils'
import { Config } from './config'

export default createRoute(async (ctx) => {
  spinner.start(`开始执行发布流程...`)

  const { configServer, options } = ctx
  let { version, tag, push } = options
  if (version && !semver.valid(version)) {
    throw new Error(`指定版本格式有误 => ${version}`)
  }

  spinner.text = `解析项目 package.json...`
  const { name, pkgPath, publishConfig } = await parsePackage()
  const { registry } = Object.assign(
    {},
    publishConfig,
    configServer.get<Config>('publish'),
    options,
  ) as Config
  spinner.succeed(`解析项目 package.json 完成!`)

  spinner.start(`查询线上版本...`)
  // const onlineVersion = await getOn

  spinner.succeed(`包：${name}@${version} 发布完成！`)
})
