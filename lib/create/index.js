
const inquirer = require('inquirer')
const logger = require('../../utils/logger')
const { padding, geneDashLine, ora } = require('../../utils/helper')
const { fetchTemplateList, downloadGitRepo } = require('./utils')
const DEFAULT = require('./config')

const create = (options, command) => {
    const [ , appName, , template ] = command.parent.args
    if (!appName || !template) {
        return command.outputHelp()
    }
    console.log('appName -----', appName)
    console.log('template -----', template)
    const spinner = ora('正在创建项目...').start()
    try {

        spinner.succeed(`创建项目完成 => ${appName}`)
    } catch (err) {
        spinner.fail(err.toString())
    }
    logger.br()
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
