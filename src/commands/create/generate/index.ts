import Metalsmith from 'metalsmith'
import path from 'path'
import { getOptions } from './options'
import { askQuestions } from './ask'

export const generate = async (options: {
  src: string
  name: string
  output: string
}) => {
  const { src, name, output } = options
  const opts = await getOptions(name, src)
  const metalsmith = Metalsmith(path.join(src, 'template'))
  metalsmith.use(askQuestions(opts.configureInquirer))
  return new Promise<void>((resolve, reject) => {
    metalsmith
      .clean(false)
      .source('.')
      .destination(output)
      .build((err) => (err ? reject(err) : resolve()))
  })
}
