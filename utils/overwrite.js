
const { br } = require('../utils/helper')

const overwrite = (fn, cb) => program => {
    const ofn = program.Command.prototype[fn]
    program.Command.prototype[fn] = function (...args) {
        // ofn.call(this, ...args)
        cb && cb.call(this, ...args)
        process.exit(1)
    }
}

const outputHelp = overwrite('outputHelp', br)

const unknownOption = overwrite('unknownOption', (dd) => {
    this.outputHelp()
    console.log('dd', dd)
})

const missingArgument = overwrite('optionMissingArgument', (dd) => {
    this.outputHelp()
    console.log('dd1', dd)
})

module.exports = program => {
    // outputHelp(program)
    unknownOption(program)
    missingArgument(program)
}
