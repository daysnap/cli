#!/usr/bin/env node

'use strict'

const { program } = require('commander')
const { version } = require('../package.json')

program
    .version(version)

console.log('version => ', version)
