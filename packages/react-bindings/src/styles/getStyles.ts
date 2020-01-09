import {
  callable,
  ComponentSlotStylesInput,
  ComponentSlotStylesPrepared,
  ComponentStyleFunctionParam,
  ComponentVariablesObject,
  ComponentVariablesPrepared,
  DebugData,
  ICSSInJSStyle,
  isDebugEnabled,
  mergeComponentStyles,
  mergeComponentVariables,
  PropsWithVarsAndStyles,
  ThemePrepared,
  withDebugId,
} from '@fluentui/styles'
import cx from 'classnames'
import * as _ from 'lodash'

import resolveStylesAndClasses, { ResolveStylesResult } from './resolveStylesAndClasses'
import {
  ComponentDesignProp,
  ComponentSlotClasses,
  RendererParam,
  RendererRenderRule,
  StylesContextValue,
} from '../styles/types'

type GetStylesOptions = StylesContextValue<{
  renderRule: RendererRenderRule
}> & {
  className?: string
  displayName: string
  props: PropsWithVarsAndStyles & { design?: ComponentDesignProp }
  rtl: boolean
  saveDebug: (debug: DebugData | null) => void

  __experimental_cache?: boolean
  __experimental_composeName?: string
  __experimental_overrideStyles?: boolean
}

export type GetStylesResult = {
  classes: ComponentSlotClasses
  variables: ComponentVariablesObject
  styles: Record<string, ICSSInJSStyle>
  theme: StylesContextValue['theme']
}

const variablesCache = new WeakMap<ThemePrepared, Record<string, ComponentVariablesPrepared>>()
const stylesCache = new WeakMap<ThemePrepared, Record<string, ResolveStylesResult>>()

