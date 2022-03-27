
const { exec } = require('../../utils/helper')
const { devDependencies } = require('./config')

const installPackage = async pkg => {
    const { devDependencies = {} } = pkg

    await exec(`npm install -D ${devDependencies.join(' ')}`)

}

module.exports = {
    installPackage
}
