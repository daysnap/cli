import path from 'path'

export function normalizePath(filepath: string) {
  return filepath.split(path.win32.sep).join(path.posix.sep)
}

export function getAbsolutePath(filepath: string) {
  let res: string
  if (path.isAbsolute(filepath)) {
    res = normalizePath(filepath)
  } else {
    const basePath = normalizePath(path.resolve(''))
    res = path.join(basePath, normalizePath(filepath))
  }

  return res.replace(/[-^$*+?.()|[\]{}]/g, '\\$&')
}
