
const REGISTRIES = require('./registries.json')

const getRegistries = () => Object.assign({}, REGISTRIES)

// 使用
const onUse = name => {

}

// 列表
const onList = () => {

}

module.exports = (options, ctx) => {
    const { use, list } = options
    if (list) return onList()
    if (use) return onUse(use)
    ctx.outputHelp()
}
