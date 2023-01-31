import { createCommand } from '@/core'

export default createCommand(({ program }) => {
  program
    .command('npm')
    .description('快速切换 npm 源')
    .option('-l, --list', '列出当前支持的 npm 源')
    .option('-u, --use <name>', '切换 npm 源')
    .action(() => {
      console.log('执行 npm')
    })
}, 2)
