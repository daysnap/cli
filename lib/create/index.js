
const ora = require('ora')
const logger = require('../../utils/logger')
const { fetchTemplateList } = require('./utils')
const { username } = require('./config')

const create = (options, command) => {
    const [ , appName, , template ] = command.parent.args
    if (!appName || !template) {
        return command.outputHelp()
    }
    console.log('appName -----', appName)
    console.log('template -----', template)

}

create.list = async (options) => {
    console.log('args => ', options)
    const spinner = ora('正在查询模板列表...').start()
    try {
        const result = await fetchTemplateList(username)
        const data = result.filter(item => item.toLocaleLowerCase.includes('template'))
            .map(({ name, description }) => ({ name, description }))
        spinner.succeed('查询模板列表完成！')
        console.log(data)
    } catch (err) {
        spinner.fail(err.toString())
    }
    logger.br()
    console.log('create ----- list')
}

module.exports = create
