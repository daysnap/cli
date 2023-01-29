#!/usr/bin/env node

'use strict'

const { program } = require('commander')
const chalk = require('chalk')
const logger = require('../utils/logger')
const overwrite = require('../utils/overwrite')
const { padding } = require('../utils/helper')
const { name, version } = require('../package.json')
const { createRouter } = require('../utils/router')

overwrite(program)

logger.br()

program
    .usage(`<command> [options]`)
    .option('-v, --version', '查看版本信息')
    .helpOption('-h, --help', '显示命令帮助')
    .addHelpCommand('help [command]', '显示命令帮助')

// build 打包 只支持 gulp 编译工具库
program
    .command('build')
    .description('编译工具库')
    .option('-c, --config <config-file>', '指定配置文件')
    .action(createRouter(require('../lib/build')))

// config 配置
program
    .command('config')
    .description('配置管理')
    .option('-s, --set <key> <value>', '修改配置')
    .option('-g, --get [key]', '查询配置')
    .option('-d, --del <key>', '删除配置')
    .option('-e, --edit', '使用默认编辑器打开配置')
    .option('--json', 'JSON 的形式展示配置')
    .action(createRouter(require('../lib/config')))

// 创建项目
program
    .command('create')
    .description('创建项目')
    .usage('<app-name> -t <template>')
    .option('-t, --template <template>', '指定项目模板')
    .option('-l, --list', '当前的模板列表')
    .option('-c, --cache', '使用线下缓存模板')
    .option('-o, --org <orgname>', '指定组织')
    .option('-d, --deposit <deposit>', '指明使用 gitee 还是 github')
    .option('-u, --username <username>', '指定用户')
    .action(createRouter(require('../lib/create')))

// 模板创建
program
    .command('template')
    .description('创建模板')
    .usage('<app-name> -t <template>')
    .option('-t, --template <template>', '指定生成的模板')
    .option('-l, --list', '当前的模板列表')
    .action(createRouter(require('../lib/create')))

// husky 辅助
program
    .command('husky')
    .description('创建 git 提交钩子')
    .action(createRouter(require('../lib/husky')))

// 切换 npm 源
program
    .command('npm')
    .description('快速切换 npm 源')
    .option('-l, --list', '列出当前支持的 npm 源')
    .option('-u, --use <name>', '切换 npm 源')
    .action(createRouter(require('../lib/npm')))

// 发布依赖
program
    .command('publish')
    .description('发布 npm 包，会自动默认处理 version 版本')
    .option('-r, --registry <registry>', '指定发布源')
    .option('-v, --version <version>', '指定发布的对应版本')
    .option('-p, --push', '推送代码到GIT仓库')
    .option('-t, --tag [version]', '指定tag版本，指定tag则默认会推送代码到git仓库')
    .action(createRouter(require('../lib/publish')))

// 处理未知命令
program
    .arguments('<command>')
    .action(createRouter(require('../lib/404')))

// 帮助信息
program
    .commands
    .forEach(command => command.on('--help', logger.br))

program
    .on('option:version', () => logger.info(`${name} ${version}`).br() && process.exit())
    .on('--help', () =>
        logger.br().info(padding(`执行 ${chalk.cyan(`dsc <command> -h`)} 查看指定命令的使用方法.`, 2)).br()
    )

program.parse(process.argv)
