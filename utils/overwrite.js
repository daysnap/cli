
const chalk = require('chalk')
const { error, br } = require('../utils/logger')

const overwrite = (fn, cb) => program => {
    program.Command.prototype[fn] = function (...args) {
        if (fn === 'unknownOption' && this._allowUnknownOption) {
            return
        }
        this.outputHelp()
        if (args.includes('command')) {
            return process.exit(1)
        }
        cb && cb.call(this, ...args)
        br()
        process.exit(1)
    }
}

const o = m => error(chalk.red(m))

const unknownOption = overwrite('unknownOption', optionName =>
    o(`未知选项 ${chalk.yellow(optionName)} .`)
)

const missingArgument = overwrite('missingArgument', argName =>
    o(`缺少必需参数 ${chalk.yellow(`<${argName}>`)} .`)
)

const optionMissingArgument = overwrite('optionMissingArgument', (option, flag) =>
    o(`缺少选项的必需参数 ${chalk.yellow(option.flags)}${flag ? `，得到了 ${chalk.yellow(flag)}` : ``} .`)
)

module.exports = program => {
    unknownOption(program)
    missingArgument(program)
    optionMissingArgument(program)
}
