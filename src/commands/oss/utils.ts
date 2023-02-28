import path from 'path'
import fs from 'fs'
import { getAbsolutePath } from '@/utils'

export function getBasePath(dir: string) {
  let basePath = getAbsolutePath(dir)
  try {
    const stat = fs.statSync(basePath)
    if (stat.isFile()) {
      basePath = path.dirname(basePath)
    }
  } catch (err) {
    if (basePath.includes('*')) {
      basePath = path.dirname(basePath)
    }
  }
  if (!basePath.endsWith(path.sep)) {
    basePath += path.sep
  }
  return basePath
}
