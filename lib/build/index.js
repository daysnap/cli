
const logger = require('../../utils/logger')
const { ora, parsePackage } = require('../../utils/helper')
const { parseTsConfig, parseBabelConfig, parseConfig } = require('./utils')

module.exports = async (options) => {
    const spinner = ora(`开始执行编译打包流程...`).start()
    try {
        const { config: cfg } = options

        spinner.render().start(`解析项目...`)
        const { cwd } = await parsePackage()
        spinner.succeed(`解析项目完成!`)

        spinner.render().start(`解析 .dscrc.js ...`)
        const config = await parseConfig({ cfg, cwd })
        spinner.succeed(`解析 .dscrc.js 完成!`)
        console.log('config => ', config)

        spinner.render().start(`解析 tsconfig.json ...`)
        const tsConfig = await parseTsConfig({ cwd })
        spinner.succeed(`解析 tsconfig.json 完成!`)
        console.log('tsConfig => ', tsConfig)

        spinner.render().start(`解析 .babelrc.js ...`)
        const babelConfig = await parseBabelConfig({ cwd })
        spinner.succeed(`解析 .babelrc.js 完成!`)
        console.log(`babelConfig => `, babelConfig)

        spinner.succeed(`编译打包完成！`)
    } catch (err) {
        console.log(err)
        spinner.fail(err.toString())
    }
    logger.br()
}
