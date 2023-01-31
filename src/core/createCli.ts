import { ParseOptions, program } from 'commander'
import { Cli } from '@/types'
import { requireContext } from '@/utils'

export function createCli(argv?: string[], options?: ParseOptions): Cli {
  const bootstrap: Cli['bootstrap'] = (dirname) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { name, version } = require('../../package.json')
    program.name(name).version(version).usage(`<command> [options]`)

    // 集成 commands
    const ctx = requireContext(dirname, /index\.js$/)
    ctx
      .keys()
      .filter((k) => !k.includes(`${dirname}/index.js`))
      .map((k) => ctx(k).default)
      .filter((item) => item && item.install)
      .sort((x, y) => x.sort - y.sort)
      .forEach(use)

    program.parse(argv, options)
  }

  const use: Cli['use'] = (plugin, ...options) => {
    plugin.install(cli, ...options)
    return cli
  }

  const cli = { use, program, argv, options, bootstrap }

  return cli
}
