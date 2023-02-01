import { Command } from 'commander'
import { ParsedArgs } from 'minimist'

export interface Context {
  program: Command
  argv: string[]
  args: ParsedArgs
}
