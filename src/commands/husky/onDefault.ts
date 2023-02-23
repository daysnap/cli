import { createRoute } from '@/core'
// import { parsePackage, spinner } from '@/utils'
import { sleep } from '@daysnap/utils'
import inquirer from 'inquirer'
import { Config } from './config'

export default createRoute(async (ctx) => {
  const { configServer, options } = ctx
  const { gitHooks } = await inquirer.prompt([
    {
      type: 'checkbox',
      message: '请选择需要的git hooks',
      name: 'gitHooks',
      choices: ['lint-staged', 'commitlint'],
      validate: (v) => (v.length ? true : '请选择需要的git hooks'),
    },
  ])

  const config = await configServer.get<Config>('husky')
  const needInstall = []

  // spinner.succeed(`${names.join(' ')} 同步完成`)
})
