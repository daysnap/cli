import merge from 'deepmerge'
import path from 'path'
import { isExists } from '@/utils'
import { Looser } from '@/types'
import { isArray, isObject } from '@daysnap/utils'
import { getGitUser } from './gitUser'

export const getMetadata = async (dir: string) => {
  return [
    path.join(dir, 'meta.json'),
    path.join(dir, 'meta.js'),
    path.join(dir, 'meta/index.js'),
  ].reduce<Record<string, any>>(async (res, filepath) => {
    if (await isExists(filepath)) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      res = merge(await res, require(filepath))
    }
    return res
  }, {})
}

export const getOptions = async (name: string, dir: string) => {
  const opts = await getMetadata(dir)

  setDefault(opts, {
    key: 'name',
    val: name,
    message: '项目名',
  })

  const author = getGitUser()
  if (author) {
    setDefault(opts, {
      key: 'author',
      val: author,
      message: '作者',
    })
  }

  return opts
}

function setDefault(
  opts: Looser<{ configureInquirer?: unknown }>,
  options: {
    key: string
    val: string
    message: string
  },
) {
  const { key, val, ...rest } = options
  if (!opts.configureInquirer) {
    opts.configureInquirer = []
  }
  const prompts = opts.configureInquirer
  if (isObject(prompts)) {
    if (!prompts[key] || !isObject(prompts[key])) {
      prompts[key] = {
        type: 'string',
        default: val,
        ...rest,
      }
    } else {
      prompts[key].default = val
    }
  } else if (isArray(prompts)) {
    let prompt = prompts.find((item) => item.name === key)
    if (!prompt) {
      prompt = { type: 'string', ...rest }
      prompts.unshift(prompt)
    }
    prompt.default = val
  }
}
