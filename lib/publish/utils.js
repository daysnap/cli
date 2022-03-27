
const { exec, sleep, writeFile } = require('../../utils/helper')

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
    await writeFile(pkg, content)
}

// 发布版本
const publishPackage = async registry => {
    await exec(`npm publish --registry ${registry}`)
}

module.exports = {
    getOnlineVersion,
    updatePackage,
    publishPackage,
}
