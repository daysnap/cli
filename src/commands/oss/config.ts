export interface Config {
  oss: {
    input: string
    output: string
    ignore: string | string[]
    region: string
    bucket: string
    accessKeyId: string
    accessKeySecret: string
  }
}
