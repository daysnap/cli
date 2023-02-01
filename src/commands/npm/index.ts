import { createRoute } from '@/core'

export const onList = createRoute((ctx) => {
  console.log('npm list => 1', ctx.args)
}, 'list')
