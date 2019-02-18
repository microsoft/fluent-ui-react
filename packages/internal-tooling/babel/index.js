const isNodeCaller = caller => {
  return caller && (caller.name === '@babel/register' || caller.name === 'babel-jest')
}
const isDistCaller = caller => {
  return !!(caller && caller.name === 'babel-gulp')
}
const supportsESM = caller => {
  return !!((caller && caller.name === 'babel-loader') || caller.useESModules)
}

module.exports = api => {
  const isDistBuild = api.caller(isDistCaller)
  const isNode = api.caller(isNodeCaller)
  const useESModules = !isNode && api.caller(supportsESM)

  const presets = [
    [
      '@babel/preset-env',
      {
        modules: useESModules ? false : 'cjs',
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
    ['@babel/plugin-transform-runtime', { corejs: false, useESModules }],

    isDistBuild && 'lodash',
  ].filter(Boolean)

  return {
    presets,
    plugins,
  }
}
