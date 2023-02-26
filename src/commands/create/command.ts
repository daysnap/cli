import { createCommand, createRouter, requireAll, requireContext } from '@/core'

export default createCommand((ctx) => {
  ctx.program
    .command('create')
    .description('创建项目')
    .usage('<app-name> -t <template>')
    .option('-t, --template <template>', '指定项目模板')
    .option('-l, --list', '当前的模板列表')
    .option('-c, --cache', '使用线下缓存模板')
    .option('-o, --org <orgname>', '指定组织')
    .option('-d, --deposit <deposit>', '指明使用 gitee 还是 github')
    .option('-u, --username <username>', '指定用户')
    .action(
      createRouter(ctx, requireAll(requireContext(__dirname, /\/on.*\.js$/))),
    )
})
