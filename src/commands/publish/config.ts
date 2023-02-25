export interface Config {
  husky: Record<string, any>
  commitlint: Record<string, any>
  'lint-staged': Record<string, any>
}

export const config = {
  husky: {
    husky: '7.0.4',
  },
  commitlint: {
    '@commitlint/cli': '16.2.1',
    '@commitlint/config-conventional': '16.2.1',
    commitizen: '4.2.4',
  },
  'lint-staged': {
    'lint-staged': '13.1.2',
  },
}
