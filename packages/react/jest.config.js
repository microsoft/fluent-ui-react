module.exports = {
  ...require('@stardust-ui/internal-tooling/jest'),
  name: 'react',
  transform: {
    '^.+\\.tsx?$': `${__dirname}/transform.js`,
  },
}
