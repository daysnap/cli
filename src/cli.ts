import path from 'path'
import { createCli, overwrite } from '.'

createCli(process.argv)
  .use(overwrite)
  .bootstrap(path.join(__dirname, './commands'))
