import merge from 'deepmerge'
import ini from 'ini'
import path from 'path'
import { isExists, readFile } from '@/utils'
import { parsePath } from '@daysnap/utils'
import {
  DEFAULT_CONFIG,
  HOME_DSCRC,
  CWD_DSCRC,
  PROJECT_ROOT_DSCRC,
} from './default'

export async function getConfig<T = any>(
  key = '',
  options?: {
    append?: string[]
    range?: string[]
  },
) {
  return parsePath<Promise<T>>(
    await (
      options?.range ?? [
        PROJECT_ROOT_DSCRC,
        HOME_DSCRC,
        CWD_DSCRC,
        `${CWD_DSCRC}.json`,
        `${CWD_DSCRC}.js`,
        ...(options?.append ?? []),
      ]
    ).reduce<Promise<Record<string, any>>>(async (res: any, filepath) => {
      if (await isExists(filepath)) {
        const ext = path.extname(filepath)
        let data: any
        if (['.json', '.js', '.mjs'].includes(ext)) {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          data = require(filepath)
          data = data.default || data
        } else {
          data = ini.parse(await readFile(filepath))
        }
        res = merge(await res, data)
      }
      return await res
    }, Promise.resolve(DEFAULT_CONFIG)),
    key,
  )
}
