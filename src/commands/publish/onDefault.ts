import semver from 'semver'
import { createRoute } from '@/core'
import { parsePackage, spinner } from '@/utils'
import { Config } from './config'
import {
  checkUnCommit,
  getOnlineVersion,
  publishPackage,
  publishTag,
  pushCommit,
  updatePackage,
  upgrade,
} from './utils'

export default createRoute(async (ctx) => {
  spinner.start(`开始执行发布流程...`)

  const { configServer, options } = ctx
  let { ver: version, tag, push, message, pnpm } = options
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

  if (!version) {
    spinner.start(`查询线上版本...`)
    const onlineVersion = await getOnlineVersion({ name, registry })
    spinner.succeed(
      `查询线上版本完成! 当前线上版本 => ${onlineVersion || '该包还未发布'}.`,
    )

    version = upgrade(
      semver.valid(semver.coerce(onlineVersion || '0.0.0')) as string,
      1,
    )
  }

  spinner.start(`正在写入 package.json `)
  await updatePackage({ version, pkgPath })
  spinner.succeed(`写入 package.json 完成!`)

  spinner.start(`正在发布版本...`)
  await publishPackage(registry, pnpm)
  spinner.succeed(`发布版本完成! 版本 => ${version}.`)

  if (tag === true) {
    tag = version
  }
  if (push || tag) {
    spinner.start(`检测是否有未提交内容...`)
    const isUnCommit = await checkUnCommit()
    spinner.succeed(isUnCommit ? `检测到未提交内容！` : `未检测到未提交内容！`)

    if (isUnCommit) {
      spinner.start(`推送代码至git仓库...`)
      await pushCommit(`v${version}${message ? ` ${message}` : ''}`)
      spinner.succeed(`推送代码至git仓库完成! `)
    }
  }

  if (tag) {
    spinner.start(`正在打tag：${tag}并推送至git...`)
    await publishTag(tag)
    spinner.succeed(`tag推送完成! tag版本 => ${tag}.`)
  }

  spinner.succeed(`包：${name}@${version} 发布完成！`)
})
