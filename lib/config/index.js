
const minimist = require('minimist')
const ini = require('ini')
const logger = require('../../utils/logger')
const { getConfig, setConfig, delConfig, ora, sleep } = require('../../utils/helper')

const onSet = async (options, command) => {
    const { _: [ value ] } = minimist(command.parent.args.slice(1))
    const { set: key } = options
    if (!key || !value) {
        return command.outputHelp()
    }
    const spinner = ora(`正则执行更改配置...`).start()
    try {
        await sleep()
        await setConfig(key, value)
        spinner.succeed(`更改配置完成！${key} : ${value}`)
    } catch (err) {
        spinner.fail(err.toString())
    }
    logger.br()
}

const onGet = async options => {
    const spinner = ora(`正则执行查找配置...`).start()
    try {
        const { get, json } = options
        const key = typeof get === 'boolean' ? '' : get
        await sleep()
        let cfg = await getConfig(key)
        if (!json && typeof cfg === 'object') {
            cfg = ini.stringify(cfg)
        }
        spinner.succeed(`查找配置完成！`)
        logger.br().info(cfg)
    } catch (err) {
        spinner.fail(err.toString())
    }
    logger.br()
}

const onDel = async options => {
    const spinner = ora(`正则执行删除配置...`).start()
    try {
        const { del: key } = options
        await sleep()
        await delConfig(key)
        spinner.succeed(`删除配置完成！${key}`)
    } catch (err) {
        spinner.fail(err.toString())
    }
    logger.br()
}

module.exports = {
    set: onSet,
    get: onGet,
    del: onDel,
}
