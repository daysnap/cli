
const chalk = require('chalk')
const { padding } = require('./helper')

const info = (...args) => console.log(...args)

const print = messages => {
    for (const message of messages) info(message)
}

const error = err => console.error(`${chalk.bgRed(padding('ERROR'))} ${chalk.red(err)}`)

const success = msg => console.log(`${chalk.bgGreenBright(padding('SUCCESS'))} ${msg}`)

module.exports = {
    info,
    print,
    error,
    success,
}
