import { createRoute } from '@/core'
import dir from 'node-dir'

export const buildFilter = (filtersParam: string | string[]) => {
  const filters =
    filtersParam instanceof Array ? filtersParam.slice() : [filtersParam]
  const filterArray = []

  if (filters.length === 0) return null

  while (filters.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const filter = filters.shift()!
    filterArray.push(
      `\\/?${filter
        .replace(/([./\\])/g, '\\$1')
        .replace(/(\*?)(\*)(?!\*)/g, (match, prefix) => {
          if (prefix === '*') {
            return match
          }
          return '[^\\/]*'
        })
        .replace(/\?/g, '[^\\/]?')
        .replace(/\*\*/g, '.*')
        .replace(/([-+|])/g, '\\$1')}`,
    )
  }
  return new RegExp(`^${filterArray.join('|')}$`, 'i')
}

export default createRoute((ctx) => {
  console.log('11', process.cwd())
  const filterRegExp = buildFilter(['config'])
  const files = dir
    .files(`${process.cwd()}/src`, { sync: true })
    .filter((item) => {
      return filterRegExp?.test(item)
    })
  console.log('files => ', filterRegExp, files)
})
