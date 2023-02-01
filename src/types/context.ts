import { Command } from 'commander'
import { ParsedArgs } from 'minimist'

export interface Context {
  readonly program: Command
  readonly argv: string[]
  readonly parseArgv: () => ParsedArgs
  args: any[]
}
