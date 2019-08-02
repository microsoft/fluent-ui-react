import { isNotNullOrEmpty, isNotEmptyObjectsArray } from './utils'

import { IDebugData, DebugCategory } from './types'
import { ComponentSlotStylesPrepared } from '../../themes/types'

const traverseComponentThemeStyles = (
  componentStyles: ComponentSlotStylesPrepared,
  filterData: (data: any) => any,
) => {
  if (!componentStyles) return {}

  return Object.keys(componentStyles).reduce((acc, slotName) => {
    const slotStyles = componentStyles[slotName]
    const filteredSlotStyles = filterData(slotStyles)

    return isNotNullOrEmpty(filteredSlotStyles) ? { ...acc, [slotName]: filteredSlotStyles } : acc
  }, {})
}

const traverseComponentStyles = (
  stylesDebugOutput: IDebugData['styles'],
  filterData: (data: any) => any,
) => {
  const filteredThemes = stylesDebugOutput.themes.map(theme =>
    traverseComponentThemeStyles(theme.resolved, filterData),
  )

  const filteredInstance = filterData(
    (stylesDebugOutput.instanceOverrides && stylesDebugOutput.instanceOverrides.resolved) || {},
  )
  const filteredResult = traverseComponentThemeStyles(stylesDebugOutput.result, filterData)

  return {
    ...(isNotEmptyObjectsArray(filteredThemes) && { themes: filteredThemes }),
    ...(isNotNullOrEmpty(filteredInstance) && { instanceOverrides: filteredInstance }),
    ...(isNotNullOrEmpty(filteredResult) && { result: filteredResult }),
  }
}

const traverseComponentVariables = (
  variablesDebugOutput: DebugCategory,
  filterData: (data: any) => any,
) => {
  const filteredThemes = variablesDebugOutput.themes.map(theme => filterData(theme.resolved))

  const filteredInstance = filterData(
    (variablesDebugOutput.instanceOverrides && variablesDebugOutput.instanceOverrides.resolved) ||
      {},
  )
  const filteredResult = filterData(variablesDebugOutput.result)

  return {
    ...(isNotEmptyObjectsArray(filteredThemes) && { themes: filteredThemes }),
    ...(isNotNullOrEmpty(filteredInstance) && { instanceOverrides: filteredInstance }),
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
