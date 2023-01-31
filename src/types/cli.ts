import { Command, ParseOptions } from 'commander'
import { Plugin } from './plugin'

export interface Cli {
  use: (plugin: Plugin, ...options: any[]) => void
  program: Command
  argv?: string[]
  options?: ParseOptions
}
