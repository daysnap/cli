
const ora = require('ora')

const create = (options, command) => {
    const [ , appName, , template ] = command.parent.args
    if (!appName || !template) {
        return command.outputHelp()
    }
    console.log('appName -----', appName)
    console.log('template -----', template)

}

create.list = () => {
    console.log('create ----- list')

}

module.exports = create
