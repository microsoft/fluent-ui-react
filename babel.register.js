require('@babel/register')({
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' }, useBuiltIns: false }],
    '@babel/preset-typescript',
  ],
})
