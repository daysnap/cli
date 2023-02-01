import { Context } from './context'

export interface PluginFunction {
  (ctx: Context, ...options: any[]): void
}

export interface Plugin {
  sort?: number
  install: PluginFunction
}
