import chalk from 'chalk'
import { padding } from '@/utils'

export const info = (...args: any[]) => {
  console.log(...args)
  return logger
}

export const br = () => info('')

export const print = (messages: any) => {
  for (const message of messages) info(message)
  return logger
}

export const error = (err: any) => {
  console.error(`  ${chalk.bgRed(padding('ERROR'))} ${chalk.red(err)}`)
  if (err instanceof Error) {
    console.error(err.stack)
  }
  return logger
}

export const success = (msg: any) => {
  console.log(`  ${chalk.bgGreenBright(padding('SUCCESS'))} ${msg}`)
  return logger
}

export const logger = {
  br,
  info,
  print,
  error,
  success,
}
