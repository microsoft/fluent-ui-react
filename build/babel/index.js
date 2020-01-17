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
  const isDistBundle = api.caller(isDistCaller)
  const isNode = api.caller(isNodeCaller)
  const useESModules = !isNode && api.caller(supportsESM)

  const presets = [
    [
      '@babel/preset-env',
      {
        modules: useESModules ? false : 'cjs',
        targets: isNode ? { node: '10' } : undefined,
        exclude: [
          // https://github.com/microsoft/fluent-ui-react/pull/1895
          'proposal-object-rest-spread',
          'transform-async-to-generator',
        ],
      },
    ],
    '@babel/preset-react',
    ['@babel/preset-typescript', { allowNamespaces: true }],
  ]
  const plugins = [
    '@babel/plugin-proposal-class-properties',
    ['@babel/plugin-proposal-object-rest-spread', { loose: true, useBuiltIns: true }],
    '@babel/plugin-syntax-dynamic-import',
    ['@babel/plugin-transform-runtime', { useESModules }],

    isDistBundle && 'lodash',
  ].filter(Boolean)

  return {
    presets,
    plugins,
    // Options to facilitate debugging in editor (set DEBUG environment var)
    ...(process.env.DEBUG && {
      sourceMaps: 'inline',
      retainLines: true,
    }),
  }
}
