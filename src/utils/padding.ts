export function padding(message: string, before = 1, after = 1) {
  return `${new Array(before).fill(' ').join('')}${message}${new Array(after)
    .fill(' ')
    .join('')}`
}
