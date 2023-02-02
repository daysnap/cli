import os from 'os'
import path from 'path'

export const HOME_DSCRC = path.join(os.homedir(), '.dscrc')

export const PROJECT_ROOT_DSCRC = path.join(__dirname, '../../../.dscrc')

export const CWD_DSCRC = `${process.cwd()}/.dscrc`

export const DEFAULT_CONFIG = {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  version: require('../../../package.json').version as string,
}
