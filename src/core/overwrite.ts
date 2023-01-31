import chalk from 'chalk'
import { Command } from 'commander'
import { br, error } from './logger'

const o = (fn: string, cb: (...args: any[]) => void) => (program: Command) => {
  ;(program as any).Command.prototype[fn] = function (...args: any[]) {
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

const unknownOption = o('unknownOption', (optionName) =>
  error(`未知选项 ${chalk.yellow(optionName)} .`),
)

const missingArgument = o('missingArgument', (argName) =>
  error(`缺少必需参数 ${chalk.yellow(`<${argName}>`)} .`),
)

const optionMissingArgument = o('optionMissingArgument', (option, flag) =>
  error(
    `缺少选项的必需参数 ${chalk.yellow(option.flags)}${
      flag ? `，得到了 ${chalk.yellow(flag)}` : ``
    } .`,
  ),
)

export function overwrite(program: Command) {
  unknownOption(program)
  missingArgument(program)
  optionMissingArgument(program)
}
