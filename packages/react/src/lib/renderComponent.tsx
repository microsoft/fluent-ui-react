import cx from 'classnames'
import * as React from 'react'
import * as _ from 'lodash'

import callable from './callable'
import felaRenderer from './felaRenderer'
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
import {
  AccessibilityDefinition,
  FocusZoneMode,
  FocusZoneDefinition,
  Accessibility,
} from './accessibility/types'
import { ReactAccessibilityBehavior, AccessibilityActionHandlers } from './accessibility/reactTypes'
import getKeyDownHandlers from './getKeyDownHandlers'
import { mergeComponentStyles, mergeComponentVariables } from './mergeThemes'
import { FocusZoneProps, FocusZone } from './accessibility/FocusZone'
import { FOCUSZONE_WRAP_ATTRIBUTE } from './accessibility/FocusZone/focusUtilities'
import createAnimationStyles from './createAnimationStyles'
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
}

export type RenderComponentCallback<P> = (config: RenderResultConfig<P>) => any

export interface RenderConfig<P> {
  className?: string
  defaultProps?: { [key: string]: any }
  displayName: string
  handledProps: string[]
  props: PropsWithVarsAndStyles
  state: State
  actionHandlers: AccessibilityActionHandlers
  render: RenderComponentCallback<P>
  saveDebug: (debug: Debug | null) => void
}

const emptyBehavior: ReactAccessibilityBehavior = {
  attributes: {},
  keyHandlers: {},
}

const getAccessibility = (
  props: State & PropsWithVarsAndStyles & { accessibility?: Accessibility },
  actionHandlers: AccessibilityActionHandlers,
  isRtlEnabled: boolean,
): ReactAccessibilityBehavior => {
  const { accessibility } = props

  if (_.isNil(accessibility)) {
    return emptyBehavior
  }

  const definition: AccessibilityDefinition = accessibility(props)
  const keyHandlers = getKeyDownHandlers(actionHandlers, definition.keyActions, isRtlEnabled)

  return {
    ...emptyBehavior,
    ...definition,
    keyHandlers,
  }
}

/**
 * This function provides compile-time type checking for the following:
 * - if FocusZone implements FocusZone interface,
 * - if FocusZone properties extend FocusZoneProps, and
 * - if the passed properties extend FocusZoneProps.
 *
 * Should the FocusZone implementation change at any time, this function should provide a compile-time guarantee
 * that the new implementation is backwards compatible with the old implementation.
 */
function wrapInGenericFocusZone<
  COMPONENT_PROPS extends FocusZoneProps,
  PROPS extends COMPONENT_PROPS,
  COMPONENT extends FocusZone & React.Component<COMPONENT_PROPS>
>(
  FocusZone: { new (...args: any[]): COMPONENT },
  props: PROPS | undefined,
  children: React.ReactNode,
) {
  props[FOCUSZONE_WRAP_ATTRIBUTE] = true
  return <FocusZone {...props}>{children}</FocusZone>
}

const renderWithFocusZone = <P extends {}>(
  render: RenderComponentCallback<P>,
  focusZoneDefinition: FocusZoneDefinition,
  config: RenderResultConfig<P>,
): any => {
  if (focusZoneDefinition.mode === FocusZoneMode.Wrap) {
    return wrapInGenericFocusZone(
      FocusZone,
      {
        ...focusZoneDefinition.props,
        isRtl: config.rtl,
      },
      render(config),
    )
  }
  if (focusZoneDefinition.mode === FocusZoneMode.Embed) {
    const originalElementType = config.ElementType
    config.ElementType = FocusZone as any
    config.unhandledProps = { ...config.unhandledProps, ...focusZoneDefinition.props }
    config.unhandledProps.as = originalElementType
    config.unhandledProps.isRtl = config.rtl
  }
  return render(config)
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
  context: ProviderContextPrepared,
): React.ReactElement<P> => {
  const {
    className,
    defaultProps,
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

  const { rtl = false, renderer = felaRenderer, disableAnimations = false } = context || {}

  const {
    siteVariables = {
      fontSizes: {},
    },
    componentVariables = {},
    componentStyles = {},
  } = (context.theme as ThemePrepared) || {}

  const ElementType = getElementType({ defaultProps }, props) as React.ReactType<P>

  const stateAndProps = { ...state, ...props }

  // Resolve variables for this component, allow props.variables to override
  const resolvedVariables: ComponentVariablesObject = mergeComponentVariables(
    componentVariables[displayName],
    props.variables,
  )(siteVariables)

  const animationCSSProp = props.animation
    ? createAnimationStyles(props.animation, context.theme)
    : {}

  // Resolve styles using resolved variables, merge results, allow props.styles to override
  const mergedStyles: ComponentSlotStylesPrepared = mergeComponentStyles(
    componentStyles[displayName],
    {
      root: props.styles,
    },
  )

  const accessibility: ReactAccessibilityBehavior = getAccessibility(
    stateAndProps,
    actionHandlers,
    rtl,
  )

  const unhandledProps = getUnhandledProps({ handledProps }, props)

  const styleParam: ComponentStyleFunctionParam = {
    props: stateAndProps,
    variables: resolvedVariables,
    theme: context.theme,
    rtl,
    disableAnimations,
  }

  mergedStyles.root = {
    ...callable(mergedStyles.root)(styleParam),
    ...animationCSSProp,
  }

  const resolvedStyles: ComponentSlotStylesPrepared = resolveStyles(mergedStyles, styleParam)

  const classes: ComponentSlotClasses = getClasses(renderer, mergedStyles, styleParam)
  classes.root = cx(className, classes.root, props.className)

  const resolvedConfig: RenderResultConfig<P> = {
    ElementType,
    unhandledProps,
    classes,
    variables: resolvedVariables,
    styles: resolvedStyles,
    accessibility,
    rtl,
    theme: context.theme,
  }

  if (accessibility.focusZone) {
    return renderWithFocusZone(render, accessibility.focusZone, resolvedConfig)
  }

  // conditionally add sources for evaluating debug information to component
  if (isDebugEnabled) {
    saveDebug(
      new Debug({
        componentName: displayName,
        themes: context.originalThemes,
        instanceStylesOverrides: props.styles,
        instanceVariablesOverrides: props.variables,
        resolveStyles: styles => resolveStyles(styles, styleParam),
        resolveVariables: variables => callable(variables)(siteVariables),
      }),
    )
  }

  return render(resolvedConfig)
}

export default renderComponent
