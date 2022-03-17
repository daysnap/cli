
const path = require('path')
const fs = require('fs')
const logger = require('../../utils/logger')

module.exports = (options) => {
    const { dir = '.' } = options
    const cwd = process.cwd()
    const projectDir = path.resolve(cwd, dir)

    const pkg = require()

    console.log('projectDir => ', projectDir)
    // console.log('options => ', options)
}
