import * as _ from 'lodash/fp'

/**
 * Converts kebab-cased-example-name back into the original filename.
 * @param {string} exampleKebabName
 */
const exampleKebabNameToFilename = exampleKebabName => {
  // button-example           => ButtonExample.tsx
  // button-example-shorthand => ButtonExample.shorthand.tsx
  return `${_.startCase(exampleKebabName)
    .replace(/ /g, '')
    .replace(/Shorthand$/, '.shorthand')}.tsx`
}

export default exampleKebabNameToFilename
