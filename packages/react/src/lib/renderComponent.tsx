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
} from '../themes/types'
import { Props } from '../types'
import {
  AccessibilityBehavior,
  AccessibilityDefinition,
  AccessibilityActionHandlers,
  FocusZoneMode,
  FocusZoneDefinition,
} from './accessibility/types'
import { defaultBehavior } from './accessibility'
import getKeyDownHandlers from './getKeyDownHandlers'
import { mergeComponentStyles, mergeComponentVariables } from './mergeThemes'
import { FocusZoneProps, FocusZone, FocusZone as FabricFocusZone } from './accessibility/FocusZone'
import { FOCUSZONE_WRAP_ATTRIBUTE } from './accessibility/FocusZone/focusUtilities'
import createAnimationStyles from './createAnimationStyles'
import { generateColorScheme } from './colorUtils'

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
  defaultProps?: { [key: string]: any }
  displayName: string
  handledProps: string[]
  props: PropsWithVarsAndStyles
  state: State
  actionHandlers: AccessibilityActionHandlers
  focusZoneRef: (focusZone: FocusZone) => void
  render: RenderComponentCallback<P>
}

const getAccessibility = (
  props: State & PropsWithVarsAndStyles,
  actionHandlers: AccessibilityActionHandlers,
  isRtlEnabled: boolean,
) => {
  const { accessibility: customAccessibility, defaultAccessibility } = props
  const accessibility: AccessibilityDefinition = (customAccessibility ||
    defaultAccessibility ||
    defaultBehavior)(props)

  const keyHandlers = getKeyDownHandlers(actionHandlers, accessibility.keyActions, isRtlEnabled)
  return {
    ...accessibility,
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
  ref: (focusZone: FocusZone) => void,
) {
  props[FOCUSZONE_WRAP_ATTRIBUTE] = true
  return (
    <FocusZone ref={ref} {...props}>
      {children}
    </FocusZone>
  )
}

const renderWithFocusZone = <P extends {}>(
  render: RenderComponentCallback<P>,
  focusZoneDefinition: FocusZoneDefinition,
  config: RenderResultConfig<P>,
  focusZoneRef: (focusZone: FocusZone) => void,
): any => {
  if (focusZoneDefinition.mode === FocusZoneMode.Wrap) {
    return wrapInGenericFocusZone(
      FabricFocusZone,
      {
        ...focusZoneDefinition.props,
        isRtl: config.rtl,
      },
      render(config),
      focusZoneRef,
    )
  }
  if (focusZoneDefinition.mode === FocusZoneMode.Embed) {
    const originalElementType = config.ElementType
    config.ElementType = FabricFocusZone as any
    config.unhandledProps = { ...config.unhandledProps, ...focusZoneDefinition.props }
    config.unhandledProps.as = originalElementType
    config.unhandledProps.ref = focusZoneRef
    config.unhandledProps.isRtl = config.rtl
  }
  return render(config)
}

const renderComponent = <P extends {}>(
  config: RenderConfig<P>,
  theme: ThemePrepared,
): React.ReactElement<P> => {
  const {
    className,
    defaultProps,
    displayName,
    handledProps,
    props,
    state,
    actionHandlers,
    focusZoneRef,
    render,
  } = config

  if (_.isEmpty(theme)) {
    logProviderMissingWarning()
  }

  const {
    siteVariables = {
      colorScheme: {},
      colors: {},
      contextualColors: {},
      emphasisColors: {},
      naturalColors: {},
      fontSizes: {},
    },
    componentVariables = {},
    componentStyles = {},
    rtl = false,
    renderer = felaRenderer,
  } = theme || {}
  const ElementType = getElementType({ defaultProps }, props) as React.ReactType<P>

  const stateAndProps = { ...state, ...props }

  // Resolve variables for this component, allow props.variables to override
  const resolvedVariables: ComponentVariablesObject = mergeComponentVariables(
    componentVariables[displayName],
    props.variables,
  )(siteVariables)

  const animationCSSProp = props.animation ? createAnimationStyles(props.animation, theme) : {}

  // Resolve styles using resolved variables, merge results, allow props.styles to override
  const mergedStyles: ComponentSlotStylesPrepared = mergeComponentStyles(
    componentStyles[displayName],
    {
      root: props.styles,
    },
  )

  const accessibility: AccessibilityBehavior = getAccessibility(stateAndProps, actionHandlers, rtl)

  const unhandledProps = getUnhandledProps({ handledProps }, props)

  const colors = generateColorScheme(stateAndProps.color, resolvedVariables.colorScheme)

  const styleParam: ComponentStyleFunctionParam = {
    props: stateAndProps,
    variables: resolvedVariables,
    theme,
    colors,
  }

  mergedStyles.root = {
    ...callable(mergedStyles.root)(styleParam),
    ...animationCSSProp,
  }

  const resolvedStyles: ComponentSlotStylesPrepared = Object.keys(mergedStyles).reduce(
    (acc, next) => ({ ...acc, [next]: callable(mergedStyles[next])(styleParam) }),
    {},
  )

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
    theme,
  }

  if (accessibility.focusZone) {
    return renderWithFocusZone(render, accessibility.focusZone, resolvedConfig, focusZoneRef)
  }

  return render(resolvedConfig)
}

export default renderComponent
