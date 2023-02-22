import { Context, Route } from '@/types'
import { error } from './logger'
import { spinner } from '@/utils'

export const createRouter =
  (ctx: Context, routes: Record<string, Route>) =>
  async (...args: any[]) => {
    const [command, options] = [...args].reverse()
    ctx.args = args.slice(0, -1)
    ctx.options = options
    ctx.command = command

    let next: Route | undefined
    Object.keys(options).find((key) => {
      next = Object.values(routes).find((item) => item.alias === key)

      if (!next) {
        next = routes[key]
      }
      if (!next) {
        next = routes[`on${key[0].toLocaleUpperCase()}${key.substring(1)}`]
      }

      return next
    })

    if (!next && routes['default']) {
      next = routes['default']
    }

    if (!next) {
      return ctx.command.outputHelp()
    }

    try {
      await next(ctx)
    } catch (err) {
      ctx.command.outputHelp()
      error(err)
    }
    if (spinner.isSpinning) {
      spinner.stop()
    }
  }
