import { program } from 'commander'
import { defineCommand } from 'src/core'

console.log('npmnpmnpmnpmnpm')
program
  .usage('npm')
  .description('快速切换 npm 源')
  .option('-l, --list', '列出当前支持的 npm 源')
  .option('-u, --use <name>', '切换 npm 源')
  .action(() => {
    console.log('切换 npm 源了')
  })

export default defineCommand()
