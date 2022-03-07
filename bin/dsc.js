#!/usr/bin/env node

'use strict'

const { program } = require('commander')
const chalk = require('chalk')
const { br } = require('../utils/helper')
const { name, version } = require('../package.json')

br()

program
    .version(`${name} ${version}`)
    .usage(`<command> [options]`)

// 切换 npm 源
program
    .command('npm [options]', 'run specified task')
    .description('create a new project powered by vue-cli-service')
    .allowUnknownOption()
    .action(() => {
        console.log('11')
    })

// add some useful info on help
program.on('--help', () => {
    console.log()
    console.log(`  Run ${chalk.cyan(`dsc <command> --help`)} for detailed usage of given command.`)
    console.log()
})

// program.commands.forEach(c => c.on('--help', () => console.log(1)))

program.parse(process.argv)
