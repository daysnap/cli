import { Route } from '@/types'

export const createRouter =
  (routes: Route | Record<string, Route>) =>
  (...args: any[]) => {
    console.log('routes => ', routes)
    console.log('args => ', args[0], args.length)
  }
