
# 开发

::: tip
你也想为脚手架添砖加瓦？快来看下开发规范吧！
:::

[[toc]]


## 前提

::: warning Node 版本
需要 [Node.js](https://nodejs.org/zh-cn/) >= 12.0
:::

## 怎么运行项目？

1. git 拉取 [本仓库](https://github.com/daysnap/daysnap-cli)

   ```bash
   git clone git@github.com:daysnap/daysnap-cli.git
   ```

2. 安装依赖初始化

   ```bash
   cd daysnap-cli
   npm install
   ```

3. 项目根目录下，执行 `npm link` 进行开发环境下 `dsc` 命令调试

   ```bash
   npm link
   ```

4. `dsc -v` 查看是否成功

   ```bash
   dsc -v
   ```


## 开发目录

```
project
├── bin                                         // 可执行脚本
│     ├── dsc.js                                // 主入口
├── lib                                         // 各命令执行脚本
│     ├── 404
│     ├── create
│     ├── npm
│     └── publish
├── utils                                       // 工具目录
│     ├── helper.js
│     ├── logger.js
│     ├── overwrite.js
│     ├── router.js
│     └── spinner.js
├── README.md
├── LICENSE
├── package.json
└── .gitignore
```


## 如果新增一个指令

已新增一个列出当前目录的命令为例子：

1. `bin/dsc.js` 下，新增

```js

// bin/dsc.js
program
    .command('ls')
    .description('列出目录')
    .action(createRouter(require('../lib/ls')))
```

2. `lib/` 目录下创建文件 `liv/ls/index.js`

```js
// lib/ls/index.js
const logger = require('../../utils/logger')
const { exec } = require('../../utils/helper')

module.exports = async () => {
    const data = await exec(`ls`)
    logger.info(data).br()
}
```

3. `dsc ls` 即可执行 `liv/ls/index.js` 下的逻辑

```bash
dsc ls
```

当然上述列举的只是一个很简单的入手案例，复杂的情况，就看 `liv/ls/index.js` 下的处理逻辑了。
