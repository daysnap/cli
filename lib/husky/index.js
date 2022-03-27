
const logger = require('../../utils/logger')
const { ora, parsePackage } = require('../../utils/helper')
const { installPackage } = require('./utils')

module.exports = async () => {
    const spinner = ora('正在安装husky...').start()
    try {
        spinner.start(`解析项目...`).render()
        const pkg = await parsePackage()
        spinner.succeed(`解析项目完成！`)

        spinner.start(`安装依赖...`).render()
        await installPackage(pkg)
        spinner.succeed(`依赖安装完成！`)


    } catch (err) {
        spinner.fail(err.toString())
    }
    logger.br()
}
