import dir from 'node-dir'

export function requireAll(
  dirname: string,
  recursive: boolean,
  regExp: RegExp,
) {
  return dir.files(dirname, { sync: true }).filter((file) => file.match(regExp))
}
