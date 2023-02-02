import { Command } from 'commander'
import { ParsedArgs } from 'minimist'
import { Looser } from './looser'

export interface Context {
  readonly program: Command
  readonly argv: string[]
  readonly parseArgv: () => ParsedArgs
  args: any[]
  readonly config: Looser<{
    get<T = any>(key?: string): Promise<T>
    HOME_DSCRC: string
    PROJECT_ROOT_DSCRC: string
    CWD_DSCRC: string
  }>
}
