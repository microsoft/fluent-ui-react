export const containsSubstring = (arg: any, substring: string) => {
  return typeof arg === 'string' && arg.indexOf(substring) >= 0
}

export const getLastOf = function<Item>(array: Item[], fallback: Item) {
  return array.length > 0 ? array[array.length - 1] : fallback
}

export const isNotNullOrEmpty = object => {
  if (object == null) {
    return false
  }

  return Object.keys(object).length > 0
}

export const isNotEmptyObjectsArray = array => {
  if (array == null) {
    return false
  }

  return array.some(isNotNullOrEmpty)
}

export const deepPickBy = (
  object: any,
  predicate: (propName: string, propValue: any) => boolean,
  seenObjects = [],
) => {
  if (!object) {
    return {}
  }

  if (seenObjects.some(seenObject => seenObject === object)) {
    throw new Error(`Circular dependency detected.`)
  }

  return Object.keys(object).reduce((acc, currentPropName) => {
    if (predicate(currentPropName, object[currentPropName])) {
      return { ...acc, [currentPropName]: object[currentPropName] }
    }

    if (typeof object[currentPropName] === 'object') {
      const deepPickResult = deepPickBy(object[currentPropName], predicate, [
        ...seenObjects,
        object,
      ])

      if (isNotNullOrEmpty(deepPickResult)) {
        return { ...acc, [currentPropName]: deepPickResult }
      }
    }

    return acc
  }, {})
}

export const deepPick = (object, propName) =>
  deepPickBy(object, currentPropName => propName === currentPropName)
