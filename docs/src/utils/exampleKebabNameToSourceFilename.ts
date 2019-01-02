import * as _ from 'lodash'

/**
 * Converts kebab-cased-example-name back into the original filename.
 * @param {string} exampleKebabName
 */
const exampleKebabNameToSourceFilename = exampleKebabName => {
  const trimmedKebabName = exampleKebabName.trim()
  // button-example           => ButtonExample
  // button-example-shorthand => ButtonExampleShorthand
  const startCasedName = _.startCase(trimmedKebabName)

  // button-example-shorthand => ButtonExample.shorthand.source.json
  return `${startCasedName.replace(/Shorthand$/, '.shorthand')}.source.json`
}

export default exampleKebabNameToSourceFilename
