import { Command } from 'commander'
import { ParsedArgs } from 'minimist'
import { Looser } from './Looser'

export interface Context {
  readonly program: Command
  command: Command
  readonly argv: string[]
  readonly parseArgv: () => ParsedArgs
  readonly parseRestArgv: () => ParsedArgs['_']
  args: any[]
  options: Record<string, any>
  readonly configServer: Looser<{
    get<T = any>(
      path?: string,
      options?: {
        append?: string[]
        range?: string[]
      },
    ): Promise<T>
    HOME_DSCRC: string
    PROJECT_ROOT_DSCRC: string
    CWD_DSCRC: string
  }>
}
