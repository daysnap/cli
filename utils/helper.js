
const child_process = require('child_process')
const fs = require('fs')
const os = require('ora')

const sleep = (time = 300, flag = true) =>
    new Promise((resolve, reject) =>
        setTimeout(flag ? resolve : reject, time))

const ora = (options) => os(options)

const isExists = filepath => new Promise(resolve => {
    fs.access(filepath, err => resolve(!err))
})

const exec = cmd => new Promise((resolve, reject) => {
    child_process.exec(cmd, (err,stdout,stderr) => {
        console.log('cmd err => ', err)
        console.log('cmd stderr => ', stderr)
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
    ora,
    sleep,
    upgrade,
    padding,
    isExists,
    exec,
}
