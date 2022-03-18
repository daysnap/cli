
const child_process = require('child_process')
const fs = require('fs')
const semver = require('semver')

const isExists = filepath => new Promise(resolve => {
    fs.access(filepath, err => resolve(!err))
})

const exec = cmd => new Promise((resolve, reject) => {
    child_process.exec(cmd, (err,stdout,stderr) => {
        if (err || stderr) reject(err || stderr)
        else resolve(stdout.trim())
    })
})

const padding = (message, before = 1, after = 1) =>
    `${new Array(before).fill(' ').join('')}${message}${new Array(after).fill(' ').join('')}`

const upgrade = (version, num = 1) => {
    let result = (+version.split('.').map(i => +i < 10 ? `0${i}`: i).join('') + num).toString()
    if (result.length < 6) result = `000000${result}`
    const arr = ((arr, size) => {
        const res = []
        let s = 0, len = arr.length
        while (s < len) {
            let e = res.length < 2 ? s + size : len
            res.push(arr.slice(s, e))
            s = e
        }
        return res
    })(result.toString().split('').reverse(), 2)
    return arr.reverse().map(i => +i.reverse().join('')).join('.')
}

module.exports = {
    upgrade,
    padding,
    isExists,
    exec,
}
