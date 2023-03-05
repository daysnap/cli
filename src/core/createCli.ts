import { ParseOptions, program } from 'commander'
import minimist from 'minimist'
import { Cli, Context } from '@/types'
import { requireContext } from '@daysnap/require-context'
import { requireConfig } from './requireConfig'
import { prefix } from './prefix'
import { suffix } from './suffix'
import { getConfig, HOME_DSCRC, CWD_DSCRC, PROJECT_ROOT_DSCRC } from './config'

export function createCli(argv: string[], options?: ParseOptions): Cli {
  const bootstrap: Cli['bootstrap'] = (dirname) => {
    use(prefix)

    const rc = requireContext(dirname, /\.js$/)
    rc.keys()
      .map((k) => rc(k).default)
      .filter((item) => item && item.install)
      .sort((x, y) => x.sort - y.sort)
      .forEach(use)

    use(suffix)

    requireConfig(requireContext(dirname, /config.js$/))

    program.parse(argv, options)
  }

  const use: Cli['use'] = (plugin, ...options) => {
    plugin.install(context, ...options)
    return cli
  }

  const parseArgv = () => minimist(argv.slice(3))
  const parseRestArgv = () => parseArgv()._
  const context: Context = {
    program,
    command: program,
    argv,
    parseArgv,
    parseRestArgv,
    args: [],
    options: {},
    configServer: {
      get: getConfig,
      HOME_DSCRC,
      CWD_DSCRC,
      PROJECT_ROOT_DSCRC,
    },
  }

  const cli = { use, context, options, bootstrap }

  return cli
}
