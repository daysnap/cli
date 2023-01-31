import { createCommand, createRouter } from '@/core'

export * from './routes'

export default createCommand(({ program }) => {
  program
    .command('npm')
    .description('快速切换 npm 源')
    .option('-l, --list', '列出当前支持的 npm 源')
    .option('-u, --use <name>', '切换 npm 源')
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    .action(createRouter(require('./routes')))
})
