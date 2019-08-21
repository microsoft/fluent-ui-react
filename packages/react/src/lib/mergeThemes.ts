import * as _ from 'lodash'
import {
  ComponentVariablesInput,
  ComponentVariablesPrepared,
  ComponentSlotStylesInput,
  ComponentSlotStylesPrepared,
  FontFace,
  SiteVariablesInput,
  SiteVariablesPrepared,
  ThemeComponentStylesInput,
  ThemeComponentStylesPrepared,
  ThemeComponentVariablesInput,
  ThemeComponentVariablesPrepared,
  ThemeInput,
  ThemePrepared,
  StaticStyle,
  ThemeIcons,
  ComponentSlotStyle,
  ThemeAnimation,
} from '../themes/types'
import callable from './callable'
import toCompactArray from './toCompactArray'
import { ObjectOf } from '../types'

export const emptyTheme: ThemePrepared = {
  siteVariables: {
    fontSizes: {},
  },
  componentVariables: {},
  componentStyles: {},
  fontFaces: [],
  staticStyles: [],
  icons: {},
  animations: {},
}

// ----------------------------------------
// Component level merge functions
// ----------------------------------------

/**
 * Merges a single component's styles (keyed by component part) with another component's styles.
 */
export const mergeComponentStyles = (
  ...sources: (ComponentSlotStylesInput | null | undefined)[]
): ComponentSlotStylesPrepared => {
  const initial: ComponentSlotStylesPrepared = {}

  return sources.reduce<ComponentSlotStylesPrepared>((partStylesPrepared, stylesByPart) => {
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
  ...sources: ComponentVariablesInput[]
): ComponentVariablesPrepared => {
  const initial = () => ({})

  return sources.reduce<ComponentVariablesPrepared>((acc, next) => {
    return (...args) => {
      const accumulatedVariables = acc(...args)
      const computedComponentVariables = callable(next)(...args)
      const mergedVariables: ObjectOf<any> = {}

      _.forEach(computedComponentVariables, (variableToMerge, variableName) => {
        const accumulatedVariable = accumulatedVariables[variableName]

        mergedVariables[variableName] =
          _.isObject(variableToMerge) && _.isObject(accumulatedVariable)
            ? { ...accumulatedVariable, ...variableToMerge }
            : variableToMerge
      })

      return { ...accumulatedVariables, ...mergedVariables }
    }
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
  ...sources: (SiteVariablesInput | null | undefined)[]
): SiteVariablesPrepared => {
  const initial: SiteVariablesPrepared = {
    fontSizes: {},
  }
  return sources.reduce<SiteVariablesPrepared>((acc, next) => ({ ...acc, ...next }), initial)
}

/**
 * Component variables can be objects, functions, or an array of these.
 * The functions must be called with the final result of siteVariables, otherwise
 *   the component variable objects would have no ability to apply siteVariables.
 * Therefore, componentVariables must be resolved by the component at render time.
 * We instead pass down call stack of component variable functions to be resolved later.
 */

export const mergeThemeVariables = (
  ...sources: (ThemeComponentVariablesInput | null | undefined)[]
): ThemeComponentVariablesPrepared => {
  const displayNames = _.union(..._.map(sources, _.keys))
  return sources.reduce<ThemeComponentVariablesInput>((acc, next) => {
    return displayNames.reduce((componentVariables, displayName) => {
      if (!next) return acc

      // Break references to avoid an infinite loop.
      // We are replacing functions with new ones that calls the originals.
      const originalTarget = acc[displayName]
      const originalSource = next[displayName]

      componentVariables[displayName] = (...args) => {
        return {
          ...callable(originalTarget)(...args),
          ...callable(originalSource)(...args),
        }
      }

      return componentVariables
    }, {})
  }, {})
}

/**
 * See mergeThemeVariables() description.
 * Component styles adhere to the same pattern as component variables, except
 *   that they return style objects.
 */
export const mergeThemeStyles = (
  ...sources: (ThemeComponentStylesInput | null | undefined)[]
): ThemeComponentStylesPrepared => {
  const initial: ThemeComponentStylesPrepared = {}

  return sources.reduce<ThemeComponentStylesPrepared>((themeComponentStyles, next) => {
    _.forEach(next, (stylesByPart, displayName) => {
      themeComponentStyles[displayName] = mergeComponentStyles(
        themeComponentStyles[displayName],
        stylesByPart,
      )
    })

    return themeComponentStyles
  }, initial)
}

export const mergeFontFaces = (...sources: FontFace[]) => {
  return toCompactArray<FontFace>(...sources)
}

export const mergeStaticStyles = (...sources: StaticStyle[]) => {
  return toCompactArray<StaticStyle>(...sources)
}

export const mergeIcons = (...sources: ThemeIcons[]): ThemeIcons => {
  return Object.assign({}, ...sources)
}

export const mergeAnimations = (
  ...sources: { [key: string]: ThemeAnimation }[]
): { [key: string]: ThemeAnimation } => {
  return Object.assign({}, ...sources)
}

export const mergeStyles = (...sources: ComponentSlotStyle[]) => {
  return (...args) => {
    return sources.reduce((acc, next) => {
      return _.merge(acc, callable(next)(...args))
    }, {})
  }
}

const mergeThemes = (...themes: ThemeInput[]): ThemePrepared => {
  return themes.reduce<ThemePrepared>(
    (acc: ThemePrepared, next: ThemeInput) => {
      if (!next) return acc

      acc.siteVariables = mergeSiteVariables(acc.siteVariables, next.siteVariables)

      acc.componentVariables = mergeThemeVariables(acc.componentVariables, next.componentVariables)

      acc.componentStyles = mergeThemeStyles(acc.componentStyles, next.componentStyles)

      // Merge icons set, last one wins in case of collisions
      acc.icons = mergeIcons(acc.icons, next.icons)

      acc.fontFaces = mergeFontFaces(...acc.fontFaces, ...(next.fontFaces || []))

      acc.staticStyles = mergeStaticStyles(...acc.staticStyles, ...(next.staticStyles || []))

      acc.animations = mergeAnimations(acc.animations, next.animations)

      return acc
    },
    { ...emptyTheme },
  )
}

export default mergeThemes
