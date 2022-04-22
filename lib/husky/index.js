
const logger = require('../../utils/logger')
const chalk = require('chalk')
const { ora, parsePackage } = require('../../utils/helper')
const { installPackage, prepare } = require('./utils')

module.exports = async () => {
    const spinner = ora('正在安装husky...').start()
    try {
        spinner.start(`解析项目...`).render()
        const { pkg, ...pkgJson } = await parsePackage()
        spinner.succeed(`解析项目完成！`)

        spinner.start(`安装依赖...`).render()
        const installed = await installPackage(pkgJson)
        spinner.succeed(`依赖安装完成！`)
        logger.print(installed.map(item => `${chalk.green('✔')} ${item}`))

        spinner.start(`husky准备...`)
        await prepare(pkg)
        spinner.succeed(`husky准备完成！可以玩耍拉！`)
    } catch (err) {
        console.log(err)
        spinner.fail(err.toString())
    }
    logger.br()
}
