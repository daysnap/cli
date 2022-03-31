
const logger = require('../../utils/logger')
const { ora } = require('../../utils/helper')
const {
    fetchReposList,
    formatReposToMessages,
    generate,
    parseOptions,
    askQuestions,
    getTemplateRepo,
} = require('./utils')

const create = async (options, command) => {
    const spinner = ora('正在检测环境...').start()
    try {
        const { cache, rawName, name,
            to, repoUrl, ...rest
        } = await parseOptions(options, command)
        const { ok, template } = await askQuestions(rest, () =>
            spinner.succeed(`检测环境完成！`)
        )
        if (!ok) {
            return process.exit(1)
        }
        spinner.render().start(`正在拉取模板...`)
        const { temp } = await getTemplateRepo({ template, cache, repoUrl })
        spinner.succeed('拉取模板完成！')

        spinner.render().start(`正在创建项目...`)
        await generate(name, temp, to)
        spinner.succeed(`创建项目完成！${name} : ${to}`)
    } catch (err) {
        spinner.fail(err.toString())
    }
    logger.br()
}

create.list = async (options) => {
    const spinner = ora('正在查询模板列表...').start()
    try {
        const { depositUrl } = await parseOptions(options)
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
