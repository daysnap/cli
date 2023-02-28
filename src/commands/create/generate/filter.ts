import Metalsmith from 'metalsmith'
import match from 'minimatch'
import { isFunction, isObject } from '@daysnap/utils'
import { MetalsmithHandleOptions } from './types'
import { evaluate } from './eval'

export const filter = async (
  configureFilter: unknown,
  options: MetalsmithHandleOptions,
) => {
  const { files, metalsmith } = options
  if (isObject(configureFilter)) {
    const fileNames = Object.keys(files)
    const data = metalsmith.metadata()
    Object.keys(configureFilter).forEach((glob) => {
      fileNames.forEach((file) => {
        if (match(file, glob, { dot: true })) {
          const condition = configureFilter[glob]
          if (!evaluate(condition, data)) {
            delete files[file]
          }
        }
      })
    })
    return
  }

  if (isFunction(configureFilter)) {
    await configureFilter({ ...options })
  }
}

export const filterFiles = (configureFilter: unknown): Metalsmith.Plugin => {
  return (files, metalsmith, done) => {
    filter(configureFilter, { files, metalsmith })
      .then(() => {
        done(null, files, metalsmith)
      })
      .catch((err) => {
        done(err, files, metalsmith)
      })
  }
}
