import fs from 'fs'

export function requireFile<T = any>(filepath: string): T | undefined {
  const stat = fs.statSync(filepath)
  if (stat.isFile()) {
    return require(filepath)
  }
}
