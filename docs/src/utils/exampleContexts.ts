/**
 * Get the Webpack Context for doc site example groups.
 */
export const exampleGroupsContext = require.context('docs/src/examples/', true, /index.tsx$/)

/**
 * Get the Webpack Context for doc site example sources.
 */
export const exampleSourcesContext = require.context(
  'docs/src/exampleSources/',
  true,
  /.source.json$/,
)
