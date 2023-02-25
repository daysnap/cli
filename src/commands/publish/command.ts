import { createCommand, createRouter, requireAll, requireContext } from '@/core'

export default createCommand((ctx) => {
  ctx.program
    .command('husky')
    .description('创建 git hooks')
    .option(`-f --force`, '如果有安装过，则强制覆盖')
    .option(`--lock`, '是否锁定版本，采用本地配置的版本')
    .action(
      createRouter(ctx, requireAll(requireContext(__dirname, /\/on.*\.js$/))),
    )
})
