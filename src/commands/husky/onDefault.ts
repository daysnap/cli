import { createRoute } from '@/core'
// import { parsePackage, spinner } from '@/utils'
import { sleep } from '@daysnap/utils'
import inquirer from 'inquirer'
import { Config } from './config'
import { exec, parsePackage, spinner } from '@/utils'

interface PkgItem {
  name: string
  version: string
}

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

  spinner.start(`解析项目...`)
  const config = await configServer.get<Record<string, string>>('husky')
  let needInstall = ['husky', ...gitHooks].reduce<PkgItem[]>(
    (res, key: any) => {
      Object.entries(config[key]).forEach(([name, version]) => {
        res.push({ name, version })
      })
      return res
    },
    [],
  )
  // 过滤掉已安装的包
  const installed: PkgItem[] = []
  if (!options.force) {
    const { devDependencies } = await parsePackage()
    needInstall = needInstall.filter((item) => {
      const { name } = item
      const version = devDependencies[name]
      if (version) {
        installed.push({ name, version })
      }
      return version
    })
  }
  spinner.succeed(`解析项目完成！`)

  spinner.start(`开始安装依赖...`)
  if (needInstall.length) {
    const pkgs = needInstall.map(
      ({ name, version }) => `${name}${options.lock ? `@${version}` : ''}`,
    )
    await exec(`npm install -D ${pkgs.join(' ')}`)
  }
  spinner.succeed(`依赖安装完成！`)

  spinner.start(`husky准备...`)
  //
  spinner.succeed(`husky准备完成！可以玩耍拉！`)
})
