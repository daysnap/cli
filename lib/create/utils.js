
const path = require('path')
const request = require('request')
const download = require('download-git-repo')
const home = require('user-home')
const { padding, geneDashLine } = require('../../utils/helper')

const fetchReposList = username => new Promise((resolve, reject) => {
    request({
        url: `https://api.github.com/users/${username}/repos?page=1&per_page=999`,
        timeout: 60 * 1000,
        headers: {
            'User-Agent': '@daysnap/cli'
        },
    }, (err, res, body) => err ? reject(err) : resolve(JSON.parse(body)))
})

const downloadGitRepo = (options) => new Promise((resolve, reject) => {
    const { repo, dest, clone= false } = options
    download(repo, dest, { clone }, err => err ? reject(err) : resolve())
})

const parseOptions = (options) => {
    const { template } = options
    const tmp = path.resolve(home, '.dsc-templates', template)

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

module.exports = {
    formatReposToMessages,
    isLocalPath,
    downloadGitRepo,
    fetchReposList,
}
