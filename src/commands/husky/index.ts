import { program } from 'commander'

program
  .command('husky')
  .description('创建 git 提交钩子')
  .action(() => {
    console.log('创建 husky 了')
  })
