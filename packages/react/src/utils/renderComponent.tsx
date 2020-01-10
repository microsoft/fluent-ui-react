import { FocusZoneMode } from '@fluentui/accessibility'
import {
  AccessibilityActionHandlers,
  FocusZone,
  FocusZoneProps,
  FOCUSZONE_WRAP_ATTRIBUTE,
  getElementType,
  getUnhandledProps,
  ReactAccessibilityBehavior,
  unstable_getAccessibility as getAccessibility,
} from '@fluentui/react-bindings'
import {
  callable,
  emptyTheme,
  ComponentSlotStylesPrepared,
  ComponentStyleFunctionParam,
  ComponentVariablesObject,
  DebugData,
  isDebugEnabled,
  mergeComponentStyles,
  mergeComponentVariables,
  PropsWithVarsAndStyles,
  ThemePrepared,
  withDebugId,
} from '@fluentui/styles'
import cx from 'classnames'
import * as _ from 'lodash'
import * as React from 'react'

import { ComponentSlotClasses } from '../themes/types'
import { Props, ProviderContextPrepared } from '../types'
import createAnimationStyles from './createAnimationStyles'
import logProviderMissingWarning from './providerMissingHandler'
import Telemetry from './Telemetry'
import resolveStylesAndClasses from './resolveStylesAndClasses'

export interface RenderResultConfig<P> {
  ElementType: React.ElementType<P>
  classes: ComponentSlotClasses
  unhandledProps: Props
  variables: ComponentVariablesObject
  styles: ComponentSlotStylesPrepared
  accessibility: ReactAccessibilityBehavior
  rtl: boolean
  theme: ThemePrepared
}

export type RenderComponentCallback<P> = (config: RenderResultConfig<P>) => any

export interface RenderConfig<P> {
  className?: string
  displayName: string
  handledProps: string[]
  props: PropsWithVarsAndStyles
  state: Record<string, any>
  actionHandlers: AccessibilityActionHandlers
  render: RenderComponentCallback<P>
  saveDebug: (debug: DebugData | null) => void
}

const renderComponent = <P extends {}>(
  config: RenderConfig<P>,
  context?: ProviderContextPrepared,
): React.ReactElement<P> => {
  const {
    className,
    displayName,
    handledProps,
    props,
    state,
    actionHandlers,
    render,
    saveDebug = () => {},
  } = config

  if (_.isEmpty(context)) {
    logProviderMissingWarning()
  }

  const {
    disableAnimations = false,
    renderer = null,
    rtl = false,
    theme = emptyTheme,
    telemetry = undefined as Telemetry,
    _internal_resolvedComponentVariables: resolvedComponentVariables = {},
  } = context || {}

  const startTime = telemetry && telemetry.enabled ? performance.now() : 0

  const ElementType = getElementType(props) as React.ReactType<P>
  const stateAndProps = { ...state, ...props }

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
    ? createAnimationStyles(props.animation, context.theme)
    : {}

  // Resolve styles using resolved variables, merge results, allow props.styles to override
  const mergedStyles: ComponentSlotStylesPrepared = mergeComponentStyles(
    theme.componentStyles[displayName],
    withDebugId({ root: props.design }, 'props.design'),
    withDebugId({ root: props.styles }, 'props.styles'),
    withDebugId({ root: animationCSSProp }, 'props.animation'),
  )

  const accessibility: ReactAccessibilityBehavior = getAccessibility(
    displayName,
    props.accessibility,
    stateAndProps,
    rtl,
    actionHandlers,
  )

  const unhandledProps = getUnhandledProps(handledProps, props)

  const styleParam: ComponentStyleFunctionParam = {
    displayName,
    props: stateAndProps,
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
    renderer ? style => renderer.renderRule(() => style, felaParam) : undefined,
  )

  classes.root = cx(className, classes.root, props.className)

  const resolvedConfig: RenderResultConfig<P> = {
    ElementType,
    unhandledProps,
    classes,
    variables: resolvedVariables,
    styles: resolvedStyles,
    accessibility,
    rtl,
    theme,
  }
  let wrapInFocusZone: (element: React.ReactElement) => React.ReactElement = element => element

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

  if (telemetry && telemetry.enabled) {
    const duration = performance.now() - startTime

    if (telemetry.performance[displayName]) {
      telemetry.performance[displayName].count++
      telemetry.performance[displayName].msTotal += duration
      telemetry.performance[displayName].msMin = Math.min(
        duration,
        telemetry.performance[displayName].msMin,
      )
      telemetry.performance[displayName].msMax = Math.max(
        duration,
        telemetry.performance[displayName].msMax,
      )
    } else {
      telemetry.performance[displayName] = {
        count: 1,
        msTotal: duration,
        msMin: duration,
        msMax: duration,
      }
    }
  }

  if (accessibility.focusZone && accessibility.focusZone.mode === FocusZoneMode.Wrap) {
    wrapInFocusZone = element =>
      React.createElement(
        FocusZone,
        {
          [FOCUSZONE_WRAP_ATTRIBUTE]: true,
          ...accessibility.focusZone.props,
          isRtl: rtl,
        } as FocusZoneProps & { [FOCUSZONE_WRAP_ATTRIBUTE]: boolean },
        element,
      )
  }

  if (accessibility.focusZone && accessibility.focusZone.mode === FocusZoneMode.Embed) {
    const originalElementType = resolvedConfig.ElementType

    resolvedConfig.ElementType = FocusZone as any
    resolvedConfig.unhandledProps = {
      ...resolvedConfig.unhandledProps,
      ...accessibility.focusZone.props,
    }
    resolvedConfig.unhandledProps.as = originalElementType
    resolvedConfig.unhandledProps.isRtl = resolvedConfig.rtl
  }

  return wrapInFocusZone(render(resolvedConfig))
}

export default renderComponent
