import { createCommand, createRouter, requireAll, requireContext } from '@/core'

export default createCommand((ctx) => {
  ctx.program
    .command('publish')
    .description('发布 npm 包，会自动默认处理 version 版本')
    .option('-r, --registry <registry>', '指定发布源')
    .option('-v, --version <version>', '指定发布的对应版本')
    .option('-m, --message <message>', '提交内容')
    .option('-p, --push', '推送代码到GIT仓库')
    .option('--pnpm', '使用 pnpm workspaces 发包')
    .option(
      '-t, --tag [version]',
      '指定tag版本，指定tag则默认会推送代码到git仓库',
    )
    .action(
      createRouter(
        ctx,
        requireAll(requireContext(__dirname, /[/\\]on.*\.js$/)),
      ),
    )
})
