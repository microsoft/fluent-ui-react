export const getComponentName = (component: React.ReactType) => {
  switch (typeof component) {
    case 'function':
      return component.displayName || component.name || null // unknown
    case 'string':
      return component || null // empty string
    default:
      return null // unknown
  }
}

export const areTypeNamesEqual = (first: React.ReactType, second: React.ReactType): boolean => {
  const componentNameOfElement = getComponentName(first)
  const componentName = getComponentName(second)

  return (
    componentNameOfElement !== null &&
    componentName !== null &&
    componentNameOfElement === componentName
  )
}
