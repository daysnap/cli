import Metalsmith from 'metalsmith'
import consolidate from 'consolidate'
import { isString } from '@daysnap/utils'

export const render = async () => {
  //
}

export const renderTemplate = (
  skipInterpolation: string | string[],
): Metalsmith.Plugin => {
  if (isString(skipInterpolation)) {
    skipInterpolation = [skipInterpolation]
  }
  return (files, metalsmith, done) => {
    // consolidate.handlebars.render()
  }
}
