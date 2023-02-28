import { createCommand, createRouter, requireAll, requireContext } from '@/core'

export default createCommand((ctx) => {
  ctx.program
    .command('oss [input] [output]')
    .description(
      'glob 形式 oss 上传文件，[input]需要上传的文件或文件夹，[output]的格式为:[<region><:bucket><:directory>[:accessKeyId][:accessKeySecret]]',
    )
    .option('-c, --config <filepath>', '指定配置文件')
    .option(
      '-i, --ignore <filepath...>',
      '忽略哪些目录、文件不需要上传，glob 形式',
    )
    .option('-d, --dot', '是否匹配点文件')
    .action(
      createRouter(
        ctx,
        requireAll(requireContext(__dirname, /[/\\]on.*\.js$/)),
      ),
    )
})
