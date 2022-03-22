

const path = require('path')
const fs = require('fs')
const util = require('util')
const { isExists, exec, sleep } = require('../../utils/helper')

// 解析项目目录
const parseProject = async () => {
    const projectDir = process.cwd()
    const pkg = path.join(projectDir, 'package.json')
    await sleep(500)
    if (!await isExists(pkg)) {
        throw new Error(`解析项目错误 package.json 找不到（${pkg}）.`)
    }
    return { ...require(pkg), pkg }
}

// 查询线上版本号
const getOnlineVersion = async ({ name, registry }) => {
    let version, err
    try {
        version = await exec(`npm view ${name} version --registry ${registry}`)
    } catch (e) {
        if (!(e && e.message && e.message.includes('E404'))) {
            err = e
        }
    }
    if (err) {
        throw err
    }
    return version
}

// 写入版本
const updatePackage = async ({ version, pkg }) => {
    await sleep(500)
    const content = JSON.stringify(Object.assign(require(pkg), { version }), null, 2)
    await util.promisify(fs.writeFile)(pkg, content)
}

// 发布版本
const publishPackage = async registry => {
    await exec(`npm publish --registry ${registry}`)
}

module.exports = {
    parseProject,
    getOnlineVersion,
    updatePackage,
    publishPackage,
}
