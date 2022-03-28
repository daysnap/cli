
const inquirer = require('inquirer')
const logger = require('../../utils/logger')
const { ora } = require('../../utils/helper')
const { fetchReposList, downloadGitRepo, parseOptions, formatReposToMessages } = require('./utils')
const DEFAULT = require('./config')

const create = async (options, command) => {
    const spinner = ora('正在创建项目...').start()
    try {
        const [ , appName, , template ] = command.parent.args
        const { username } = Object.assign({}, DEFAULT, options)
        if (!template || !appName) {
            let choices = []
            if (!template) {
                spinner.start(`正在查询模板列表...`).render()
                const repos = await fetchReposList(username)
                choices = formatReposToMessages(repos)
            }
            const result = await inquirer.prompt([
                { type: 'confirm', message: `在当前目录中生成项目？`, name: 'ok', when: !appName },
                { type: 'list', message: `请选择一个模板项目：`, name: 'template', choices  }
            ])
            console.log('result => ', result)
        }
        // if (!appName || !template) {
        //     return command.outputHelp()
        // }
        console.log('appName -----', appName)
        console.log('template -----', template)
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
        const repos = await fetchReposList(username)
        if (!Array.isArray(repos)){
            throw new Error(`${repos.message}：${username}`)
        }
        const messages = formatReposToMessages(repos)
        spinner.succeed('查询模板列表完成，模板如下：')
        logger.br().print(messages)
    } catch (err) {
        spinner.fail(err.toString())
    }
    logger.br()
}

module.exports = create
