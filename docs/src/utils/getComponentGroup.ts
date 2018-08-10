import componentInfo from './componentInfo'

/**
 * Returns a component's info.json file and subcomponent info.json files grouped by displayName.
 * @param displayName
 * @returns {{}}
 */
const getComponentGroup = displayName => {
  const info = componentInfo.byDisplayName[displayName]

  const group = {
    [info.displayName]: info,
  }

  if (!info.subcomponents) return group

  // add subcomponents
  info.subcomponents.forEach(subcomponent => {
    const subInfo = componentInfo.byDisplayName[subcomponent]

    group[subInfo.displayName] = subInfo
  })

  return group
}

export default getComponentGroup
