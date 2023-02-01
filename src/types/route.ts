import { Context } from './context'

export interface Route {
  (ctx: Context): void
  alias?: string
}
