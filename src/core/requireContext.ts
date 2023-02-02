import dir from 'node-dir'

export function requireContext(dirname: string, regExp: RegExp) {
  const keys = dir
    .files(dirname, { sync: true })
    .filter((file) => file.match(regExp))

  const r = (id: string) => require(id)

  r.keys = () => keys

  return r
}
