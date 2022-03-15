
const { exec } = require('child_process')

module.exports = cmd => new Promise((resolve, reject) => {
    exec(cmd, (err,stdout,stderr) => {
        if (err || stderr) reject(err || stderr)
        else resolve(stdout)
    })
})

