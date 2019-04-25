module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: ['@babel/plugin-proposal-class-properties'],
  env: {
    test: {
      plugins: [
        [
          '@babel/plugin-transform-runtime',
          {
            regenerator: true,
          },
        ],
      ],
    },
  },
}
