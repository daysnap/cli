import child_process from 'child_process'

export const exec = (command: string) =>
  new Promise<string>((resolve, reject) => {
    child_process.exec(command, (err, stdout) => {
      if (err) reject(err)
      else resolve(stdout.trim())
    })
  })
