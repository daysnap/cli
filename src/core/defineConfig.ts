/**
 * 配置文件
 */
export interface Config {
  npm: {
    registry: Record<string, any>
  }
}

// TODO
export const config: Config = {
  npm: {
    registry: {},
  },
}

export function defineConfig(config: Partial<Config>) {
  return config
}
