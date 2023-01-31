import { ParseOptions, program } from 'commander'
import { Cli } from '@/types'

export function createCli(argv?: string[], options?: ParseOptions): Cli {
  const use: Cli['use'] = (plugin, ...options) =>
    plugin.install(cli, ...options)

  const cli = { use, program, argv, options }

  return cli
}
