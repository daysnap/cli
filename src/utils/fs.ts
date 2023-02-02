import fs from 'fs'
import util from 'util'
import { isString } from '@daysnap/utils'

export const isExists = (filepath: string) =>
  new Promise<boolean>((resolve) => fs.access(filepath, (err) => resolve(!err)))

export const writeFile = async (filepath: string, data: any) => {
  if (!isString(data)) {
    data = JSON.stringify(data)
  }
  await util.promisify(fs.writeFile)(filepath, data)
}

export const readFileSync = (filepath: string) =>
  fs.readFileSync(filepath, 'utf-8')

export const readFile = async (filepath: string) => {
  return util.promisify(fs.readFile)(filepath, 'utf-8')
}
