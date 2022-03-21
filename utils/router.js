
const parseArgs = (args = []) => [...args].reverse()

const createRouter = routes => (...args) => {
    const [ command, options ] = parseArgs(args)
    const isFun = typeof routes === 'function'
    const keys = Object.keys(options)
    let handler
    keys.forEach(path => {
        if (!handler && routes[path]) {
            handler = routes[path]
        }
    })
    if (!handler && isFun) {
        handler = routes
    }
    if (!handler) {
        return command.outputHelp()
    }
    handler(...args)
}

module.exports = {
    createRouter
}
