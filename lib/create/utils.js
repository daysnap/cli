
const request = require('request')

const fetchTemplateList = username => new Promise((resolve, reject) => {
    request({
        url: `https://api.github.com/users/${username}/repos?page=1&per_page=999`,
        timeout: 60 * 1000,
        headers: {
            'User-Agent': '@daysnap/cli'
        },
    }, (err, res, body) => err ? reject(err) : resolve(JSON.parse(body)))
})

module.exports = {
    fetchTemplateList,
}
