import { isFunction, isObject } from '@daysnap/utils'
import artTemplate from 'art-template'

artTemplate.defaults.rules[1].test = /\${{([@#]?)[ \t]*(\/?)([\w\W]*?)[ \t]*}}/

export const setupHelper = (configureHelper: unknown) => {
  const imports = artTemplate.defaults.imports
  if (isObject(configureHelper)) {
    Object.keys(configureHelper).forEach((key) => {
      imports[key] = configureHelper[key]
    })
    return
  }
  if (isFunction(configureHelper)) {
    configureHelper({ artTemplate })
  }
}
