import { Config as NpmConfig } from '@/commands/npm/config'
import { Config as OssConfig } from '@/commands/oss/config'
import { DeepPartial } from '@/types'

export type Config = NpmConfig & OssConfig

export const defineConfig = (config: DeepPartial<Config>) => config
