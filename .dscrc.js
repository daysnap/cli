const { defineConfig } = require('./dist')

module.exports = defineConfig({
  oss: {
    input: './*',
    output: {
      directory: '/test/',
      region: 'oss-cn-zhangjiakou',
      bucket: 'bk-hand',
    }
  },
})
