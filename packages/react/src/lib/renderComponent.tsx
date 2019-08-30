import cx from 'classnames'
import * as React from 'react'
import * as _ from 'lodash'

import callable from './callable'
import getClasses from './getClasses'
import getElementType from './getElementType'
import getUnhandledProps from './getUnhandledProps'
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
import { FocusZoneMode } from './accessibility/types'
import { ReactAccessibilityBehavior, AccessibilityActionHandlers } from './accessibility/reactTypes'
import { emptyTheme, mergeComponentStyles, mergeComponentVariables } from './mergeThemes'
import { FocusZone } from './accessibility/FocusZone'
import { FOCUSZONE_WRAP_ATTRIBUTE } from './accessibility/FocusZone/focusUtilities'
import createAnimationStyles from './createAnimationStyles'
import getAccessibility from './accessibility/getAccessibility'
import Debug, { isEnabled as isDebugEnabled } from './debug'

export interface RenderResultConfig<P> {
  ElementType: React.ElementType<P>
  classes: ComponentSlotClasses
  unhandledProps: Props
  variables: ComponentVariablesObject
  styles: ComponentSlotStylesPrepared
  accessibility: ReactAccessibilityBehavior
  rtl: boolean
  theme: ThemePrepared
  wrap: RenderComponentCallback<P>
}

// TODO: can we rename?
export type RenderComponentCallback<P> = (
  children: React.ReactNode | React.ReactNodeArray,
) => React.ReactElement<P>

export interface RenderConfig<P> {
  className?: string
  displayName: string
  handledProps?: string[]
  props: PropsWithVarsAndStyles
  state: State
  actionHandlers?: AccessibilityActionHandlers
  context: ProviderContextPrepared
  saveDebug: (debug: Debug | null) => void
}

const resolveStyles = (
  styles: ComponentSlotStylesInput,
  styleParam: ComponentStyleFunctionParam,
): ComponentSlotStylesPrepared => {
  return Object.keys(styles).reduce(
    (acc, slot) => ({ ...acc, [slot]: callable(styles[slot])(styleParam) }),
    {},
  )
}

const renderComponent = <P extends {}>(config: RenderConfig<P>): RenderResultConfig<P> => {
  const {
    className,
    displayName,
    handledProps,
    props,
    state,
    actionHandlers,
    context,
    saveDebug,
  } = config

  if (_.isEmpty(context)) {
    logProviderMissingWarning()
  }

  const { disableAnimations = false, renderer = null, rtl = false, theme = emptyTheme } =
    context || {}

  const ElementType = getElementType(props) as React.ReactType<P>

  const stateAndProps = { ...state, ...props }

  // TODO: fix bug with merging theme A on top of theme B when theme B's variables function references values missing in theme A's site variables.
  // CONCLUSION: use flat variables in site vars and component vars
  //   - bugs are from shallow merging deeply nested vars
  //   - it is confusing and inconsistent to sometimes deep merge and sometimes not
  //   - flat structure will align properly with style-dictionary format
  //   - this doesn't solve all problems, we need to know how to replace all "red" colors for instance in a merge operation
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
    { root: props.styles },
    { root: animationCSSProp },
  )

  const accessibility: ReactAccessibilityBehavior = getAccessibility(
    props.accessibility,
    stateAndProps,
    actionHandlers,
    rtl,
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

  const resolvedStyles: ComponentSlotStylesPrepared = resolveStyles(mergedStyles, styleParam)

  const classes: ComponentSlotClasses = renderer
    ? getClasses(renderer, mergedStyles, styleParam)
    : {}
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
    wrap: (element: React.ReactElement<P>) => element,
  }

  if (accessibility.focusZone && accessibility.focusZone.mode === FocusZoneMode.Wrap) {
    resolvedConfig.wrap = children => (
      <FocusZone
        isRtl={resolvedConfig.rtl}
        {...accessibility.focusZone.props}
        {...{ [FOCUSZONE_WRAP_ATTRIBUTE]: true }}
      >
        {children}
      </FocusZone>
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

  return resolvedConfig
}

export default renderComponent
