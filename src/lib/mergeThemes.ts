import * as _ from 'lodash'
import {
  ISiteVariables,
  IThemeComponentStylesInput,
  IThemeComponentStylesPrepared,
  IThemeComponentVariablesInput,
  IThemeComponentVariablesPrepared,
  IThemeInput,
  IThemePrepared,
} from '../../types/theme'
import callable from './callable'
import { felaRenderer, felaRtlRenderer } from './felaRenderer'

/**
 * Site variables can safely be merged at each Provider in the tree.
 * They are flat objects and do not depend on render-time values, such as props.
 */
const mergeSiteVariables = (
  target: ISiteVariables,
  ...sources: ISiteVariables[]
): ISiteVariables => {
  return sources.reduce((acc, next) => ({ ...acc, ...next }), target)
}

/**
 * Component variables can be objects, functions, or an array of these.
 * The functions must be called with the final result of siteVariables, otherwise
 *   the component variable objects would have no ability to apply siteVariables.
 * Therefore, componentVariables must be resolved by the component at render time.
 * We instead pass down call stack of component variable functions to be resolved later.
 */
const mergeComponentVariables = (
  target: IThemeComponentVariablesInput,
  ...sources: IThemeComponentVariablesInput[]
): IThemeComponentVariablesPrepared => {
  const displayNames = _.union(_.keys(target), ..._.map(sources, _.keys))

  return sources.reduce((acc, next) => {
    return displayNames.reduce((componentVariables, displayName) => {
      // Break references to avoid an infinite loop.
      // We are replacing functions with new ones that calls the originals.
      const originalTarget = acc[displayName]
      const originalSource = next[displayName]

      componentVariables[displayName] = siteVariables => {
        return {
          ...callable(originalTarget)(siteVariables),
          ...callable(originalSource)(siteVariables),
        }
      }

      return componentVariables
    }, {})
  }, target)
}

/**
 * See mergeComponentVariables() description.
 * Component styles adhere to the same pattern as component variables, except
 *   that they return style objects.
 */
const mergeComponentStyles = (
  target: IThemeComponentStylesInput,
  ...sources: IThemeComponentStylesInput[]
): IThemeComponentStylesPrepared => {
  const initial: IThemeComponentStylesPrepared = _.mapValues(target, stylesByPart => {
    return _.mapValues(stylesByPart, callable)
  })

  return sources.reduce<IThemeComponentStylesPrepared>((acc, next) => {
    _.forEach(next, (stylesByPart, displayName) => {
      acc[displayName] = acc[displayName] || {}

      _.forEach(stylesByPart, (partStyle, partName) => {
        // Break references to avoid an infinite loop.
        // We are replacing functions with a new ones that calls the originals.
        const originalTarget = acc[displayName][partName]
        const originalSource = next[displayName][partName]

        acc[displayName][partName] = styleParam => {
          return _.merge(callable(originalTarget)(styleParam), callable(originalSource)(styleParam))
        }
      })
    })

    return acc
  }, initial)
}

const mergeRTL = (target, ...sources) => {
  return !!sources.reduce((acc, next) => {
    return typeof next === 'boolean' ? next : acc
  }, target)
}

const mergeThemes = (...themes: IThemeInput[]): IThemePrepared => {
  const emptyTheme = {
    siteVariables: {},
    componentVariables: {},
    componentStyles: {},
  } as IThemePrepared

  return themes.reduce<IThemePrepared>((acc: IThemePrepared, next: IThemeInput) => {
    if (!next) return acc

    acc.siteVariables = mergeSiteVariables(acc.siteVariables, next.siteVariables)

    acc.componentVariables = mergeComponentVariables(
      acc.componentVariables,
      next.componentVariables,
    )

    acc.componentStyles = mergeComponentStyles(acc.componentStyles, next.componentStyles)

    // Latest RTL value wins
    acc.rtl = mergeRTL(acc.rtl, next.rtl)

    // Use the correct renderer for RTL
    acc.renderer = acc.rtl ? felaRtlRenderer : felaRenderer

    return acc
  }, emptyTheme)
}

export default mergeThemes
