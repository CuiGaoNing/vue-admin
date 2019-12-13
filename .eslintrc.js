module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-multi-spaces': [2, { ignoreEOLComments: true }], // 禁止多个空格， 忽略行位注释前的多个空格
    'no-unused-expressions': 'off',
    'no-reserved-keys': 'off',
    'vue/no-reserved-keys': 'off',
    'vue/require-prop-type-constructor': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
