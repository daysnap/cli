import { createRoute } from '@/core'
import { parsePackage, spinner } from '@/utils'
import fetch from 'node-fetch'
import { sleep } from '@daysnap/utils'

const sync = async (name: string) => {
  const url = `https://registry-direct.npmmirror.com/${name}/sync?publish=false&nodeps=false`
  const { logId }: { ok: boolean; logId: string } = await fetch(url, {
    method: 'put',
  }).then((res) => res.json())
  await showState(name, logId)
}

const showState = async (name: string, logId: string) => {
  const url = `https://registry-direct.npmmirror.com/${name}/sync/log/${logId}?offset=0`
  const { log }: { ok: string; log: string } = await fetch(url).then((res) =>
    res.json(),
  )

  spinner.text = `同步 ${name} 状态：${log}`
  if (log && log.includes('[done] Sync')) {
    return await sleep(1000)
  }

  return new Promise<void>((resolve) => {
    setTimeout(async () => {
      await showState(name, logId)
      resolve()
    }, 1000)
  })
}

export default createRoute(async (ctx) => {
  const names: string[] = ctx.args[0]

  spinner.start(`正在同步...`)

  if (!names.length) {
    const { name } = await parsePackage()
    if (name) {
      names.push(name)
    }
  }

  if (names.length === 0) {
    throw new Error('未指定需要同步的 npm 包名')
  }

  for (let i = 0, len = names.length; i < len; i++) {
    await sync(names[i])
  }
  spinner.succeed(`${names.join(' ')} 同步完成`)
})
