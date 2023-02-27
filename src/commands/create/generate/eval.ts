import { logger } from '@/core'

export function evaluate(exp: string, data: Record<string, any>) {
  /* eslint-disable no-new-func */
  const fn = new Function('data', 'with (data) { return ' + exp + '}')
  try {
    return fn(data)
  } catch (e) {
    logger.error(`错误过滤条件：${exp}`)
  }
}
