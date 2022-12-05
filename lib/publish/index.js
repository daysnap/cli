
const semver = require('semver')
const logger = require('../../utils/logger')
const { upgrade, ora, parsePackage, getConfig } = require('../../utils/helper')
const { publishPackage, getOnlineVersion, updatePackage, publishTag, pushCommit, checkUnCommit } = require('./utils')

module.exports = async options => {
    const spinner = ora('开始执行发布流程...').start()
    try {
        let { version, tag, push } = options
        if (version && !semver.valid(version)) {
            throw new Error(`指定版本格式有误 => ${version}`)
        }

        spinner.start('解析项目...').render()
        const { name, pkg, publishConfig } = await parsePackage()
        spinner.succeed('解析项目完成!')

        const DEFAULT = await getConfig('publish')
        const { registry } = Object.assign({}, DEFAULT, publishConfig, options)

        spinner.start('查询线上版本...').render()
        const onlineVersion = await getOnlineVersion({ name, registry })
        spinner.succeed(`查询线上版本完成! 当前线上版本 => ${ onlineVersion || '该包还未发布' }.`)

        if (!version) {
            version = upgrade(semver.valid(semver.coerce(onlineVersion || '0.0.0')), 1)
        }

        spinner.start(`正在写入 package.json `).render()
        await updatePackage({ version, pkg })
        spinner.succeed(`写入 package.json 完成!`)

        if (tag === true) tag = version
        if (push || tag) {
            spinner.start(`检测是否有未提交内容...`).render()
            const isUnCommit = await checkUnCommit()
            spinner.succeed(isUnCommit ? `检测到未提交内容！` : `未检测到未提交内容！`)

            if (isUnCommit) {
                spinner.start(`推送代码至git仓库...`).render()
                await pushCommit(tag)
                spinner.succeed(`推送代码至git仓库完成! `)
            }
        }

        spinner.start(`正在发布版本...`).render()
        await publishPackage(registry)
        spinner.succeed(`发布版本完成! 版本 => ${version}.`)



        if (tag) {
            spinner.start(`正在打tag：${tag}并推送至git...`).render()
            await publishTag(tag)
            spinner.succeed(`tag推送完成! tag版本 => ${tag}.`)
        }
    } catch (err) {
        spinner.fail(err.toString())
    }
    logger.br()
}
