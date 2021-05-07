module.exports = {
  root: true,
  env: {
    node: true,
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars':['error', { 'args': 'none' }],
    quotes:['error','single'],
    indent: ['error', 2],
    semi: ['error', 'never'],
    'comma-dangle': ['error', 'always-multiline'],
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
}
