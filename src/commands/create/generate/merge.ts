import path from 'path'
import shelljs from 'shelljs'
import { isExists } from '@/utils'

export async function merge(src: string) {
  const dir = path.join(src, 'template')

  if (await isExists(dir)) {
    const nm = path.join(src, 'meta/template')
    if (await isExists(nm)) {
      shelljs.cp('-R', nm, src)
    }
    src = dir
  }

  return src
}
