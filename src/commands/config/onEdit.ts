import ini from 'ini'
import { createRoute } from '@/core'
import { isExists, writeFile } from '@/utils'
import { launch } from '@/utils/launch'

export const onEdit = createRoute(async (ctx) => {
  const { configServer } = ctx

  if (await isExists(configServer.CWD_DSCRC)) {
    const config = await configServer.get()
    await writeFile(configServer.CWD_DSCRC, ini.stringify(config))
  }

  await launch(configServer.CWD_DSCRC)
})
