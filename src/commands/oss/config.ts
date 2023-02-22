export interface Config {
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
