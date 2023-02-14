const { defineConfig } = require('./dist')

module.exports = defineConfig({
  oss: {
    input: './*',
    output: {
      directory: '/test/',
      region: 'oss-cn-zhangjiakou',
      bucket: 'bk-hand',
      accessKeyId: 'LTAI5tDwcHtNTKLEHoSyFKv2',
      accessKeySecret: 'WcB4sNzgSlU6KIfVdSB4QEWeF1HXzz'
    }
  },
})
