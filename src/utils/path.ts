import path from 'path'

export function normalizePath(filepath: string) {
  return filepath.split(path.win32.sep).join(path.posix.sep)
}

export function getAbsolutePath(filepath: string) {
  if (path.isAbsolute(filepath)) {
    return normalizePath(filepath)
  }

  const basePath = normalizePath(path.resolve('')).replace(
    /[-^$*+?.()|[\]{}]/g,
    '\\$&',
  )

  return path.join(basePath, normalizePath(filepath))
}
