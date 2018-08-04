import _ from 'lodash'
import { combineRules } from 'fela'
import callable from './callable'

import {
  ComponentPartStyleFunction,
  ComponentStyleFunctionParam,
  ComponentVariablesInput,
  ComponentVariablesObject,
  IComponentPartClasses,
  IComponentPartStylesInput,
  IRenderer,
  ISiteVariables,
  OneOrArray,
} from '../../types/theme'
import { toCompactArray } from './index'

/**
 * Returns a single component variable object from one or many component variable objects or functions.
 * Component variable functions are called with the site variables.
 * Component variables objects are merged as-is.
 */
export const resolveComponentVariables = (
  componentVariables: OneOrArray<ComponentVariablesInput>,
  siteVariables: ISiteVariables,
): ComponentVariablesObject => {
  return toCompactArray(componentVariables).reduce((acc, next) => {
    const called = callable(next)(siteVariables)
    const res = { ...acc, ...called }
    console.log({ acc, next, called, res })
    return res
  }, {})
}

/**
 * Returns a string of HTML classes.
 * Renders one or many component styles (objects of component parts) to the DOM.
 */
export const renderComponentStyles = (
  renderer: IRenderer,
  componentStyles: OneOrArray<IComponentPartStylesInput>,
  styleParam: ComponentStyleFunctionParam,
): IComponentPartClasses => {
  const stylesArr = toCompactArray(componentStyles)

  // root, icon, etc.
  const componentParts: string[] = stylesArr.reduce((acc, next) => {
    return next ? _.union(acc, _.keys(next)) : acc
  }, [])

  return componentParts.reduce((classes, partName) => {
    const styleFunctionsForPart = stylesArr.reduce(
      (stylesForPart: ComponentPartStyleFunction[], nextStyle) => {
        if (nextStyle[partName]) stylesForPart.push(callable(nextStyle[partName]))

        return stylesForPart
      },
      [],
    )

    const combinedFunctions = combineRules(...styleFunctionsForPart)

    classes[partName] = renderer.renderRule(combinedFunctions, styleParam)

    return classes
  }, {})
}
