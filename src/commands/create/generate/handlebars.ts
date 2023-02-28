import Handlebars from 'handlebars'
import { isFunction, isObject } from '@daysnap/utils'

Handlebars.registerHelper('if_eq', function (a: any, b: any, opts: any) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return a === b ? opts.fn(this) : opts.inverse(this)
})

Handlebars.registerHelper('unless_eq', function (a: any, b: any, opts: any) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return a === b ? opts.inverse(this) : opts.fn(this)
})

export const setupHelper = (configureHelper: unknown) => {
  if (isObject(configureHelper)) {
    Object.keys(configureHelper).forEach((key) => {
      Handlebars.registerHelper(key, configureHelper[key])
    })
    return
  }
  if (isFunction(configureHelper)) {
    configureHelper({ Handlebars })
  }
}
