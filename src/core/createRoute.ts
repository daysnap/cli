import { Context, Route } from '@/types'

export const createRoute = (
  fn: (ctx: Context) => void,
  alias?: string,
): Route => {
  const route: Route = fn as Route

  route.alias = alias

  return route
}
