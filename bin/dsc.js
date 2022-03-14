#!/usr/bin/env node

'use strict'

const program = require('commander')
const chalk = require('chalk')
const { br, pd } = require('../utils/helper')
const { l } = require('../utils/logger')
const { name, version } = require('../package.json')
const overwrite = require('../utils/overwrite')

overwrite(program)

br()

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
    .action(require('../lib/npm'))

// 帮助信息
program.on('--help', () => {
    br()
    l(pd(`执行 ${chalk.cyan(`dsc <command> -h`)} 查看指定命令的使用方法.`, 2))
    br()
})

program.commands.forEach(command =>
    command
        .option('-h, --help', '显示命令帮助')
        .on('--help', br)
)

program.parse(process.argv)
