#!/usr/bin/env node

'use strict'

const { program } = require('commander')
const { br } = require('../utils/helper')
const { version } = require('../package.json')

br()

program
    .version(version)
    .usage(`<command>`)
    .command('run [name]', 'run specified task')
    .command('a [name]', 'run specified task')
    .parse(process.argv)

console.log('version => ', version)
