
const logger = require('../../utils/logger')
const { ora, parsePackage, exec } = require('../../utils/helper')

module.exports = async () => {
    const spinner = ora('正在安装husky...').start()
    try {
        spinner.start(`解析项目...`).render()
        const { devDependencies, dependencies } = await parsePackage()
        spinner.succeed(`解析项目完成！`)




    } catch (err) {
        spinner.fail(err.toString())
    }
    logger.br()
}
