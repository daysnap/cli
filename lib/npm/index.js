
const chalk = require('chalk')
const exec = require('../../utils/exec')
const { padding } = require('../../utils/helper')
const logger = require('../../utils/logger')
const { getRegistries, getCurrentRegistry, generateDashLine } = require('./utils')

// 使用
const onUse = async options => {
    const { use: name } = options
    const registry = await getCurrentRegistry()

}

// 列表
const onList = async () => {
    const registries = getRegistries()
    const keys = Object.keys(registries)
    const length = Math.max(...keys.map(key => key.length)) + 3
    const currentRegistry = await getCurrentRegistry()
    const messages = Object.keys(registries).map(key => {
        const { registry } = registries[key]
        const prefix = currentRegistry === registry ? chalk.green.bold('* ') : `  `
        return padding(`${prefix}${key}${generateDashLine(key, length)}${registry}`, 2)
    })
    p([ ...messages, '' ])
}

module.exports = {
    use: onUse,
    list: onList,
}
