import { ParseOptions, program } from 'commander'
import { Cli } from '@/types'
import { requireContext } from '@/utils'
import { prefix } from './prefix'
import { suffix } from './suffix'

export function createCli(argv?: string[], options?: ParseOptions): Cli {
  const bootstrap: Cli['bootstrap'] = (dirname) => {
    use(prefix)

    // 集成 commands
    const ctx = requireContext(dirname, /index\.js$/)
    ctx
      .keys()
      .filter((k) => !k.includes(`${dirname}/index.js`))
      .map((k) => ctx(k).default)
      .filter((item) => item && item.install)
      .sort((x, y) => x.sort - y.sort)
      .forEach(use)

    use(suffix)

    program.parse(argv, options)
  }

  const use: Cli['use'] = (plugin, ...options) => {
    plugin.install(cli, ...options)
    return cli
  }

  const cli = { use, program, argv, options, bootstrap }

  return cli
}
