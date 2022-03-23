
const request = require('request')
const download = require('download-git-repo')

const fetchTemplateList = username => new Promise((resolve, reject) => {
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

module.exports = {
    downloadGitRepo,
    fetchTemplateList,
}
