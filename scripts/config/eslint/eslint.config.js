module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  plugins: ['@typescript-eslint', 'react-hooks'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-unused-vars': 'off',
    'no-undef': 'off',
  },
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  env: {
    node: true,
    es6: true,
    jasmine: true,
  },
  overrides: [
    {
      files: ['src/**/*.ts', 'src/**/*.tsx'],
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
}
