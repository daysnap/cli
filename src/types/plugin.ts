import { Cli } from './cli'

export interface PluginFunction {
  (cli: Cli, ...options: any[]): void
}

export interface Plugin {
  sort?: number
  install: PluginFunction
}
