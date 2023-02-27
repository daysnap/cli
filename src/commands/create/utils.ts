import { geneDashLine } from '@/utils'
import { padding } from '@daysnap/utils'
import fetch from 'node-fetch'
import path from 'path'
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

export const parseAppName = (appname: string) => {
  const inPlace = !appname || appname === '.' || appname === './'
  const name = inPlace ? path.relative('../', process.cwd()) : appname
  const output = path.resolve(appname || '.')
  return { name, output, inPlace }
}
