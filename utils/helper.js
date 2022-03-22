
const child_process = require('child_process')
const fs = require('fs')
const os = require('ora')
const path = require('path')

const sleep = (time = 300, flag = true) =>
    new Promise((resolve, reject) =>
        setTimeout(flag ? resolve : reject, time))

const ora = (options) => os(options)

const isExists = filepath => new Promise(resolve => {
    fs.access(filepath, err => resolve(!err))
})

const exec = cmd => new Promise((resolve, reject) => {
    child_process.exec(cmd, (err,stdout,stderr) => {
        if (err) reject(err)
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

const geneDashLine = (str, len) =>
    padding(new Array(Math.max(2, len - str.length + 2)).join('-'))


// 解析项目目录
const parsePackage = async (dir = '.') => {
    const projectDir = process.cwd()
    const pkg = path.join(projectDir, dir, 'package.json')
    await sleep(500)
    if (!await isExists(pkg)) {
        throw new Error(`解析项目错误 package.json 找不到（${pkg}）.`)
    }
    return { ...require(pkg), pkg }
}

module.exports = {
    parsePackage,
    ora,
    sleep,
    upgrade,
    padding,
    isExists,
    geneDashLine,
    exec,
}
