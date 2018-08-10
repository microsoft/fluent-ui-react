import componentInfo from './componentInfo'

/**
 * Returns a the info.json files for another component's @see tags.
 *
 * @param displayName
 * @returns {{}[]}
 */
const getInfoForSeeTags = displayName => {
  const info = componentInfo.byDisplayName[displayName]

  return info.docblock.tags
    .filter(tag => tag.title === 'see')
    .map(tag => componentInfo.byDisplayName[tag.description])
}

export default getInfoForSeeTags
