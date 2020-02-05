import {
  callable,
  ComponentSlotStylesInput,
  ComponentSlotStylesPrepared,
  ComponentSlotStylesResolved,
  ComponentStyleFunctionParam,
  ComponentVariablesObject,
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
  styles: ComponentSlotStylesResolved
  theme: StylesContextValue['theme']
}

const variablesCache = new WeakMap<ThemePrepared, Record<string, any>>()

const resolveVariables = (
  displayName: string,
  theme: ThemePrepared,
  variables: any | undefined,
): any => {
  //
  // Simple caching model, works only if there is no `props.variables`
  // Resolves variables for this component, cache the result in provider
  //

  if (!variablesCache.has(theme)) {
    variablesCache.set(theme, {})
  }

  // @ts-ignore
  if (!variablesCache.get(theme)[displayName]) {
    // component variables must not be undefined/null (see mergeComponentVariables contract)
    variablesCache.set(theme, {
      ...variablesCache.get(theme),
      [displayName]: callable(theme.componentVariables[displayName])(theme.siteVariables) || {},
    })
  }

  if (variables === undefined) {
    // @ts-ignore
    return variablesCache.get(theme)[displayName]
  }

  return mergeComponentVariables(
    // @ts-ignore
    variablesCache.get(theme)[displayName],
    withDebugId(variables, 'props.variables'),
  )(theme.siteVariables)
}

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
    __experimental_cache: cacheEnabled,
  } = options
  const { className, design, styles, variables, ...restProps } = props

  //
  // To compute styles are going through three stages:
  // - resolve variables (siteVariables => componentVariables + props.variables)
  // - resolve styles (with resolvedVariables & props.styles & props.design)
  // - compute classes (with resolvedStyles)
  //

  const resolvedVariables: any = resolveVariables(displayName, theme, props.variables)

  //
  // STYLES
  //

  const noInlineOverrides = !(design || styles || variables)

  const { classes, resolvedStyles, resolvedStylesDebug } = resolveStyles({
    theme,
    displayName,
    disableAnimations,
    rtl,
    renderer,
    props,
    resolvedVariables,
    cacheEnabled: cacheEnabled && noInlineOverrides,
    styleProps: restProps,
  })

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

const resolveStyles = ({
  theme,
  displayName,
  props,
  resolvedVariables,
  rtl,
  disableAnimations,
  renderer,
  cacheEnabled,
  styleProps,
}: {
  theme: ThemePrepared
  displayName: string
  props: PropsWithVarsAndStyles & { design?: ComponentDesignProp }
  resolvedVariables: object
  rtl: boolean
  disableAnimations: boolean
  renderer: {
    renderRule: RendererRenderRule
  }
  cacheEnabled: boolean | undefined
  styleProps: any
}): ResolveStylesResult => {
  // Resolve styles using resolved variables, merge results, allow props.styles to override
  let mergedStyles: ComponentSlotStylesPrepared = theme.componentStyles[displayName] || {
    root: () => ({}),
  }
  const hasInlineStylesOverrides = !_.isNil(props.design) || !_.isNil(props.styles)

  if (hasInlineStylesOverrides) {
    mergedStyles = mergeComponentStyles(
      mergedStyles,
      props.design && withDebugId({ root: props.design }, 'props.design'),
      props.styles &&
        withDebugId({ root: props.styles } as ComponentSlotStylesInput, 'props.styles'),
    )
  }

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

  const result = resolveStylesAndClasses(
    mergedStyles,
    styleParam,
    (style: ICSSInJSStyle) => renderer.renderRule(() => style, felaParam),
    cacheEnabled,
    displayName,
    theme,
    styleProps,
  )

  return result
}

export default getStyles
