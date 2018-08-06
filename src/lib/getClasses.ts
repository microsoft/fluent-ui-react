import * as _ from 'lodash'
import { combineRules } from 'fela'
import callable from './callable'

import {
  ComponentPartStyleFunction,
  ComponentStyleFunctionParam,
  IComponentPartClasses,
  IComponentPartStylesInput,
  IRenderer,
  OneOrArray,
} from '../../types/theme'
import { toCompactArray } from './index'

/**
 * Returns a string of HTML classes.
 * Renders one or many component styles (objects of component parts) to the DOM.
 */
const getClasses = (
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

export default getClasses
