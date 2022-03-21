
const path = require('path')
const fs = require('fs')
const util = require('util')
const { isExists, exec } = require('../../utils/helper')

// 解析项目目录
const parseProject = () => new Promise(async (resolve, reject) => {
    const projectDir = process.cwd()
    const pkg = path.join(projectDir, 'package.json')
    setTimeout(async () => {
        if (!await isExists(pkg)) {
            return reject(`解析项目错误 package.json 找不到（${pkg}）.`)
        }
        const { name, version } = require(pkg)
        resolve({ projectDir, name, version, pkg })
    }, 500)
})


// 查询线上版本号
const getOnlineVersion = ({ name, registryUri }) => new Promise(async (resolve, reject) => {
    let version, err
    try {
        version = await exec(`npm view ${name} version --registry ${registryUri}`)
    } catch (e) {
        if (!(e && e.message && e.message.includes('E404'))) {
            err = e
        }
    }
    if (err) {
        return reject(err)
    }
    resolve(version)
})


// 写入版本
const updatePackage = async ({ version, pkg }) => {
    const content = JSON.stringify(Object.assign(require(pkg), { version }), null, 2)
    await util.promisify(fs.writeFile)(pkg, content)
}

// 发布版本
const publishPackage = async (registryUri) => {
    await exec(`npm publish --registry ${registryUri}`)
}

module.exports = {
    parseProject,
    getOnlineVersion,
    updatePackage,
    publishPackage,
}
