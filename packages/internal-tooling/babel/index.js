module.exports = {
  presets: [
    ['@babel/preset-env', { modules: false }],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
    ['@babel/plugin-transform-runtime', { corejs: 2 }],
  ],
  env: {
    development: {
      plugins: ['react-hot-loader/babel'],
    },
    production: {
      plugins: ['lodash'],
    },
    test: {
      presets: [['@babel/preset-env', { modules: 'commonjs' }]],
    },
  },
}
