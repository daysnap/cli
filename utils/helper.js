
const child_process = require('child_process')
const util = require('util')
const fs = require('fs')

const isExists = filepath => new Promise(resolve => {
    fs.access(filepath, err => resolve(!err))
})

const exec = util.promisify(child_process.exec)

const padding = (message, before = 1, after = 1) =>
    `${new Array(before).fill(' ').join('')}${message}${new Array(after).fill(' ').join('')}`

module.exports = {
    padding,
    isExists,
    exec,
}
