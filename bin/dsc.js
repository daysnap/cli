#!/usr/bin/env node

'use strict'

const program = require('commander')
const chalk = require('chalk')
const logger = require('../utils/logger')
const overwrite = require('../utils/overwrite')
const { padding } = require('../utils/helper')
const { name, version } = require('../package.json')
const { createRouter } = require('../utils/router')

overwrite(program)

logger.br()

program
    .version(`${name} ${version}`, '-v, --version', '查看工具版本')
    .usage(`<command> [options]`)
    .helpOption('-h, --help', '显示命令帮助')
    .addHelpCommand('help [command]', '显示命令帮助')

// 切换 npm 源
program
    .command('npm')
    .description('快速切换 npm 源')
    .option('-l, --list', '列出当前支持的 npm 源')
    .option('-u, --use <name>', '切换 npm 源')
    .allowUnknownOption()
    .action(createRouter(require('../lib/npm')))

// 发布依赖
program
    .command('publish [project]')
    .description('发布 npm 包')
    .option('-v, --version', '列出当前包')
    .allowUnknownOption()
    .action(createRouter(require('../lib/publish')))

// 帮助信息
program.commands.forEach(command => command.on('--help', logger.br))
program.on('--help', () =>
    logger
        .br()
        .info(padding(`执行 ${chalk.cyan(`dsc <command> -h`)} 查看指定命令的使用方法.`, 2))
        .br()
)

program.parse(process.argv)
