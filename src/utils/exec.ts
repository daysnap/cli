import { spawn, SpawnOptions } from 'child_process'

export const exec = (
  command: string,
  args: string[],
  options: SpawnOptions,
): Promise<void> =>
  new Promise((resolve, reject) => {
    spawn(command, args, options)
      .on('error', reject)
      .on('exit', (code) => {
        if (code === 0) return resolve()
        reject(new Error(`无法执行 ${command} 命令.`))
      })
  })
