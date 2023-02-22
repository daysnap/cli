import child_process, { spawn, SpawnOptionsWithoutStdio } from 'child_process'

export const exec2 = (
  command: string,
  args?: string[],
  options?: SpawnOptionsWithoutStdio,
): Promise<void> =>
  new Promise((resolve, reject) => {
    spawn(command, args, options)
      .on('error', reject)
      .on('exit', (code) => {
        if (code === 0) return resolve()
        reject(new Error(`无法执行 ${command} 命令.`))
      })
  })

export const exec = (command: string) =>
  new Promise((resolve, reject) => {
    child_process.exec(command, (err, stdout) => {
      if (err) reject(err)
      else resolve(stdout.trim())
    })
  })
