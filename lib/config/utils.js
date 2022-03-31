
const launch = require('launch-editor')

exports.launch = (file, editor) =>
    new Promise((resolve, reject) =>
        launch(file, editor, (res, err) => err ? reject(err) : resolve(res)))
