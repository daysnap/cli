
const { exec } = require('../../utils/helper')
const { registry } = require('./config')

const getRegistries = () => Object.assign({}, registry)

const getCurrentRegistry = async () => {
    const registry = await exec('npm config get registry')
    return registry.trim()
}

module.exports = {
    getRegistries,
    getCurrentRegistry,
}
