import merge from 'deepmerge'
import path from 'path'
import { isExists } from '@/utils'

export const getMetadata = async (dir: string) => {
  return [path.join(dir, 'meta.json'), path.join(dir, 'meta.js')].reduce<
    Record<string, any>
  >(async (res, filepath) => {
    if (await isExists(filepath)) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      res = merge(await res, require(filepath))
    }
    return res
  }, {})
}

export const getOptions = async (name: string, dir: string) => {
  const opts = await getMetadata(dir)
  console.log('opts => ', opts)
}
