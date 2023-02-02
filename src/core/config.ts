import path from 'path'

export const DSCRC = path.join(
  process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'] ?? '',
  '.dscrc',
)

export interface Config {
  version: string

  DSCRC: string
}

export const config: Config = {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  version: require('../../package.json').version,

  // 配置文件路径
  DSCRC,
}
