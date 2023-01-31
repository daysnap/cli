import { program } from 'commander'

// import './commands/npm'

program
  .usage(`<command> [options]`)
  .option('-v, --version', '查看版本信息')
  .helpOption('-h, --help', '显示命令帮助')
  .addHelpCommand('help [command]', '显示命令帮助')

// 帮助信息
// program.commands.forEach((command) =>
//   command.on('--help', () => {
//     console.log(1)
//   }),
// )

// output help information on unknown commands
program.on('command:*', ([cmd]) => {
  program.outputHelp()
  // console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`))
  console.log('xxx')
  process.exitCode = 1
})

program
  .on('option:version', () => console.log('1111'))
  .on('--help', () => console.log(2))

program.parse(process.argv)
