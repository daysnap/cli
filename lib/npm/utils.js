
const REGISTRIES = require('./registries.json')
const { padding, exec } = require('../../utils/helper')

const getRegistries = () => Object.assign({}, REGISTRIES)

const getCurrentRegistry = async () => {
    const registry = await exec('npm config get registry')
    return registry.trim()
}

const generateDashLine = (str, len) =>
    padding(new Array(Math.max(2, len - str.length + 2)).join('-'))

module.exports = {
    getRegistries,
    getCurrentRegistry,
    generateDashLine,
}
