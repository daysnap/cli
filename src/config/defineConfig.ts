import { Config as NpmConfig } from '@/commands/npm/config'
import { DeepPartial } from '@/types'

export type Config = NpmConfig

export const defineConfig = (config: DeepPartial<Config>) => config
