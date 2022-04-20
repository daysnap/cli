
const logger = require('../../utils/logger')
const { ora, parsePackage } = require('../../utils/helper')
const { parseTsConfig, parseConfig, createTask, build } = require('./utils')

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
        const tasks = Object.keys(config).map(type => {
            const { src, dest } = config[type]
            return createTask({ src, tsConfig, dest, type, cwd })
        })
        console.log('task => ', tasks)
        await build(tasks)

        spinner.succeed(`解析 .babelrc.js 完成!`)

        spinner.succeed(`编译打包完成！`)
    } catch (err) {
        console.log(err)
        spinner.fail(err.toString())
    }
    logger.br()
}
