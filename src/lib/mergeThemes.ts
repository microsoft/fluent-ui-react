import * as _ from 'lodash'
import {
  ComponentVariablesPrepared,
  ComponentVariablesInput,
  IComponentPartStylesInput,
  IComponentPartStylesPrepared,
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

// ----------------------------------------
// Component level merge functions
// ----------------------------------------

/**
 * Merges a single component's styles (keyed by component part) with another component's styles.
 */
export const mergeComponentStyles = (
  target: IComponentPartStylesInput,
  ...sources: (IComponentPartStylesInput | null | undefined)[]
): IComponentPartStylesPrepared => {
  const initial: IComponentPartStylesPrepared = _.mapValues(target, partStyle => {
    return callable(partStyle)
  })

  return sources.reduce<IComponentPartStylesPrepared>((partStylesPrepared, stylesByPart) => {
    _.forEach(stylesByPart, (partStyle, partName) => {
      // Break references to avoid an infinite loop.
      // We are replacing functions with a new ones that calls the originals.
      const originalTarget = partStylesPrepared[partName]
      const originalSource = partStyle

      partStylesPrepared[partName] = styleParam => {
        return _.merge(callable(originalTarget)(styleParam), callable(originalSource)(styleParam))
      }
    })

    return partStylesPrepared
  }, initial)
}

/**
 * Merges a single component's variables with another component's variables.
 */
export const mergeComponentVariables = (
  target: ComponentVariablesInput,
  ...sources: ComponentVariablesInput[]
): ComponentVariablesPrepared => {
  const initial = siteVariables => callable(target)(siteVariables)

  return sources.reduce<ComponentVariablesPrepared>((acc, next) => {
    return siteVariables => ({
      ...acc(siteVariables),
      ...callable(next)(siteVariables),
    })
  }, initial)
}

// ----------------------------------------
// Theme level merge functions
// ----------------------------------------

/**
 * Site variables can safely be merged at each Provider in the tree.
 * They are flat objects and do not depend on render-time values, such as props.
 */
export const mergeSiteVariables = (
  target: ISiteVariables,
  ...sources: (ISiteVariables | null | undefined)[]
): ISiteVariables => {
  return sources.reduce<ISiteVariables>((acc, next) => ({ ...acc, ...next }), target)
}

/**
 * Component variables can be objects, functions, or an array of these.
 * The functions must be called with the final result of siteVariables, otherwise
 *   the component variable objects would have no ability to apply siteVariables.
 * Therefore, componentVariables must be resolved by the component at render time.
 * We instead pass down call stack of component variable functions to be resolved later.
 */

export const mergeThemeVariables = (
  target: IThemeComponentVariablesInput,
  ...sources: (IThemeComponentVariablesInput | null | undefined)[]
): IThemeComponentVariablesPrepared => {
  const displayNames = _.union(_.keys(target), ..._.map(sources, _.keys))
  return sources.reduce<IThemeComponentVariablesInput>((acc, next) => {
    return displayNames.reduce((componentVariables, displayName) => {
      if (!next) return acc

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
 * See mergeThemeVariables() description.
 * Component styles adhere to the same pattern as component variables, except
 *   that they return style objects.
 */
export const mergeThemeStyles = (
  target: IThemeComponentStylesInput,
  ...sources: (IThemeComponentStylesInput | undefined)[]
): IThemeComponentStylesPrepared => {
  const initial: IThemeComponentStylesPrepared = _.mapValues(target, stylesByPart => {
    return _.mapValues(stylesByPart, callable)
  })

  return sources.reduce<IThemeComponentStylesPrepared>((themeComponentStyles, next) => {
    _.forEach(next, (stylesByPart, displayName) => {
      themeComponentStyles[displayName] = mergeComponentStyles(
        themeComponentStyles[displayName],
        stylesByPart,
      )
    })

    return themeComponentStyles
  }, initial)
}

export const mergeRTL = (target, ...sources) => {
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

    acc.componentVariables = mergeThemeVariables(acc.componentVariables, next.componentVariables)

    acc.componentStyles = mergeThemeStyles(acc.componentStyles, next.componentStyles)

    // Latest RTL value wins
    acc.rtl = mergeRTL(acc.rtl, next.rtl)

    // Use the correct renderer for RTL
    acc.renderer = acc.rtl ? felaRtlRenderer : felaRenderer

    return acc
  }, emptyTheme)
}

export default mergeThemes
