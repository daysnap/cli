
const chalk = require('chalk')
const { error, br } = require('../utils/logger')

const exit = (code = 1) =>  process.exit(code)

const overwrite = (fn, cb) => program => {
    program.Command.prototype[fn] = function (...args) {
        console.log('args => ', args)
        if (fn === 'unknownOption' && this._allowUnknownOption) {
            console.log('111')
            return
        }
        // this.outputHelp()
        // if (args.includes('command')) {
        //     return exit(1)
        // }
        cb && cb.call(this, ...args)
        br()
        exit(1)
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
