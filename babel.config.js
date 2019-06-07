module.exports = api => ({
  ...require('@stardust-ui/internal-tooling/babel')(api),
  babelrcRoots: ['./packages/*'],
})
