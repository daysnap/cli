import Metalsmith from 'metalsmith'
import path from 'path'
import { getOptions } from './options'
import { askQuestions } from './ask'
import { filterFiles } from './filter'
import { renderTemplate } from '@/commands/create/generate/render'

export const generate = async (options: {
  src: string
  name: string
  output: string
}) => {
  const { src, name, output } = options
  const opts = await getOptions(name, src)
  const metalsmith = Metalsmith(path.join(src, 'template'))
  metalsmith
    .use(askQuestions(opts.configureInquirer || opts.prompts, { name }))
    .use(filterFiles(opts.configureFilter || opts.filters, { name }))
    .use(renderTemplate(opts.skipInterpolation || opts.filters))

  return new Promise<void>((resolve, reject) => {
    metalsmith
      .clean(false)
      .source('.')
      .destination(output)
      .build((err) => (err ? reject(err) : resolve()))
  })
}
