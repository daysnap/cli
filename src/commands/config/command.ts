import { createCommand, createRouter, requireAll, requireContext } from '@/core'

export default createCommand((ctx) => {
  ctx.program
    .command('config')
    .description('检查并修改配置')
    .option('-s, --set <path> <value>', '修改配置')
    .option('-g, --get <path>', '查询配置')
    .option('-d, --del <path>', '删除配置')
    .option('-e, --edit', '使用默认编辑器打开配置')
    .option('--json', 'JSON 的形式展示配置')
    .action(
      createRouter(ctx, requireAll(requireContext(__dirname, /\/on.*\.js$/))),
    )
})
