
const padding = (message, before = 1, after = 1) =>
    `${new Array(before).fill(' ').join('')}${message}${new Array(after).fill(' ').join('')}`

module.exports = {
    padding,
}
