module.exports = {
  presets: [
    ['@babel/preset-env', { modules: false }],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-runtime',
  ],
  env: {
    development: {
      plugins: ['react-hot-loader/babel'],
    },
    test: {
      presets: [['@babel/preset-env', { modules: 'commonjs' }]],
    },
  },
}
