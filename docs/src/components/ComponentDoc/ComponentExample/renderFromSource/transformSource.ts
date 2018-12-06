import * as Babel from '@babel/standalone'
import * as merge from 'deepmerge'
// import memoize from "fast-memoize"

import { exportToIifePlugin, importResolverPlugin } from './babel'

Babel.registerPlugin('export-to-iife', exportToIifePlugin)
Babel.registerPlugin('import-resolver', importResolverPlugin)

/**
 * Transform passed ES6 code to the evaluable code using plugins and a passed config.
 *
 * @param {Object} babelConfig A config for Babel
 * @param {String} source A string that contains the source code
 *
 * @return {String}
 */
const transformSource = (babelConfig, source) => {
  const config = merge(
    {
      plugins: ['import-resolver', 'export-to-iife'],
      presets: ['react'],
    },
    babelConfig,
  )
  const { code } = Babel.transform(source, config)
  console.warn(code)

  return code
}

// export default memoize(transformSource)
export default transformSource
