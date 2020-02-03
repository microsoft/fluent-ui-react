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
}

export type GetStylesResult = {
  classes: ComponentSlotClasses
  variables: ComponentVariablesObject
  styles: Record<string, ICSSInJSStyle>
  theme: StylesContextValue['theme']
}

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
    __experimental_cache: cacheEnabled,
  } = options

  const { className, design, styles, variables, ...restProps } = props

  const componentKey = displayName
  const noInlineOverrides = !(design || styles || variables)

  //
  // VARIABLES
  //

  let resolvedVariables: any // TODO: fix me

  // Resolve variables for this component, cache the result in provider
  if (!resolvedComponentVariables[componentKey]) {
    resolvedComponentVariables[componentKey] =
      callable(theme.componentVariables[componentKey])(theme.siteVariables) || {} // component variables must not be undefined/null (see mergeComponentVariables contract)
  }

  if (cacheEnabled && noInlineOverrides) {
    resolvedVariables = resolvedComponentVariables[componentKey]
  } else {
    //
    // Old caching of variables
    //

    // Merge inline variables on top of cached variables
    resolvedVariables = props.variables
      ? mergeComponentVariables(
        resolvedComponentVariables[componentKey],
        withDebugId(props.variables, 'props.variables'),
      )(theme.siteVariables)
      : resolvedComponentVariables[componentKey]
  }

  //
  // STYLES
  //

  let resolveStylesResult: ResolveStylesResult

  if (cacheEnabled && noInlineOverrides) {
    const stylesKey = componentKey + JSON.stringify(restProps) + rtl + disableAnimations
    let themeStylesCache = stylesCache.get(theme)

    if (!themeStylesCache) {
      themeStylesCache = {}
      stylesCache.set(theme, themeStylesCache)
    }

    if (themeStylesCache[stylesKey]) {
      resolveStylesResult = themeStylesCache[stylesKey]
    } else {
      resolveStylesResult = getResolvedStyles({
        theme,
        componentKey,
        disableAnimations,
        rtl,
        renderer,
        props,
        resolvedVariables,
      })

      themeStylesCache[stylesKey] = resolveStylesResult
      stylesCache.set(theme, themeStylesCache)
    }
  } else {
    resolveStylesResult = getResolvedStyles({
      theme,
      componentKey,
      disableAnimations,
      rtl,
      renderer,
      props,
      resolvedVariables,
    })
  }

  const {
    classes,
    resolvedStylesDebug,
    resolvedStyles,
  } = resolveStylesResult

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

const getResolvedStyles = ({ theme, componentKey, props, resolvedVariables, rtl, disableAnimations, renderer }: {
  theme: ThemePrepared
  componentKey: string
  props: PropsWithVarsAndStyles & { design?: ComponentDesignProp }
  resolvedVariables: ComponentVariablesPrepared
  rtl: boolean
  disableAnimations: boolean
  renderer: {
    renderRule: RendererRenderRule
  }
}): ResolveStylesResult => {
  // Resolve styles using resolved variables, merge results, allow props.styles to override
  let mergedStyles: ComponentSlotStylesPrepared = theme.componentStyles[componentKey] || {
    root: () => ({}),
  }

  const hasInlineOverrides = !_.isNil(props.design) || !_.isNil(props.styles)

  if (hasInlineOverrides) {
    mergedStyles = mergeComponentStyles(
      mergedStyles,
      props.design && withDebugId({ root: props.design }, 'props.design'),
      props.styles &&
      withDebugId({ root: props.styles } as ComponentSlotStylesInput, 'props.styles'),
    )
  }

  const styleParam: ComponentStyleFunctionParam = {
    displayName: componentKey,
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
    displayName: componentKey, // does not affect styles, only used by useEnhancedRenderer in docs
  }

  const result = resolveStylesAndClasses(mergedStyles, styleParam, (style: ICSSInJSStyle) =>
    renderer.renderRule(() => style, felaParam),
  )

  return result
}

export default getStyles
