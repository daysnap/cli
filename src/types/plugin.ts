import { Cli } from './cli'

export interface Plugin {
  install: (cli: Cli, ...options: any[]) => void
}
