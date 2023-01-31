import chalk from 'chalk'
import leven from 'leven'
import { padding } from '@/utils'
import { createCommand } from './createCommand'
import { logger } from './logger'

export const suffix = createCommand(({ program }) => {
  // 未知命令
  program.on('command:*', ([unknownCmd]) => {
    program.outputHelp()

    logger.error(`未知命令 ${chalk.yellow(unknownCmd)}.`).br()

    // 猜测下相近的命令
    let suggestion = ''

    program.commands
      .map((cmd) => cmd.name())
      .forEach((cmd) => {
        const isBestMatch =
          leven(cmd, unknownCmd) < leven(suggestion || '', unknownCmd)
        if (leven(cmd, unknownCmd) < 3 && isBestMatch) {
          suggestion = cmd
        }
      })

    if (suggestion) {
      logger.error(`你是否想执行 ${chalk.yellow(suggestion)}？`)
    }

    process.exitCode = 1
  })

  // 帮助信息
  program.commands.forEach((command) => command.on('--help', logger.br))

  program.on('--help', () =>
    logger
      .br()
      .info(
        padding(
          `执行 ${chalk.cyan(`dsc <command> -h`)} 查看指定命令的使用方法.`,
          2,
        ),
      )
      .br(),
  )
})
