const isBabelRegister = caller => {
  return !!(caller && caller.name === '@babel/register')
}
const isJest = caller => {
  return !!(caller && caller.name === 'babel-jest')
}

module.exports = api => {
  const isNode = api.caller(isBabelRegister) || api.caller(isJest)

  const presets = [
    [
      '@babel/preset-env',
      {
        modules: isNode ? 'cjs' : false,
        targets: isNode ? { node: '8' } : undefined,
        exclude: ['transform-async-to-generator'],
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ]
  const plugins = [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-runtime',
  ]

  return {
    presets,
    plugins,
  }
}
