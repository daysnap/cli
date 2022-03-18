
const path = require('path')
const ora = require('ora')
const fs = require('fs')
const util = require('util')
const logger = require('../../utils/logger')
const { isExists, exec } = require('../../utils/helper')

// 默认配置
const DEFAULT = {
    registryUri: 'https://registry.npmjs.org',
}

// 解析项目目录
const parseProject = (spinner) => new Promise(async (resolve, reject) => {
    spinner.text = '解析项目...'
    spinner.start().render()
    const projectDir = process.cwd()
    const pkg = path.join(projectDir, 'package.json')
    setTimeout(async () => {
        if (!await isExists(pkg)) {
            return reject(`解析项目错误 package.json 找不到（${pkg}）.`)
        }
        const { name, version } = require(pkg)
        resolve({ projectDir, name, version, pkg })
        spinner.succeed('解析项目完成!')
    }, 500)
})

// 查询线上版本号
const getOnlineVersion = ({ name, registryUri }, spinner) => new Promise(async (resolve, reject) => {
    spinner.text = '查询线上版本...'
    spinner.start().render()
    let version, err
    try {
        const { stdout } = await exec(`npm view ${name} version --registry ${registryUri}`)
        // const { stdout } = await exec(`npm view as-cocoon version --registry ${registryUri}`)
        version = stdout.trim()
    } catch (e) {
        if (!(e && e.stderr && e.stderr.indexOf('E404'))) {
            err = e
        }
    }
    if (err) {
        return reject(err)
    }
    resolve(version)
    spinner.succeed(`查询线上版本完成! 当前线上版本 => ${ version || '该包还未发布' }.`)
})

// 写入版本
const updatePackage = async ({ version, pkg }, spinner) => {
    spinner.text = `正在写入 package.json `
    spinner.start().render()
    const content = JSON.stringify(Object.assign(require(pkg), { version }), null, 2)
    await util.promisify(fs.writeFile)(pkg, content)
    spinner.succeed(`写入 package.json 完成!`)
}

// 发布版本
const publishPackage = async ({ version, registryUri }, spinner) => {
    spinner.text = `正在发布版本...`
    spinner.start().render()
    // await exec(`npm publish --registry ${registryUri}`)
    spinner.succeed(`发布版本完成! 版本 => ${version}.`)
}

// 升级版本
const patchPackage = async ({ pkg }, spinner) => {
    spinner.text = `正在升级版本...`
    spinner.start().render()
    const version = await exec(`npm version patch --no-git-tag-version`)
    spinner.succeed(`升级版本完成!`)
    return version
}

module.exports = async options => {
    const spinner = ora('开始执行发布流程').start()
    try {
        let { registryUri, version } = Object.assign({}, DEFAULT, options)
        const { name, pkg } = await parseProject(spinner)
        const onlineVersion = await getOnlineVersion({ name, registryUri }, spinner)
        if (!version) {
            await updatePackage({ version: onlineVersion, pkg }, spinner)
            version = await patchPackage({ pkg }, spinner)
        }
        console.log('1')
        await publishPackage({ version, pkg }, spinner)
        console.log('2')
        spinner.stop()
    } catch (err) {
        console.log('err => ', err)
        spinner.fail(err)
    }
    logger.br()
}
