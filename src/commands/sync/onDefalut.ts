import { createRoute } from '@/core'

export default createRoute(async (ctx) => {
  const { configServer, args } = ctx
  const [pkgs] = args
  console.log('args => ', args)
})
