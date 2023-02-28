import Metalsmith from 'metalsmith'
import path from 'path'
import { isFunction } from '@daysnap/utils'
import { getOptions } from './options'
import { askQuestions } from './ask'
import { filterFiles } from './filter'
import { renderTemplate } from './render'
import { setupHelper } from './handlebars'

export const generate = async (options: {
  src: string
  name: string
  output: string
}) => {
  const { src, name, output } = options
  const opts = await getOptions(name, src)
  const metalsmith = Metalsmith(path.join(src, 'template'))
  const data = Object.assign(metalsmith.metadata(), {
    destDirName: name,
    name,
    output,
    inPlace: output === process.cwd(),
  })

  setupHelper(opts.configureHelper || opts.helpers)

  metalsmith
    .use(askQuestions(opts.configureInquirer || opts.prompts, { name }))
    .use(filterFiles(opts.configureFilter || opts.filters, { name }))
    .use(renderTemplate(opts.skipInterpolation))

  return new Promise<void>((resolve, reject) => {
    metalsmith
      .clean(false)
      .source('.')
      .destination(output)
      .build((err) => (err ? reject(err) : resolve()))
  }).then(() => {
    if (isFunction(opts.complete)) {
      return opts.complete(data)
    }
  })
}
