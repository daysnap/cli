import { DEFAULT_CONFIG } from './default'

export function setConfig(config: any) {
  return Object.assign(DEFAULT_CONFIG, config)
}
