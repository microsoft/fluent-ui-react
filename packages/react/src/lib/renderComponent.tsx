import { FocusZoneMode } from '@stardust-ui/accessibility'
import {
  AccessibilityActionHandlers,
  callable,
  FocusZone,
  FocusZoneProps,
  FOCUSZONE_WRAP_ATTRIBUTE,
  getElementType,
  getUnhandledProps,
  ReactAccessibilityBehavior,
  unstable_getAccessibility as getAccessibility,
} from '@stardust-ui/react-bindings'
import cx from 'classnames'
import * as React from 'react'
import * as _ from 'lodash'

import logProviderMissingWarning from './providerMissingHandler'
import {
  ComponentStyleFunctionParam,
  ComponentVariablesObject,
  ComponentSlotClasses,
  ComponentSlotStylesPrepared,
  PropsWithVarsAndStyles,
  State,
  ThemePrepared,
} from '../themes/types'
import { Props, ProviderContextPrepared } from '../types'
import { emptyTheme, mergeComponentStyles, mergeComponentVariables } from './mergeThemes'
import createAnimationStyles from './createAnimationStyles'
import { isEnabled as isDebugEnabled } from './debug/debugEnabled'
import { DebugData } from './debug/debugData'
import withDebugId from './withDebugId'

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
  state: State
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

  const { disableAnimations = false, renderer = null, rtl = false, theme = emptyTheme } =
    context || {}

  const ElementType = getElementType(props) as React.ReactType<P>
  const stateAndProps = { ...state, ...props }

  // Resolve variables for this component, allow props.variables to override
  const resolvedVariables: ComponentVariablesObject = mergeComponentVariables(
    theme.componentVariables[displayName],
    props.variables && withDebugId(props.variables, 'props.variables'),
  )(theme.siteVariables)

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
    displayName, // does not affect styles, only used by useEnhancedRenderer in docs
  }

  const resolvedStyles: ComponentSlotStylesPrepared = {}
  const resolvedStylesDebug: { [key: string]: { styles: Object }[] } = {}
  const classes: ComponentSlotClasses = {}

  Object.keys(mergedStyles).forEach(slotName => {
    resolvedStyles[slotName] = callable(mergedStyles[slotName])(styleParam)

    if (process.env.NODE_ENV !== 'production' && isDebugEnabled) {
      resolvedStylesDebug[slotName] = resolvedStyles[slotName]['_debug']
      delete resolvedStyles[slotName]['_debug']
    }

    if (renderer) {
      classes[slotName] = renderer.renderRule(callable(resolvedStyles[slotName]), felaParam)
    }
  })

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
      componentStyles: _.mapValues(resolvedStylesDebug, v =>
        _.filter(v, v => {
          return !_.isEmpty(v.styles)
        }),
      ),
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
