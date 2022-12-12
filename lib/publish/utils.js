
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

// 推送git
const publishTag = async version => {
    await exec(`git tag v${version}`);
    await exec(`git push origin tag v${version}`);
}

// 推送代码
const pushCommit = async (version) => {
    await exec('git add .')
    await exec(`git commit -m "v${version}" -n`)
    await exec('git push')
}

// 检测是否有未提交内容
const checkUnCommit = async () => {
    const res = await exec(`git status`)
    return !res.includes('nothing to commit')
}

module.exports = {
    getOnlineVersion,
    updatePackage,
    publishPackage,
    publishTag,
    pushCommit,
    checkUnCommit,
}
