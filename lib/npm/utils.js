
const REGISTRIES = require('./registries.json')
const exec = require('../../utils/exec')
const { pd } = require('../../utils/helper')

const getRegistries = () => Object.assign({}, REGISTRIES)

const getCurrentRegistry = async () => {
    const registry = await exec('npm config get registry')
    return registry.trim()
}

const generateDashLine = (str, len) =>
    pd(new Array(Math.max(2, len - str.length + 2)).join('-'))

module.exports = {
    getRegistries,
    getCurrentRegistry,
    generateDashLine,
}
