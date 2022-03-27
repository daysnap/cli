
const path = require('path')
const { exec, sleep, writeFile } = require('../../utils/helper')
const { devDependencies } = require('./config')

const installPackage = async pkgJson => {
    const { devDependencies: deps = {} } = pkgJson
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
    await writeFile(config, `
        module.exports = {
            extends: ['@commitlint/config-conventional']
        }
    `)
    const pkgJson = require(pkg)
    if (!pkgJson.scripts) pkgJson.scripts = {}
    pkgJson.scripts.husky = `husky install && echo 'export PATH=\"/usr/local/bin/:$PATH\"' >> ~/.huskyrc`
    await exec(`npm run husky`)
    await exec(`npx husky add .husky/pre-commit "npx --no-install commitlint --edit "$1""`)
    return { cwd }
}

module.exports = {
    installPackage,
    prepare,
}
