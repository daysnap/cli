import inquirer, { Question } from 'inquirer'
import { isArray, isObject, isFunction } from '@daysnap/utils'
import Metalsmith from 'metalsmith'
import { MetalsmithHandleOptions } from './types'

export const ask = async (
  configureInquirer: unknown,
  options: MetalsmithHandleOptions,
) => {
  if (isObject(configureInquirer)) {
    const prompts = Object.entries(configureInquirer).reduce<Question[]>(
      (res, [name, value]) => [...res, { name, ...value }],
      [],
    )
    return inquirer.prompt(prompts)
  }
  if (isArray(configureInquirer)) {
    return inquirer.prompt(configureInquirer)
  }
  if (isFunction(configureInquirer)) {
    return await configureInquirer({ inquirer, ...options })
  }
}

export const askQuestions = (
  configureInquirer: unknown,
  options: { name: string },
): Metalsmith.Plugin => {
  return (files, metalsmith, done) => {
    ask(configureInquirer, { files, metalsmith, ...options })
      .then((res) => {
        Object.assign(metalsmith.metadata(), res)
        done(null, files, metalsmith)
      })
      .catch((err) => {
        done(err, files, metalsmith)
      })
  }
}
