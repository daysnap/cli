import { Context, Route } from '@/types'

export const createRouter =
  (ctx: Context, routes: Record<string, Route>) =>
  (...args: any[]) => {
    const [, options] = [...args].reverse()
    ctx.args = args.slice(0, -1)

    let next: Route | undefined
    Object.keys(options).find((key) => {
      next = Object.values(routes).find((item) => item.alias === key)

      if (!next) {
        next = routes[key]
      }

      return next
    })

    if (routes['default']) {
      next = routes['default']
    }

    if (!next) {
      return ctx.program.outputHelp()
    }

    next(ctx)
  }
