export function padding(message: string, before = 1, after = 1) {
  return `${new Array(before).fill(' ').join('')}${message}${new Array(after)
    .fill(' ')
    .join('')}`
}

export const geneDashLine = (str: string, len: number) =>
  padding(new Array(Math.max(2, len - str.length + 2)).join('-'))
