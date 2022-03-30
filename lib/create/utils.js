
const path = require('path')
const home = require('user-home')
const inquirer = require('inquirer')
const minimist = require('minimist')
const Metalsmith = require('metalsmith');
const request = require('request')
const clone = require('git-clone/promise')
const { padding, geneDashLine, isExists, rm, writeFile, getConfig } = require('../../utils/helper')

const fetchReposList = url => new Promise((resolve, reject) => {
    request({
        url,
        timeout: 60 * 1000,
        headers: {
            'User-Agent': '@daysnap/cli'
        },
    }, (err, res, body) => err ? reject(err) : resolve(JSON.parse(body)))
})

const downloadGitRepo = async options => {
    const { repo, dest } = options
    await clone(repo, dest)
}

const isLocalPath = p => /^[./]|(^[a-zA-Z]:)/.test(p)

const getTemplatePath = p => path.isAbsolute(p) ? p : path.normalize(path.join(process.cwd(), p))

const formatReposToMessages = repos => {
    const data = repos.map(({ name, description }) => ({ name, description }))
    const length = Math.max(...data.map(item => item.name.length)) + 3
    return data.map((item, index) => {
        const { name, description } = item
        return padding(`${index + 1}. ${name}${geneDashLine(name, length)}${description}`, 4)
    })
}

const generate = (name, src, dest) => new Promise(async (resolve, reject) => {
    const tmp = path.join(src, 'template')
    src = await isExists(tmp) ? tmp : src
    const metalsmith = Metalsmith(src)
    const pkg = path.join(src, 'package.json')
    if (await isExists(pkg)) {
        const pkgJson = require(pkg)
        pkgJson.name = name
        await writeFile(pkg, JSON.stringify(pkgJson, null, 2))
    }
    Object.assign(metalsmith.metadata(), {
        destDirName: name,
        inPlace: dest === process.cwd(),
        noEscape: true
    })
    metalsmith
        .clean(false)
        .source('.')
        .destination(dest)
        .build(err => err ? reject(err) : resolve())
})

const parseOptions = async (options, command) => {
    const { depositUrls, repoUrls, ...DEFAULT } = await getConfig('create')
    const args = command ? command.parent.args.slice(1) : []
    const { _: [ rawName ] } = minimist(args)
    const inPlace = !rawName || rawName === '.'
    const name = inPlace ? path.relative('../', process.cwd()) : rawName
    const to = path.resolve(rawName || '.')
    let { deposit, orgname, username, ...rest } = Object.assign({}, DEFAULT, options)
    const type = !orgname && username ? 'users' : 'orgs'
    if (orgname) {
        username = orgname
    }
    const depositUrl = (depositUrls[deposit] || '').replace('{type}', type).replace('{username}', username)
    const repoUrl = (repoUrls[deposit] || '').replace('{username}', username)
    return { depositUrl, repoUrl, name, rawName, inPlace, to, deposit, username, ...rest }
}

const askQuestions = async (options, before) => {
    let { template, inPlace, depositUrl } = options
    let choices = []
    if (!template) {
        const repos = await fetchReposList(depositUrl)
        choices = formatReposToMessages(repos)
    }
    before && before()
    const answers = await inquirer.prompt([
        { type: 'confirm', message: `在当前目录中生成项目？`, name: 'ok', when: inPlace, default: true },
        { type: 'list', message: `请选择一个模板项目：`, name: 'template', when: !template, choices, filter: v => v.trim().split(' ')[1]  }
    ])
    return Object.assign({ template, ok: true }, answers)
}

const getTemplateRepo = async options => {
    let { template, cache, repoUrl } = options
    // 临时文件目录
    let temp = path.resolve(home, '.dsc-templates', template.replace(/[\/:]/g, '-'))
    if (cache) {
        template = temp
    }
    if (isLocalPath(template)) {
        temp = getTemplatePath(template)
        if (!await isExists(temp)) {
            throw new Error(`本地模板没有找到！模板 => ${template}`)
        }
    } else {
        const repo = repoUrl.replace('{repo}', template)
        if (await isExists(temp)) {
            rm(temp)
        }
        await downloadGitRepo({ repo, dest: temp })
    }
    return { temp }
}

module.exports = {
    getTemplateRepo,
    askQuestions,
    parseOptions,
    generate,
    formatReposToMessages,
    getTemplatePath,
    isLocalPath,
    downloadGitRepo,
    fetchReposList,
}
