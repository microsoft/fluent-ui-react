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
    module.hot.accept(exampleSourcesContext.id, () => {
      exampleSourcesContext = require.context('docs/src/exampleSources/', true, /.source.json$/)
    })
  }
}
