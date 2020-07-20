module.exports = {
  extends: ['./node_modules/kcd-scripts/eslint.js'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
  overrides: [
    {
      files: ['.*'],
      rules: {
        'no-unused-expressions': 0,
        'no-undef': 0,
      },
    },
  ],
  settings: {
    'import/no-unresolved': 2,
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src'],
      },
    },
  },
  env: {
    'jest/globals': true,
  },
}
