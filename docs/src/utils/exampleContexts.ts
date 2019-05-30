/**
 * The Webpack Context for doc site example groups.
 */
export const exampleIndexContext = require.context('docs/src/examples/', true, /index.tsx$/)

/**
 * The Webpack Context for component playgrounds.
 */
export const examplePlaygroundContext = require.context(
  'docs/src/examples/',
  true,
  /Playground.tsx$/,
)

/**
 * The Webpack Context for doc site example sources.
 */
//                          It's required for a hot reload
// eslint-disable-next-line import/no-mutable-exports
export let exampleSourcesContext = require.context(
  'docs/src/exampleSources/',
  true,
  /.source.json$/,
)

// ----------------------------------------
// HMR
// ----------------------------------------

if (__DEV__) {
  // When the application source code changes, re-render the whole thing.
  if (module.hot) {
    // We need this to catch cases unhandled by RHL
    // https://github.com/webpack/webpack/issues/834#issuecomment-76590576
    module.hot.accept(exampleSourcesContext.id, () => {
      exampleSourcesContext = require.context('docs/src/exampleSources/', true, /.source.json$/)
    })
  }
}
