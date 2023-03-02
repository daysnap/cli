import { createCommand } from './createCommand'

export const prefix = createCommand(({ program }) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { name, version } = require('../../package.json')
  program
    .name('dsc')
    .usage(`<command> [options]`)
    .version(`${name} ${version}`, '-v, --version', '查看版本信息')
    .helpOption('-h, --help', '显示命令帮助')
    .addHelpCommand('help [command]', '显示命令帮助')
})
