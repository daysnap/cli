
const parseArgs = (args = []) => [...args].reverse()

const createRouter = routes => (...args) => {
    const [ command, options ] = parseArgs(args)
    if (typeof routes === 'function') {
        return routes(...args)
    }
    const keys = Object.keys(options)
    if (!keys.length) {
        return command.outputHelp()
    }
    keys.forEach(path => routes[path](options, command))
}

module.exports = {
    createRouter
}
