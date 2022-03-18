
const chalk = require('chalk')
const logger = require('../../utils/logger')
const { padding, exec } = require('../../utils/helper')
const { getRegistries, getCurrentRegistry, generateDashLine } = require('./utils')

// 使用
const onUse = async options => {
    const { use: name } = options
    const registries = getRegistries()
    const { registry } = registries[name] || {}
    if (!registry) {
        logger.error(`${name} 源找不到`).br()
        return
    }
    await exec(`npm config set registry ${registry}`)
    logger.success(`切换源 ${name} => ${registry} 成功.`).br()
}

// 列表
const onList = async () => {
    const registries = getRegistries()
    const keys = Object.keys(registries)
    const length = Math.max(...keys.map(key => key.length)) + 3
    const currentRegistry = await getCurrentRegistry()
    const messages = keys.map(key => {
        const { registry } = registries[key]
        const prefix = currentRegistry === registry ? chalk.green.bold('* ') : `  `
        return padding(`${prefix}${key}${generateDashLine(key, length)}${registry}`, 2)
    })
    logger.print(messages).br()
}

module.exports = {
    use: onUse,
    list: onList,
}
