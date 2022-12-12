
const path = require('path')
const { version } = require('../package.json')

const DSCRC = path.join(process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'], '.dscrc')

module.exports = {

    version,

    DSCRC,

    create: {
        orgname: 'daysnap-templates',
        cache: false,
        deposit: 'github',
        depositUrls: {
            github: `https://api.github.com/users/{username}/repos?page=1&per_page=999`,
            gitee: `https://gitee.com/api/v5/{type}/{username}/repos?page=1&per_page=999`,
        },
        repoUrls: {
            // github: 'github:{username}/{repo}',
            // gitee: 'gitee:{username}/{repo}',
            github: 'https://github.com/{username}/{repo}.git',
            gitee: 'https://gitee.com/{username}/{repo}.git',
        }
    },

    husky: {
        devDependencies: {
            '@commitlint/cli': '16.2.1',
            '@commitlint/config-conventional': '16.2.1',
            'commitizen': '4.2.4',
            'husky': '7.0.4'
        }
    },

    npm: {
        registry: {
            "npm": {
                "home": "https://www.npmjs.org",
                "registry": "https://registry.npmjs.org/"
            },
            "yarn": {
                "home": "https://yarnpkg.com",
                "registry": "https://registry.yarnpkg.com/"
            },
            "tencent": {
                "home": "https://mirrors.cloud.tencent.com/npm/",
                "registry": "https://mirrors.cloud.tencent.com/npm/"
            },
            "cnpm": {
                "home": "https://cnpmjs.org",
                "registry": "https://r.cnpmjs.org/"
            },
            "taobao": {
                "home": "https://npmmirror.com",
                "registry": "https://registry.npmmirror.com/"
            },
            "npmMirror": {
                "home": "https://skimdb.npmjs.com/",
                "registry": "https://skimdb.npmjs.com/registry/"
            }
        }
    },

    publish: {
        registry: 'https://registry.npmjs.org',
    },

}
