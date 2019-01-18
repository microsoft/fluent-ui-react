/**
 * The Webpack Context for doc site example groups.
 */
export const exampleIndexContext = require.context('docs/src/examples/', true, /index.tsx$/)

/**
 * The Webpack Context for doc site example sources.
 */
export const exampleSourcesContext = require.context(
  'docs/src/exampleSources/',
  true,
  /.source.json$/,
)
