
const REGISTRIES = require('./registries.json')
const { padding, exec } = require('../../utils/helper')

const getRegistries = () => Object.assign({}, REGISTRIES)

const getCurrentRegistry = async () => {
    const registry = await exec('npm config get registry')
    return registry.trim()
}

module.exports = {
    getRegistries,
    getCurrentRegistry,
}
