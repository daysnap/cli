import path from 'path'
import { isExists } from './fs'

export async function parsePackage(dir = '.') {
  const pkgPath = path.join(process.cwd(), dir, 'package.json')

  if (!(await isExists(pkgPath))) {
    throw new Error(`解析项目错误 package.json 找不到（${pkgPath}）.`)
  }

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return Object.assign({ pkgPath }, require(pkgPath))
}
