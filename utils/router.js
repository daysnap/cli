
const createRouter = routes => (options, ctx) => {
    const keys = Object.keys(options)
    if (!keys.length) {
        return ctx.outputHelp()
    }
    keys.forEach(path => routes[path]())
}

module.exports = {
    createRouter
}
