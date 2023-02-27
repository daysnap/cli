import Metalsmith from 'metalsmith'
import path from 'path'
import { getOptions } from './options'
import { ask, askQuestions } from './ask'

export const generate = async (options: {
  src: string
  name: string
  output: string
}) => {
  const { src, name, output } = options
  const opts = await getOptions(name, src)
  const res = await ask(opts.configureInquirer)
  console.log('res => ', res)
  // const metalsmith = Metalsmith(path.join(src, 'template'))
  // metalsmith.use(askQuestions(opts.configureInquirer))
}
