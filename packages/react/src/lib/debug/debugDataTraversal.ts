import { isNotNullOrEmpty, isNotEmptyObjectsArray } from './utils'

import { IDebugData } from './types'

const traverseComponentThemeStyles = (componentStyles, filterData: (data: any) => any) => {
  if (!componentStyles) return {}

  return Object.keys(componentStyles).reduce((acc, slotName) => {
    const slotStyles = componentStyles[slotName]
    const filteredSlotStyles = filterData(slotStyles)

    return isNotNullOrEmpty(filteredSlotStyles) ? { ...acc, [slotName]: filteredSlotStyles } : acc
  }, {})
}

const traverseComponentStyles = (stylesDebugOutput, filterData: (data: any) => any) => {
  const filteredThemes = stylesDebugOutput.themes.map(theme =>
    traverseComponentThemeStyles(theme.resolved, filterData),
  )

  const filteredInstance = filterData(
    (stylesDebugOutput.instance && stylesDebugOutput.instance.resolved) || {},
  )
  const filteredResult = traverseComponentThemeStyles(stylesDebugOutput.result, filterData)

  return {
    ...(isNotEmptyObjectsArray(filteredThemes) && { themes: filteredThemes }),
    ...(isNotNullOrEmpty(filteredInstance) && { instance: filteredInstance }),
    ...(isNotNullOrEmpty(filteredResult) && { result: filteredResult }),
  }
}

const traverseComponentVariables = (variablesDebugOutput, filterData: (data: any) => any) => {
  const filteredThemes = variablesDebugOutput.themes.map(theme => filterData(theme.resolved))

  const filteredInstance = filterData(
    (variablesDebugOutput.instance && variablesDebugOutput.instance.resolved) || {},
  )
  const filteredResult = filterData(variablesDebugOutput.result)

  return {
    ...(isNotEmptyObjectsArray(filteredThemes) && { themes: filteredThemes }),
    ...(isNotNullOrEmpty(filteredInstance) && { instance: filteredInstance }),
    ...(isNotNullOrEmpty(filteredResult) && { result: filteredResult }),
  }
}

const traverse = (debugOutput: IDebugData, filterData: (data: any) => any) => {
  const stylesResult = traverseComponentStyles(debugOutput.styles, filterData)
  const variablesResult = traverseComponentVariables(debugOutput.variables, filterData)
  const siteVariablesResult = traverseComponentVariables(debugOutput.siteVariables, filterData)

  const result = {
    ...(isNotNullOrEmpty(stylesResult) && { styles: stylesResult }),
    ...(isNotNullOrEmpty(variablesResult) && { variables: variablesResult }),
    ...(isNotNullOrEmpty(siteVariablesResult) && { siteVariables: siteVariablesResult }),
  }

  return isNotNullOrEmpty(result)
    ? {
        componentName: debugOutput.componentName,
        ...result,
      }
    : {}
}

export default traverse
