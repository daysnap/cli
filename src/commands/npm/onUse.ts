import { createRoute } from '@/core'

export const onUse = createRoute((ctx) => {
  console.log('npm use => 1', ctx.args)
}, 'use')
