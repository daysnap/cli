
const br = () => console.log()

const pd = (message, before = 1, after = 1) =>
    `${new Array(before).fill(' ').join('')}${message}${new Array(after).fill(' ').join('')}`

module.exports = {
    br,
    pd,
}
