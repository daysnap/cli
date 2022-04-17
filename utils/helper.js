
const child_process = require('child_process')
const fs = require('fs')
const path = require('path')
const util = require('util')
const merge = require('deepmerge')
const os = require('ora')
const ini = require('ini')
const rm = require('rimraf').sync
const config = require('./config')

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

const parsePackage = async (dir = '.') => {
    const projectDir = process.cwd()
    const pkg = path.join(projectDir, dir, 'package.json')
    await sleep(500)
    if (!await isExists(pkg)) {
        throw new Error(`解析项目错误 package.json 找不到（${pkg}）.`)
    }
    return { ...require(pkg), pkg }
}

const writeFile = async (path, data) => {
    if (typeof data !== 'string') {
        data = JSON.stringify(data)
    }
    await util.promisify(fs.writeFile)(path, data)
}

const readFile = async file => {
    if (!await isExists(file)) {
        return ''
    }
    return fs.readFileSync(file, 'utf-8')
}

const parsePath = str => {
    const segments = str ? str.split('.') : []
    return obj => {
        for (let i = 0; i < segments.length; i++) {
            if (!obj) return
            obj = obj[segments[i]]
        }
        return obj
    }
}

const getConfig = async key => {
    const { ...rest } = config
    const dscrc = await readFile(rest.DSCRC)
    return parsePath(key)(merge(rest, ini.parse(dscrc)))
}

const parseObject = (str, value) => {
    const result = {}
    const segments = str ? str.split('.') : []
    segments.reduce((res, key, index, arr) => {
        res[key] = index === arr.length - 1 ? value : {}
        return res[key]
    }, result)
    return result
}

const setConfig = async (key = '', value = '') => {
    const { DSCRC } = config
    const cfg = merge(await getConfig(), parseObject(key, value))
    await writeFile(DSCRC, ini.stringify(cfg, null, 4))
    return cfg
}

const delConfig = async key => {
    const cfg = await getConfig()
    let obj = cfg
    key.split('.').forEach((key, index, arr) => {
        index === arr.length - 1 ? delete obj[key] : (obj = obj[key])
    })
    const { DSCRC } = config
    await writeFile(DSCRC, ini.stringify(cfg, null, 4))
    return cfg
}

module.exports = {
    rm,
    parsePackage,
    ora,
    sleep,
    upgrade,
    padding,
    isExists,
    geneDashLine,
    exec,
    readFile,
    writeFile,
    getConfig,
    setConfig,
    delConfig,
    parsePath,
}
