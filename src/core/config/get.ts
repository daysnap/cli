import merge from 'deepmerge'
import ini from 'ini'
import { isExists, readFile } from '@/utils'
import { parsePath } from '@daysnap/utils'
import {
  DEFAULT_CONFIG,
  HOME_DSCRC,
  CWD_DSCRC,
  PROJECT_ROOT_DSCRC,
} from './default'

export async function getConfig<T = any>(key = '') {
  return parsePath<Promise<T>>(
    [PROJECT_ROOT_DSCRC, HOME_DSCRC, CWD_DSCRC].reduce<Record<string, any>>(
      async (res, filepath) => {
        if (await isExists(filepath)) {
          res = merge(res, ini.parse(await readFile(filepath)))
        }
        return res
      },
      DEFAULT_CONFIG,
    ),
    key,
  )
}
