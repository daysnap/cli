import { createRoute, logger } from '@/core'
import inquirer from 'inquirer'
import {
  exec,
  isExists,
  parsePackage,
  readFile,
  spinner,
  writeFile,
} from '@/utils'
import path from 'path'
import chalk from 'chalk'

interface PkgItem {
  name: string
  version: string
}

export default createRoute(async (ctx) => {
  const { configServer, options } = ctx
  const cwd = process.cwd()
  const { gitHooks, extname } = await inquirer.prompt([
    {
      name: 'gitHooks',
      type: 'checkbox',
      message: '请选择需要的git hooks',
      choices: ['lint-staged', 'commitlint'],
      validate: (v) => (v.length ? true : '请选择需要的git hooks'),
    },
    {
      name: 'extname',
      type: 'checkbox',
      message: `lint-staged 选择需要限制的文件类型`,
      choices: ['js', 'jsx', 'ts', 'tsx', 'md'],
      when: (answers) => answers.gitHooks.includes('lint-staged'),
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
  const { devDependencies = {}, pkgPath } = await parsePackage()
  if (!options.force) {
    needInstall = needInstall.filter((item) => {
      const { name } = item
      const version = devDependencies[name]
      if (version) {
        installed.push({ name, version })
      }
      return !version
    })
  }
  spinner.succeed(`解析项目完成！`)

  spinner.start(`开始安装依赖...`)
  let pkgs: string[] = []
  if (needInstall.length) {
    pkgs = needInstall.map(
      ({ name, version }) => `${name}${options.lock ? `@${version}` : ''}`,
    )
    await exec(`npm install -D ${pkgs.join(' ')}`)
  }
  spinner.succeed(`依赖安装完成！`)
  logger.print(
    installed
      .map(({ name, version }) => `${name}@${version}`)
      .concat(...pkgs)
      .map((item) => `${chalk.green('✔')} ${item}`),
  )

  spinner.start(`husky准备...`)
  const pkgContent = await readFile(pkgPath)
  const pkgJson = pkgContent ? JSON.parse(pkgContent) : {}
  if (!pkgJson.scripts) pkgJson.scripts = {}

  // husky
  if (!pkgJson.scripts.prepare) {
    pkgJson.scripts.prepare = `husky install && echo 'export PATH="/usr/local/bin/:$PATH"' > ~/.huskyrc`
    await writeFile(pkgPath, JSON.stringify(pkgJson, null, 2))
  }
  const prepareResult = (await exec(`npm run prepare`)) as string
  if (prepareResult?.includes('skipping install')) {
    throw new Error(prepareResult)
  }

  // lint-staged
  if (gitHooks.includes('lint-staged')) {
    pkgJson.gitHooks = {
      'pre-commit': 'lint-staged',
    }
    pkgJson['lint-staged'] = {
      [`*.{${extname.join(',')}`]: 'eslint --fix',
    }
    await writeFile(pkgPath, JSON.stringify(pkgJson, null, 2))
    if (!(await isExists(path.join(cwd, `.husky/commit-msg`)))) {
      await exec(
        `npx husky add .husky/pre-commit 'npx --no-install lint-staged'`,
      )
    }
  }

  // commitlint
  if (gitHooks.includes('commitlint')) {
    const filepath = path.join(cwd, 'commitlint.config.js')
    if (!(await isExists(filepath))) {
      await writeFile(
        filepath,
        `module.exports = { extends: ['@commitlint/config-conventional'] }`,
      )
    }
    await writeFile(pkgPath, JSON.stringify(pkgJson, null, 2))
    if (!(await isExists(path.join(cwd, `.husky/commit-msg`)))) {
      // bug https://github.com/typicode/husky/issues/1019
      await exec(
        `npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'`,
      )
    }
  }
  spinner.succeed(`husky准备完成！可以玩耍拉！`)
})
