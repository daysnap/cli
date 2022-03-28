
const path = require('path')
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
    askQuestions,
} = require('./utils')

const create = async (options, command) => {
    const spinner = ora('正在创建项目...').start()
    try {
        const {
            cache,
            rawName,
            name,
            to,
            repoUrl,
            ...rest
        } = parseOptions(options, command)
        let { ok, template } = await askQuestions(rest, () => spinner.succeed())
        if (!ok) {
            return process.exit(1)
        }
        spinner.render().start(`正在查找模板...`)
        let temp = path.resolve(home, '.dsc-templates', template.replace(/[\/:]/g, '-'))
        if (cache) {
            template = temp
        }
        if (isLocalPath(template)) {
            // 使用本地缓存
            temp = getTemplatePath(template)
            if (!await isExists(temp)) {
                throw new Error(`本地模板没有找到！模板 => ${template}`)
            }
        } else {
            const repo = repoUrl.replace('{repo}', template)
            console.log('repo => ', repo)
            await downloadGitRepo({ repo, dest: temp })
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
