
const chalk = require('chalk')
const { padding } = require('./helper')

const info = (...args) => {
    console.log(...args)
    return logger
}

const br = () => info('')

const print = messages => {
    for (const message of messages) info(message)
    return logger
}

const error = err => {
    console.error(`  ${chalk.bgRed(padding('ERROR'))} ${chalk.red(err)}`)
    return logger
}

const success = msg => {
    console.log(`  ${chalk.bgGreenBright(padding('SUCCESS'))} ${msg}`)
    return logger
}

const logger = {
    br,
    info,
    print,
    error,
    success,
}

module.exports = logger
