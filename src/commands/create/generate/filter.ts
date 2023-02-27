import Metalsmith from 'metalsmith'
import { MetalsmithHandleOptions } from './types'
import { isObject } from '@daysnap/utils'

export const filter = async (
  configureFilter: unknown,
  options: MetalsmithHandleOptions,
) => {
  const { files } = options
  if (isObject(configureFilter)) {
    //
  }
}

export const filterFiles = (
  configureFilter: unknown,
  options: { name: string },
): Metalsmith.Plugin => {
  return (files, metalsmith, done) => {
    filter(configureFilter, { files, metalsmith, ...options })
      .then(() => {
        done(null, files, metalsmith)
      })
      .catch((err) => {
        done(err, files, metalsmith)
      })
  }
}
