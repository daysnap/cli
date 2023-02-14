export interface Config {
  oss: {
    input: string
    output: {
      directory: string
      region: string
      bucket: string
      accessKeyId: string
      accessKeySecret: string
    }
    ignore: string | string[]
  }
}
