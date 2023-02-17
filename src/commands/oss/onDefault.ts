import glob from 'glob'
import OSS from 'ali-oss'
import path from 'path'
import { createRoute } from '@/core'
import { getAbsolutePath, isExists, spinner } from '@/utils'
import { getBasePath } from './utils'

export default createRoute(async (ctx) => {
  const { configServer, args } = ctx
  let [input, output, { config, ignore = [], dot = false }] = args

  // config
  if (config) {
    config = getAbsolutePath(config)
    if (!(await isExists(config))) {
      throw new Error(`没有找到配置文件：${config}`)
    }
  }
  config = (await configServer.get('oss', { append: [config] })) ?? {}

  // input
  if (!input) {
    input = config.input
    delete config.input
  }
  if (!input) {
    throw new Error(`没有找到上传入口 input `)
  }

  // output
  if (output) {
    const [region, bucket, directory, accessKeyId, accessKeySecret] =
      output.split(':')
    if (!region || !bucket || !directory) {
      throw new Error(`[output] 配置有误：${output}`)
    }
    output = { region, bucket, directory }
    if (accessKeyId) {
      output.accessKeyId = accessKeyId
    }
    if (accessKeySecret) {
      output.accessKeySecret = accessKeySecret
    }
  }
  if (!output) {
    output = config.output
    delete config.output
  }

  // format path
  const basePath = getBasePath(input)

  if (basePath.includes('*')) {
    throw new Error(`路径错误：${basePath}`)
  }

  // glob files
  const files = glob
    .sync(input, {
      ignore,
      nodir: true,
      matchBase: true,
      absolute: true,
      dot, // 显式点将始终匹配点文件
    })
    .map((filepath) => {
      if (!filepath.includes(basePath)) {
        throw new Error(`路径计算有误：${basePath}`)
      }
      return {
        filepath,
        uploadPath: path.join(output.directory, filepath.replace(basePath, '')),
      }
    })

  // oss upload
  const client = new OSS(output)
  const len = files.length
  for (let i = 0; i < len; i++) {
    const { uploadPath, filepath } = files[i]
    spinner.start(`总文件数:${len}，上传第${i}个文件(${filepath})...`)
    await client.put(uploadPath, filepath)
  }
  spinner.succeed(`总文件数:${len}，上传完成~`)
})
