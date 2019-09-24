import {
  AccessibilityBehavior,
  AccessibilityActionHandlers,
  callable,
  getElementType,
  getUnhandledProps,
  unstable_getAccessibility as getAccessibility,
  unstable_wrapInFocusZone as wrapInFocusZone,
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
  ComponentSlotStylesInput,
} from '../themes/types'
import { Props, ProviderContextPrepared } from '../types'
import { emptyTheme, mergeComponentStyles, mergeComponentVariables } from './mergeThemes'
import createAnimationStyles from './createAnimationStyles'
import Debug, { isEnabled as isDebugEnabled } from './debug'

export interface RenderResultConfig<P> {
  ElementType: React.ElementType<P>
  classes: ComponentSlotClasses
  unhandledProps: Props
  variables: ComponentVariablesObject
  styles: ComponentSlotStylesPrepared
  accessibility: AccessibilityBehavior
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
  saveDebug: (debug: Debug | null) => void
}

const resolveStyles = (
  styles: ComponentSlotStylesInput,
  styleParam: ComponentStyleFunctionParam,
): ComponentSlotStylesPrepared => {
  return Object.keys(styles).reduce(
    (acc, next) => ({ ...acc, [next]: callable(styles[next])(styleParam) }),
    {},
  )
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
    props.variables,
  )(theme.siteVariables)

  const animationCSSProp = props.animation
    ? createAnimationStyles(props.animation, context.theme)
    : {}

  // Resolve styles using resolved variables, merge results, allow props.styles to override
  const mergedStyles: ComponentSlotStylesPrepared = mergeComponentStyles(
    theme.componentStyles[displayName],
    { root: props.design },
    { root: props.styles },
    { root: animationCSSProp },
  )

  const accessibility: AccessibilityBehavior = getAccessibility(
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
  }

  const resolvedStyles: ComponentSlotStylesPrepared = {}
  const classes: ComponentSlotClasses = {}

  Object.keys(mergedStyles).forEach(slotName => {
    resolvedStyles[slotName] = callable(mergedStyles[slotName])(styleParam)

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

  // conditionally add sources for evaluating debug information to component
  if (isDebugEnabled) {
    saveDebug(
      new Debug({
        componentName: displayName,
        themes: context ? context.originalThemes : [],
        instanceStylesOverrides: props.styles,
        instanceVariablesOverrides: props.variables,
        resolveStyles: styles => resolveStyles(styles, styleParam),
        resolveVariables: variables => callable(variables)(theme.siteVariables),
      }),
    )
  }

  return wrapInFocusZone(render(resolvedConfig), accessibility, rtl)
}

export default renderComponent
