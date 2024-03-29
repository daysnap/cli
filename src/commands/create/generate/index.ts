import Metalsmith from 'metalsmith'
import chalk from 'chalk'
import { logger } from '@/core'
import { exec } from '@/utils'
import { isFunction } from '@daysnap/utils'
import { getOptions } from './options'
import { askQuestions } from './ask'
import { filterFiles } from './filter'
import { renderTemplate } from './render'
import { setupHelper } from './art-template'
import { merge } from './merge'

export const generate = async (options: {
  src: string
  name: string
  output: string
}) => {
  const { src, name, output } = options
  const { author, ...opts } = await getOptions(name, src)

  const metalsmith = Metalsmith(await merge(src))
  const data = Object.assign(metalsmith.metadata(), {
    author,
    destDirName: name,
    name,
    output,
    inPlace: output === process.cwd(),
  })

  setupHelper(opts.configureHelper || opts.helpers)

  metalsmith
    .use(askQuestions(opts.configureInquirer || opts.prompts))
    .use(filterFiles(opts.configureFilter || opts.filters))
    .use(renderTemplate(opts.skipInterpolation))

  return new Promise<void>((resolve, reject) => {
    metalsmith
      .clean(false)
      .source('.')
      .destination(output)
      .build((err) => (err ? reject(err) : resolve()))
  }).then(() => {
    if (isFunction(opts.complete)) {
      return opts.complete(data, { logger, chalk, exec })
    }
  })
}
