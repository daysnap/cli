
const logger = require('../../utils/logger')
const semver = require('semver')
const { upgrade, ora } = require('../../utils/helper')
const { parseProject, publishPackage, getOnlineVersion, updatePackage } = require('./utils')
const DEFAULT = require('./config')

module.exports = async options => {
    const spinner = ora('开始执行发布流程').start()
    try {
        let { registryUri, version } = Object.assign({}, DEFAULT, options)
        if (version && !semver.valid(version)) {
            throw new Error(`指定版本格式有误 => ${version}`)
        }

        spinner.start('解析项目...').render()
        const { name, pkg } = await parseProject(spinner)
        spinner.succeed('解析项目完成!')

        spinner.start('查询线上版本...').render()
        let onlineVersion = await getOnlineVersion({ name, registryUri })
        spinner.succeed(`查询线上版本完成! 当前线上版本 => ${ onlineVersion || '该包还未发布' }.`)

        if (!version) {
            version = upgrade(semver.valid(semver.coerce(onlineVersion || '0.0.0')), 1)
        }

        spinner.start(`正在写入 package.json `).render()
        await updatePackage({ version, pkg })
        spinner.succeed(`写入 package.json 完成!`)

        spinner.start(`正在发布版本...`).render()
        // await publishPackage(registryUri)
        spinner.succeed(`发布版本完成! 版本 => ${version}.`)
    } catch (err) {
        spinner.fail(err.toString())
    }
    logger.br()
}
