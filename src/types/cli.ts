import { Command, ParseOptions } from 'commander'
import { Plugin } from './plugin'

export interface Cli {
  bootstrap: (dirname: string) => void
  use: (plugin: Plugin, ...options: any[]) => Cli
  program: Command
  argv?: string[]
  options?: ParseOptions
}
