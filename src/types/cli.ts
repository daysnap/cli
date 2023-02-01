import { ParseOptions } from 'commander'
import { Plugin } from './plugin'
import { Context } from './context'

export interface Cli {
  bootstrap: (dirname: string) => void
  use: (plugin: Plugin, ...options: any[]) => Cli
  context: Context
  options?: ParseOptions
}
