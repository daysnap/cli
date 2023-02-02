import { createRoute } from '@/core'

export const onSet = createRoute((ctx) => {
  const { parseRestArgv, options } = ctx
  const [value] = parseRestArgv()
  const { set: key } = options
  console.log(key, value, options)
})
