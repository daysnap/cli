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

export async function getConfig<T = any>(path = '') {
  return parsePath<Promise<T>>(
    await [PROJECT_ROOT_DSCRC, HOME_DSCRC, CWD_DSCRC].reduce<
      Promise<Record<string, any>>
    >(async (res: any, filepath) => {
      if (await isExists(filepath)) {
        res = merge(await res, ini.parse(await readFile(filepath)))
      }
      return await res
    }, Promise.resolve(DEFAULT_CONFIG)),
    path,
  )
}
