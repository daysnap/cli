
const path = require('path')
const { exec, sleep, writeFile, isExists, getConfig, readFile } = require('../../utils/helper')

const installPackage = async pkgJson => {
    const { devDependencies: deps = {} } = pkgJson
    const { devDependencies } = await getConfig('husky')
    const installed = []
    const unInstall = Object.keys(devDependencies).filter(n => {
        const v = deps[n]
        if (v) installed.push(`${n}@${v}`)
        return !v
    }).map(n => `${n}@${devDependencies[n]}`)
    unInstall.length ? await exec(`npm install -D ${unInstall.join(' ')}`) : await sleep()
    return [ ...installed, ...unInstall ]
}

const prepare = async pkg => {
    const cwd = process.cwd()
    const config = path.resolve(cwd, 'commitlint.config.js')
    if (!await isExists(config)) {
        await writeFile(config, `module.exports = { extends: ['@commitlint/config-conventional'] }`)
    }
    const pkgContent = await readFile(pkg)
    const pkgJson = pkgContent ? JSON.parse(pkgContent) : {}
    if (!pkgJson.scripts) pkgJson.scripts = {}
    pkgJson.scripts.prepare = `husky install && echo 'export PATH=\"/usr/local/bin/:$PATH\"' >> ~/.huskyrc`
    await writeFile(pkg, JSON.stringify(pkgJson, null, 2))
    await exec(`npm run prepare`)
    if (!await isExists(path.resolve(cwd, '.husky/commit-msg'))) {
        await exec(`npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'`)
    }
    return { cwd }
}

module.exports = {
    installPackage,
    prepare,
}
