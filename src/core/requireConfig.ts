import { RC } from './requireContext'
import { setConfig } from './config'

export function requireConfig(rc: RC) {
  const config = rc
    .keys()
    .reduce<Record<string, any>>(
      (res, key) => Object.assign(res, rc(key).default, rc(key).config),
      {},
    )
  return setConfig(config)
}
