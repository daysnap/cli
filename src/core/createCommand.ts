import { Plugin, PluginFunction } from '@/types'

export function createCommand(install: PluginFunction, sort?: number): Plugin {
  return {
    sort,
    install,
  }
}
