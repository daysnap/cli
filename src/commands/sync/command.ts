import { createCommand, createRouter, requireAll, requireContext } from '@/core'

export default createCommand((ctx) => {
  ctx.program
    .command('sync [pkgs...]')
    .description(
      '同步更新 npm 包到淘宝源，解决发布之后，淘宝源没有立即更新的问题',
    )
    .action(
      createRouter(ctx, requireAll(requireContext(__dirname, /\/on.*\.js$/))),
    )
})
