module.exports = {
  extends: [
    'eslint-config-airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
        moduleDirectory: ['node_modules', './src'],
      },
    },
  },
  rules: {
    '@typescript-eslint/no-use-before-define': [
      'error',
      { ignoreTypeReferences: true },
    ],
    '@typescript-eslint/no-explicit-any': 'off', // 禁止使用该 any 类型
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ], // 禁止未使用的变量

    'import/extensions': 'off',
    'import/prefer-default-export': 'off',

    'no-console': 'off',
    'no-plusplus': 'off',
    'no-use-before-define': 'off',
    'no-prototype-builtins': 'off',
  },
}
