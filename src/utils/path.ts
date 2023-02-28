import path from 'path'

export function normalizePath(filepath: string) {
  return filepath.split(path.win32.sep).join(path.posix.sep)
}

export function getAbsolutePath(filepath: string) {
  let res: string
  if (path.isAbsolute(filepath)) {
    res = path.normalize(filepath)
  } else {
    const basePath = path.normalize(path.resolve(''))
    res = path.join(basePath, path.normalize(filepath))
  }

  // return res.replace(/[-^$*+?.()|[\]{}]/g, '\\$&')
  return res.replace('/**', '/').replace('/*', '/')
}
