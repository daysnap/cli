
const leven = require('leven')
const chalk = require('chalk')
const logger = require('../../utils/logger')

module.exports = (unknownCmd, options, command) => {
    command.outputHelp()
    logger.error(chalk.red(`未知命令 ${chalk.yellow(unknownCmd)}`)).br()

    // 猜测下相近的命令
    let suggestion
    command.commands.forEach(cmd => {
        const isBestMatch = leven(cmd, unknownCmd) < leven(suggestion || '', unknownCmd)
        if (leven(cmd, unknownCmd) < 3 && isBestMatch) {
            suggestion = cmd
        }
    })
    if (suggestion) {
        logger.error(chalk.red(`你是否想执行 ${chalk.yellow(suggestion)}？`))
    }
}
