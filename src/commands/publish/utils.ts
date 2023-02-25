import { exec, writeFile } from '@/utils'
import { sleep } from '@daysnap/utils'

// 查询线上版本号
export async function getOnlineVersion(options: {
  name: string
  registry: string
}) {
  const { name, registry } = options
  let version, err
  try {
    version = await exec(`npm view ${name} version --registry ${registry}`)
  } catch (e: any) {
    if (!(e && e.message && e.message.includes('E404'))) {
      err = e
    }
  }
  if (err) {
    throw err
  }
  return version
}

// 写入版本
export async function updatePackage({
  version,
  pkgPath,
}: {
  version: string
  pkgPath: string
}) {
  await sleep(500)
  const content = JSON.stringify(
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    Object.assign(require(pkgPath), { version }),
    null,
    2,
  )
  await writeFile(pkgPath, content)
}

// 发布版本
export async function publishPackage(registry: string) {
  await exec(`npm publish --registry ${registry}`)
}

// 推送git
export async function publishTag(version: string) {
  await exec(`git tag v${version}`)
  await exec(`git push origin tag v${version}`)
}

// 推送代码
export async function pushCommit(message: string) {
  await exec('git add .')
  await exec(`git commit -m "${message}" -n`)
  await exec('git push')
}

// 检测是否有未提交内容
export async function checkUnCommit() {
  const res = await exec(`git status`)
  return !res.includes('nothing to commit')
}

// 更新版本
export function upgrade(version: string, num = 1) {
  let result = (
    +version
      .split('.')
      .map((i) => (+i < 10 ? `0${i}` : i))
      .join('') + num
  ).toString()
  if (result.length < 6) result = `000000${result}`
  const arr = ((arr, size) => {
    const res = []
    let s = 0,
      len = arr.length
    while (s < len) {
      let e: any = res.length < 2 ? s + size : len
      res.push(arr.slice(s, e))
      s = e
    }
    return res
  })(result.toString().split('').reverse(), 2)
  return arr
    .reverse()
    .map((i) => +i.reverse().join(''))
    .join('.')
}
