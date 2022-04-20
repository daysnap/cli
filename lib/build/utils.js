
const fs = require('fs')
const path = require('path')
const ts = require('typescript')
const merge = require('deepmerge')
const { readFileSync, isExists, sleep } = require('../../utils/helper')

const parseTsConfig = async options => {
    const { cwd } = options
    const filepath = `${cwd}/tsconfig.json`
    const getTsConfig = filepath => {
        let { error, config } = ts.readConfigFile(filepath, readFileSync)
        if (error) throw error
        if (config.extends) {
            const filepath = path.relative(cwd, config.extends)
            config = merge(config, getTsConfig(filepath))
        }
        return config
    }
    return await isExists(filepath) ? getTsConfig(filepath) : {}
}

const parseBabelConfig = options => {
    const { type } = options
    return {
        presets: [
            require.resolve('@babel/preset-typescript'),
            [ require.resolve('@babel/preset-env'), { modules: type === 'esm' ? false : 'auto' } ],
        ],
        plugins: [
            [
                require.resolve('@babel/plugin-transform-runtime'),
                { useESModules: type === 'esm', version: require('@babel/runtime/package.json').version }
            ]
        ]
    }
}

const parseConfig = async options => {
    await sleep()
    const { cfg, cwd } = options
    const filepath = cfg ? path.relative(cwd, cfg) : `${cwd}/.dscrc.js`
    return require(filepath)
}

const run = async options => {

}

module.exports = {
    parseTsConfig,
    parseBabelConfig,
    parseConfig,
}
