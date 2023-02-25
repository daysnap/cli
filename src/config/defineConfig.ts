import { Config as HuskyConfig } from '@/commands/husky/config'
import { Config as NpmConfig } from '@/commands/npm/config'
import { Config as OssConfig } from '@/commands/oss/config'
import { Config as PublishConfig } from '@/commands/publish/config'

import { DeepPartial } from '@/types'

export interface Config {
  npm: NpmConfig
  oss: OssConfig
  husky: HuskyConfig
  publish: PublishConfig
}

export const defineConfig = (config: DeepPartial<Config>) => config
