import Metalsmith from 'metalsmith'
import multimatch from 'multimatch'
import consolidate from 'consolidate'
import { isString } from '@daysnap/utils'
import { MetalsmithHandleOptions } from './types'

const handlebarsRender = (str: string, data: Record<string, any>) =>
  new Promise<string>((resolve, reject) => {
    consolidate.handlebars.render(str, data, (err, res) => {
      err ? reject(err) : resolve(res)
    })
  })

export const render = async (
  skipInterpolation: string | string[],
  options: Pick<MetalsmithHandleOptions, 'metalsmith' | 'files'>,
) => {
  const { metalsmith, files } = options
  const metadata = metalsmith.metadata()
  const fileNames = Object.keys(files)
  for (let i = 0, len = fileNames.length; i < len; i++) {
    const fileName = fileNames[i]
    if (
      skipInterpolation &&
      multimatch([fileName], skipInterpolation, { dot: true }).length
    ) {
      continue
    }
    const file = files[fileName]
    const str = file.contents.toString()
    if (!/{{([^{}]+)}}/g.test(str)) {
      continue
    }
    const content = await handlebarsRender(str, metadata)
    file.contents = Buffer.from(content)
  }
}

export const renderTemplate = (
  skipInterpolation: string | string[],
): Metalsmith.Plugin => {
  if (isString(skipInterpolation)) {
    skipInterpolation = [skipInterpolation]
  }
  return (files, metalsmith, done) => {
    render(skipInterpolation, { files, metalsmith })
      .then(() => {
        done(null, files, metalsmith)
      })
      .catch((err) => {
        done(err, files, metalsmith)
      })
  }
}