const getStyles = (options: GetStylesOptions): GetStylesResult => {
  const {
    className: componentClassName,
    disableAnimations,
    displayName,
    props,
    renderer,
    rtl,
    saveDebug,
    theme,
    _internal_resolvedComponentVariables: resolvedComponentVariables,

    __experimental_cache: allowsCache,
    __experimental_composeName: composeName, // Second displayName
    __experimental_overrideStyles: overrideStyles,
  } = options

  const { className, design, styles, variables, ...restProps } = props

  const componentKey = [overrideStyles ? false : displayName, composeName].filter(Boolean).join(':')
  const cachingPossible = !(design || styles || variables)

  //
  // VARIABLES
  //

  let resolvedVariables: ComponentVariablesPrepared

  if (allowsCache && cachingPossible) {
    let themeVariableCache = variablesCache.get(theme)

    if (!themeVariableCache) {
      themeVariableCache = {}
      variablesCache.set(theme, {})
    }

    if (!themeVariableCache[componentKey]) {
      themeVariableCache[componentKey] = mergeComponentVariables(
        theme.componentVariables[displayName],
        composeName && theme.componentVariables[composeName],
      )(theme.siteVariables)
    }

    resolvedVariables = themeVariableCache[componentKey]

    variablesCache.set(theme, themeVariableCache)
  } else {
    //
    // Old caching of variables
    //

    // Resolve variables for this component, cache the result in provider
    if (!resolvedComponentVariables[displayName]) {
      resolvedComponentVariables[displayName] =
        callable(theme.componentVariables[displayName])(theme.siteVariables) || {} // component variables must not be undefined/null (see mergeComponentVariables contract)
    }

    // Merge inline variables on top of cached variables
    resolvedVariables = variables
      ? mergeComponentVariables(
          resolvedComponentVariables[displayName],
          withDebugId(variables, 'props.variables'),
        )(theme.siteVariables)
      : resolvedComponentVariables[displayName]
  }

  //
  // STYLES
  //

  let classes: ComponentSlotClasses
  let resolvedStylesDebug: Record<string, { styles: Object }[]>
  let resolvedStyles: Record<string, ICSSInJSStyle>

  if (allowsCache && cachingPossible) {
    const stylesKey = componentKey + JSON.stringify(restProps) + rtl + disableAnimations
    let themeStylesCache = stylesCache.get(theme)

    if (!themeStylesCache) {
      themeStylesCache = {}
      stylesCache.set(theme, themeStylesCache)
    }

    if (themeStylesCache[stylesKey]) {
      const cachedStyles = themeStylesCache[stylesKey]

      classes = cachedStyles.classes
      resolvedStylesDebug = cachedStyles.resolvedStylesDebug
      resolvedStyles = cachedStyles.resolvedStyles
    } else {
      // Resolve styles using resolved variables, merge results, allow props.styles to override
      const mergedStyles: ComponentSlotStylesPrepared = mergeComponentStyles(
        overrideStyles ? undefined : theme.componentStyles[displayName],
        composeName ? theme.componentStyles[composeName] : undefined,
        design && withDebugId({ root: design }, 'props.design'),
        styles && withDebugId({ root: styles } as ComponentSlotStylesInput, 'props.styles'),
      )

      const styleParam: ComponentStyleFunctionParam = {
        displayName,
        props,
        variables: resolvedVariables,
        theme,
        rtl,
        disableAnimations,
      }

      // Fela plugins rely on `direction` param in `theme` prop instead of RTL
      // Our API should be aligned with it
      // Heads Up! Keep in sync with Design.tsx render logic
      const direction = rtl ? 'rtl' : 'ltr'
      const felaParam: RendererParam = {
        theme: { direction },
        disableAnimations,
        displayName, // does not affect styles, only used by useEnhancedRenderer in docs
      }

      const result = resolveStylesAndClasses(mergedStyles, styleParam, (style: ICSSInJSStyle) =>
        renderer.renderRule(() => style, felaParam),
      )

      classes = result.classes
      resolvedStylesDebug = result.resolvedStylesDebug
      resolvedStyles = result.resolvedStyles

      themeStylesCache[stylesKey] = result

      stylesCache.set(theme, themeStylesCache)
    }
  } else {
    // Resolve styles using resolved variables, merge results, allow props.styles to override
    const mergedStyles: ComponentSlotStylesPrepared = mergeComponentStyles(
      overrideStyles ? undefined : theme.componentStyles[displayName],
      composeName ? theme.componentStyles[composeName] : undefined,
      design && withDebugId({ root: design }, 'props.design'),
      styles && withDebugId({ root: styles } as ComponentSlotStylesInput, 'props.styles'),
    )

    const styleParam: ComponentStyleFunctionParam = {
      displayName,
      props,
      variables: resolvedVariables,
      theme,
      rtl,
      disableAnimations,
    }

    // Fela plugins rely on `direction` param in `theme` prop instead of RTL
    // Our API should be aligned with it
    // Heads Up! Keep in sync with Design.tsx render logic
    const direction = rtl ? 'rtl' : 'ltr'
    const felaParam: RendererParam = {
      theme: { direction },
      disableAnimations,
      displayName, // does not affect styles, only used by useEnhancedRenderer in docs
    }

    const result = resolveStylesAndClasses(mergedStyles, styleParam, (style: ICSSInJSStyle) =>
      renderer.renderRule(() => style, felaParam),
    )

    classes = result.classes
    resolvedStylesDebug = result.resolvedStylesDebug
    resolvedStyles = result.resolvedStyles
  }

  // conditionally add sources for evaluating debug information to component
  if (process.env.NODE_ENV !== 'production' && isDebugEnabled) {
    saveDebug({
      componentName: displayName,
      componentVariables: _.filter(
        // @ts-ignore
        resolvedVariables._debug,
        variables => !_.isEmpty(variables.resolved),
      ),
      componentStyles: resolvedStylesDebug,
      siteVariables: _.filter(theme.siteVariables._debug, siteVars => {
        if (_.isEmpty(siteVars) || _.isEmpty(siteVars.resolved)) {
          return false
        }

        const keys = Object.keys(siteVars.resolved)
        if (
          keys.length === 1 &&
          keys.pop() === 'fontSizes' &&
          _.isEmpty(siteVars.resolved['fontSizes'])
        ) {
          return false
        }

        return true
      }),
    })
  }

  classes.root = cx(componentClassName, classes.__root, className)

  return {
    classes,
    variables: resolvedVariables,
    styles: resolvedStyles,
    theme,
  }
}

export default getStyles
