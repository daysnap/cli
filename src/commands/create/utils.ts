import { geneDashLine, isExists } from '@/utils'
import { padding } from '@daysnap/utils'
import fetch from 'node-fetch'
import inquirer from 'inquirer'
import path from 'path'
import os from 'os'
import rimraf from 'rimraf'
import clone from 'git-clone/promise'
import { Config } from './config'
import { RepoItem } from './types'

export async function getReposList(url: string): Promise<any> {
  return await fetch(url).then((res) => res.json())
}

export const formatReposToMessages = (repos: RepoItem[]) => {
  const data = repos.map(({ name, description }) => ({ name, description }))
  const length = Math.max(...data.map((item) => item.name.length)) + 3
  return data.map((item, index) => {
    const { name, description } = item
    return padding(
      `${index + 1}. ${name}${geneDashLine(name, length)}${description}`,
      4,
    )
  })
}

export const parseUrl = (options: Config) => {
  let { username, orgname, depositUrls, repoUrls, deposit } = options
  const type = !orgname && username ? 'users' : 'orgs'
  if (orgname) {
    username = orgname
  }
  const depositUrl = (depositUrls[deposit] || '')
    .replace('{type}', type)
    .replace('{username}', username)
  const repoUrl = (repoUrls[deposit] || '').replace('{username}', username)
  return { depositUrl, repoUrl }
}

export const parseName = (rowName: string) => {
  const inPlace = !rowName || rowName === '.' || rowName === './'
  const name = inPlace ? path.relative('../', process.cwd()) : rowName
  const output = path.resolve(rowName || '.')
  return { name, output, inPlace }
}

export const askConfirmAndTemplate = async ({
  inPlace,
  templates,
}: {
  inPlace: boolean
  templates: RepoItem[]
}) => {
  return inquirer.prompt<{
    ok: boolean
    template: string
  }>([
    {
      type: 'confirm',
      message: `在当前目录中生成项目？`,
      name: 'ok',
      when: inPlace,
      default: true,
    },
    {
      type: 'list',
      message: `请选择一个模板项目：`,
      name: 'template',
      when: ({ ok = true }) => {
        return ok && !!templates.length
      },
      choices: templates,
    },
  ])
}

export const isLocalPath = (p: string) => /^[./]|(^[a-zA-Z]:)/.test(p)

export const getTemplatePath = (p: string) =>
  path.isAbsolute(p) ? p : path.normalize(path.join(process.cwd(), p))

export const getTemplateRepo = async (options: {
  template: string
  cache?: boolean
  repoUrl: string
}) => {
  let { template, cache = false, repoUrl } = options
  let src = path.resolve(
    os.homedir(),
    '.dsc-templates',
    template.replace(/[/:]/g, '-'),
  )
  if (cache) {
    template = src
  }
  if (isLocalPath(template)) {
    src = getTemplatePath(template)
    if (!(await isExists(src))) {
      throw new Error(`本地模板没有找到！模板路径 => ${src}`)
    }
  } else {
    const repo = repoUrl.replace('{repo}', template)
    if (await isExists(src)) {
      rimraf.sync(src)
    }
    await clone(repo, src)
  }

  return src
}
