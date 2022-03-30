
const { exec, getConfig } = require('../../utils/helper')

const getRegistries = async () => Object.assign({}, await getConfig('npm.registry'))

const getCurrentRegistry = async () => {
    const registry = await exec('npm config get registry')
    return registry.trim()
}

module.exports = {
    getRegistries,
    getCurrentRegistry,
}
