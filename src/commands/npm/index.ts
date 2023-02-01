import { createCommand, createRouter } from '@/core'

export * from './routes'

export default createCommand(({ program }) => {
  program
    .command('npm')
    .description('快速切换 npm 源')
    .option('-l, --list', '列出当前支持的 npm 源')
    .option('-s, --set <path> <value>', 'set option value')
    .option('-u, --use <name> <value>', '切换 npm 源')
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    .action(createRouter(require('./routes')))

  program
    .command('config [value]')
    .description('inspect and modify the config')
    .option('-g, --get <path>', 'get value from option')
    .option('-s, --set <path> <value>', 'set option value')
    .option('-d, --delete <path>', 'delete option from config')
    .option('-e, --edit', 'open config with default editor')
    .option('--json', 'outputs JSON result only')
    .action((value, options) => {
      console.log('value => ', value, options)
      // require('../lib/config')(value, options)
    })
})
