#!/usr/bin/env node

'use strict'

const program = require('commander')
const chalk = require('chalk')
const { br } = require('../utils/helper')
const { l } = require('../utils/logger')
const { name, version } = require('../package.json')

br()

program
    .version(`${name} ${version}`, '-v, --version', '查看工具版本')
    .usage(`<command> [options]`)

// 切换 npm 源
program
    .command('npm')
    .description('快速切换 npm 源')
    .option('-l, --list', '列出当前支持的 npm 源')
    .option('-u, --use', '切换 npm 源')
    .allowUnknownOption()
    .action(() => {
        require('../lib/npm')
    })

// 帮助信息
program.on('--help', () => {
    br()
    l(`  执行 ${chalk.cyan(`dsc <command> -h`)} 查看指定命令的使用方法.`)
    br()
})

program.commands.forEach(c => c.on('--help', br))

program.parse(process.argv)
