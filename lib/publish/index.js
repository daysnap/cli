
const path = require('path')
const fs = require('fs')
const util = require('util')
const logger = require('../../utils/logger')
const semver = require('semver')
const { upgrade, ora } = require('../../utils/helper')
const { parseProject, publishPackage, getOnlineVersion, updatePackage } = require('./utils')
const DEFAULT = require('./config')
//
// // 默认配置
// const DEFAULT = {
//     registryUri: 'https://registry.npmjs.org',
// }
//
// // 解析项目目录
// const parseProject = (spinner) => new Promise(async (resolve, reject) => {
//     spinner.text = '解析项目...'
//     spinner.start().render()
//     const projectDir = process.cwd()
//     const pkg = path.join(projectDir, 'package.json')
//     setTimeout(async () => {
//         if (!await isExists(pkg)) {
//             return reject(`解析项目错误 package.json 找不到（${pkg}）.`)
//         }
//         const { name, version } = require(pkg)
//         resolve({ projectDir, name, version, pkg })
//         spinner.succeed('解析项目完成!')
//     }, 500)
// })
//
// // 查询线上版本号
// const getOnlineVersion = ({ name, registryUri }, spinner) => new Promise(async (resolve, reject) => {
//     spinner.text = '查询线上版本...'
//     spinner.start().render()
//     let version, err
//     try {
//         version = await exec(`npm view ${name} version --registry ${registryUri}`)
//     } catch (e) {
//         if (!(e && e.message && e.message.includes('E404'))) {
//             err = e
//         }
//     }
//     if (err) {
//         return reject(err)
//     }
//     resolve(version || '0.0.0')
//     spinner.succeed(`查询线上版本完成! 当前线上版本 => ${ version || '该包还未发布' }.`)
// })
//
// // 写入版本
// const updatePackage = async ({ version, pkg }, spinner) => {
//     spinner.text = `正在写入 package.json `
//     spinner.start().render()
//     const content = JSON.stringify(Object.assign(require(pkg), { version }), null, 2)
//     await util.promisify(fs.writeFile)(pkg, content)
//     spinner.succeed(`写入 package.json 完成!`)
// }
//
// // 发布版本
// const publishPackage = async ({ version, registryUri }, spinner) => {
//     spinner.text = `正在发布版本...`
//     spinner.start().render()
//     await exec(`npm publish --registry ${registryUri}`)
//     spinner.succeed(`发布版本完成! 版本 => ${version}.`)
// }

module.exports = async options => {
    const spinner = ora('开始执行发布流程').start()
    try {
        let { registryUri, version } = Object.assign({}, DEFAULT, options)
        if (version && !semver.valid(version)) {
            throw new Error(`指定版本格式有误 => ${version}`)
        }

        spinner.text = '解析项目...'
        spinner.toast('解析项目...').start().render()
        const { name, pkg } = await parseProject(spinner)
        spinner.succeed('解析项目完成!')

        spinner.text = '查询线上版本...'
        spinner.start().render()
        let onlineVersion = await getOnlineVersion({ name, registryUri })
        spinner.succeed(`查询线上版本完成! 当前线上版本 => ${ onlineVersion || '该包还未发布' }.`)

        if (!version) {
            version = upgrade(semver.valid(semver.coerce(onlineVersion || '0.0.0')), 1)
        }

        spinner.text = `正在写入 package.json `
        spinner.start().render()
        await updatePackage({ version, pkg })
        spinner.succeed(`写入 package.json 完成!`)

        spinner.text = `正在发布版本...`
        spinner.start().render()
        // await publishPackage(registryUri)
        spinner.succeed(`发布版本完成! 版本 => ${version}.`)
    } catch (err) {
        spinner.fail(err.toString())
    }
    logger.br()
}
