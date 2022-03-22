
const ora = require('ora')
const logger = require('../../utils/logger')
const { fetchTemplateList } = require('./utils')
const DEFAULT = require('./config')
const { padding, geneDashLine } = require('../../utils/helper')

const create = (options, command) => {
    const [ , appName, , template ] = command.parent.args
    if (!appName || !template) {
        return command.outputHelp()
    }
    console.log('appName -----', appName)
    console.log('template -----', template)

}

create.list = async (options) => {
    const spinner = ora('正在查询模板列表...').start()
    try {
        const { username } = Object.assign({}, DEFAULT, options)
        const result = await fetchTemplateList(username)
        if (!Array.isArray(result)){
            throw new Error(`${result.message}：${username}`)
        }
        const data = result.map(({ name, description }) => ({ name, description }))
        const length = Math.max(...data.map(item => item.name.length)) + 3
        const messages = data.map((item, index) => {
            const { name, description } = item
            return padding(`${index + 1}. ${name}${geneDashLine(name, length)}${description}`, 4)
        })
        spinner.succeed('查询模板列表完成，模板如下：')
        logger.br().print(messages)
    } catch (err) {
        spinner.fail(err.toString())
    }
    logger.br()
}

module.exports = create
