import cx from 'classnames'
import * as _ from 'lodash' // REMOVE ME PLEASE!

import callable from '../utils/callable'
import {
  ComponentSlotStylesPrepared,
  ComponentStyleFunctionParam,
  ComponentVariablesObject,
  DebugData,
  emptyTheme,
  isDebugEnabled,
  mergeComponentStyles,
  mergeComponentVariables,
  PropsWithVarsAndStyles,
  withDebugId,
} from '@fluentui/styles'

import createAnimationStyles from './createAnimationStyles'
import resolveStylesAndClasses from './resolveStylesAndClasses'
import { ComponentSlotClasses, ProviderContextPrepared } from '@fluentui/react' // TODO fix me

export interface RenderResultConfig {
  classes: ComponentSlotClasses
  variables: ComponentVariablesObject
  styles: ComponentSlotStylesPrepared
}

export interface RenderConfig {
  className?: string
  displayName: string
  props: PropsWithVarsAndStyles
  saveDebug: (debug: DebugData | null) => void
}

const getStyles = (options: any, context?: ProviderContextPrepared): RenderConfig => {
  const { displayName, className, props, saveDebug } = options

  // const displayName = ''
  // const className = ''
  // const props = {} // include state
  // const saveDebug = () => {}

  const {
    disableAnimations = false,
    renderer = null,
    rtl = false,
    theme = emptyTheme,
    _internal_resolvedComponentVariables: resolvedComponentVariables = {},
  } = context || {}

  // Resolve variables for this component, cache the result in provider
  if (!resolvedComponentVariables[displayName]) {
    resolvedComponentVariables[displayName] =
      callable(theme.componentVariables[displayName])(theme.siteVariables) || {} // component variables must not be undefined/null (see mergeComponentVariables contract)
  }

  // Merge inline variables on top of cached variables
  const resolvedVariables = props.variables
    ? mergeComponentVariables(
        resolvedComponentVariables[displayName],
        withDebugId(props.variables, 'props.variables'),
      )(theme.siteVariables)
    : resolvedComponentVariables[displayName]

  const animationCSSProp = props.animation
    ? // @ts-ignore
      createAnimationStyles(props.animation, context.theme)
    : {}

  // Resolve styles using resolved variables, merge results, allow props.styles to override
  const mergedStyles: ComponentSlotStylesPrepared = mergeComponentStyles(
    theme.componentStyles[displayName],
    withDebugId({ root: props.design }, 'props.design'),
    withDebugId({ root: props.styles }, 'props.styles'),
    withDebugId({ root: animationCSSProp }, 'props.animation'),
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
  const felaParam = {
    theme: { direction },
    disableAnimations,
    displayName, // does not affect styles, only used by useEnhancedRenderer in docs
  }

  const { resolvedStyles, resolvedStylesDebug, classes } = resolveStylesAndClasses(
    mergedStyles,
    styleParam,
    // @ts-ignore
    renderer ? style => renderer.renderRule(() => style, felaParam) : undefined,
  )

  classes.root = cx(className, classes.root, props.className)

  // conditionally add sources for evaluating debug information to component
  if (process.env.NODE_ENV !== 'production' && isDebugEnabled) {
    saveDebug({
      componentName: displayName,
      componentVariables: _.filter(
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

  return {
    // @ts-ignore
    classes,
    variables: resolvedVariables,
    styles: resolvedStyles,
    theme,
  }
}

export default getStyles
