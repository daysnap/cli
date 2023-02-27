import Metalsmith from 'metalsmith'
import path from 'path'
import { getOptions } from '@/commands/create/generate/options'

export const generate = async (options: {
  src: string
  name: string
  output: string
}) => {
  let { src, name, output } = options
  console.log('generate => ', src, name, output)
  const metalsmith = Metalsmith(path.join(src, 'template'))
  console.log(metalsmith.metadata())
  // metalsmith.use()
  const opts = await getOptions(name, src)
}
