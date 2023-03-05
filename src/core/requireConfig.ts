import { RC } from '@daysnap/require-context'
import { setConfig } from './config'
import path from 'path'

export function requireConfig(rc: RC) {
  const config = rc.keys().reduce<Record<string, any>>((res, key) => {
    const name = path.basename(path.dirname(key))
    const config = Object.assign({}, rc(key).default, rc(key).config)
    return Object.assign(res, { [name]: config })
  }, {})
  return setConfig(config)
}
