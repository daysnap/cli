import { program } from 'commander'

program
  .usage(`<command> [options]`)
  .option('-v, --version', '查看版本信息')
  .helpOption('-h, --help', '显示命令帮助')
  .addHelpCommand('help [command]', '显示命令帮助')

// 处理未知命令
program.arguments('<command>').action(() => {
  console.log('22')
})

// 帮助信息
program.commands.forEach((command) =>
  command.on('--help', () => {
    console.log(1)
  }),
)

program.parse(process.argv)
