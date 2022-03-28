
module.exports = {
    orgname: 'daysnap-templates',
    cache: false,
    deposit: 'gitee',
    depositUrls: {
        github: `https://api.github.com/users/{username}/repos?page=1&per_page=999`,
        gitee: `https://gitee.com/api/v5/{type}/{username}/repos?page=1&per_page=999`,
    },
    repoUrls: {
        github: 'https://github.com/{username}/{repo}',
        gitee: 'https://gitee.com/{username}/{repo}',
    }
}
