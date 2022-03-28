
const path = require('path')
const inquirer = require('inquirer')
const home = require('user-home')
const logger = require('../../utils/logger')
const { ora, isExists } = require('../../utils/helper')
const {
    fetchReposList,
    downloadGitRepo,
    formatReposToMessages,
    isLocalPath,
    getTemplatePath,
    generate,
    parseOptions,
} = require('./utils')

const create = async (options, command) => {
    const spinner = ora('正在创建项目...').start()
    try {
        let {
            template,
            cache,
            rawName,
            inPlace,
            name,
            depositUrl,
            to,
            repoUrl,
        } = parseOptions(options, command)

        if (!template || inPlace) {
            let choices = []
            if (!template) {
                spinner.render().start(`正在查询模板列表...`)
                const repos = await fetchReposList(depositUrl)
                choices = formatReposToMessages(repos)
                spinner.succeed(`查询模板列表完成！`)
            }
            const { ok = true, ...rest } = await inquirer.prompt([
                { type: 'confirm', message: `在当前目录中生成项目？`, name: 'ok', when: inPlace, default: true },
                { type: 'list', message: `请选择一个模板项目：`, name: 'template', choices, filter: v => v.trim().split(' ')[1]  }
            ])
            if (!ok) {
                return process.exit(1)
            }
            template = rest.template
        }

        spinner.render().start(`正在查找模板...`)
        let temp = path.resolve(home, '.dsc-templates', template.replace(/[\/:]/g, '-'))
        if (cache) {
            template = temp
        }
        if (isLocalPath(template)) {
            // 使用本地缓存
            const temp = getTemplatePath(template)
            if (!await isExists(temp)) {
                throw new Error(`本地模板没有找到！模板 => ${template}`)
            }
        } else {
            await downloadGitRepo({ repo: repoUrl.replace('{repo}', template), dest: temp })
        }
        await generate(name, temp, to)
        spinner.succeed(`创建项目完成 => ${name}`)
    } catch (err) {
        spinner.fail(err.toString())
    }
    logger.br()
}

create.list = async (options) => {
    const spinner = ora('正在查询模板列表...').start()
    try {
        const { depositUrl } = parseOptions(options)
        const repos = await fetchReposList(depositUrl)
        if (!Array.isArray(repos)){
            throw new Error(`${repos.message}：${depositUrl}`)
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
