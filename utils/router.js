
const createRouter = routes => (options, ctx) => {
    console.log('options => ', options)
    const keys = Object.keys(options)
    if (!keys.length) {
        return ctx.outputHelp()
    }
    keys.forEach(path => routes[path](options, ctx))
}

module.exports = {
    createRouter
}
