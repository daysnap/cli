import { createRoute } from '@/core'

export const onList = createRoute((ctx) => {
  console.log('npm list => ', ctx.args)
}, 'list')
