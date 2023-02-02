import { RC } from './requireContext'

export function requireAll(rc: RC) {
  return rc
    .keys()
    .reduce<Record<string, any>>((res, key) => Object.assign(res, rc(key)), {})
}
