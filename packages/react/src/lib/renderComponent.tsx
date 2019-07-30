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
  ComponentSlotClasses,
  ComponentSlotStylesPrepared,
  ComponentStyleFunctionParam,
  ComponentVariablesObject,
  PropsWithVarsAndStyles,
  State,
  ThemePrepared,
} from '../themes/types'
import { Props, ProviderContextPrepared } from '../types'
import {
  Accessibility,
  AccessibilityDefinition,
  FocusZoneDefinition,
  FocusZoneMode,
} from './accessibility/types'
import { AccessibilityActionHandlers, ReactAccessibilityBehavior } from './accessibility/reactTypes'
import getKeyDownHandlers from './getKeyDownHandlers'
import { mergeComponentStyles, mergeComponentVariables } from './mergeThemes'
import { FocusZone, FocusZoneProps } from './accessibility/FocusZone'
import { FOCUSZONE_WRAP_ATTRIBUTE } from './accessibility/FocusZone/focusUtilities'
import createAnimationStyles from './createAnimationStyles'
import { childOfKind } from 'tslint'

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
    { root: props.styles },
    { root: animationCSSProp },
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

  const resolvedStyles: ComponentSlotStylesPrepared = Object.keys(mergedStyles).reduce(
    (acc, next) => ({ ...acc, [next]: callable(mergedStyles[next])(styleParam) }),
    {},
  )

  const classes: ComponentSlotClasses = getClasses(renderer, mergedStyles, styleParam)
  classes.root = cx(className, classes.root, props.className)

  if (displayName === 'Button') {
    const param = _.cloneDeep(styleParam)

    const keysToVals = o => _.mapValues(o, (v, k) => `variables.${k}`)

    param.variables = keysToVals(param.variables)
    param.theme.siteVariables = keysToVals(param.theme.siteVariables)

    const styleWithVariableNames: ComponentSlotStylesPrepared = Object.keys(mergedStyles).reduce(
      (parts, part) => ({ ...parts, [part]: callable(mergedStyles[part])(param) }),
      {},
    )

    const varPrefixRegExp = /^variables\./
    const usedVariables = []
    const recordUsedVariables = obj => {
      _.forEach(obj, val => {
        if (_.isPlainObject(val)) {
          recordUsedVariables(val)
        } else if (varPrefixRegExp.test(val)) {
          const variableName = val.replace(varPrefixRegExp, '')
          if (!_.includes(usedVariables, variableName)) {
            usedVariables.push(variableName)
          }
        }
      })
    }

    Object.keys(styleWithVariableNames).forEach(part => {
      recordUsedVariables(styleWithVariableNames[part])
    })

    console.log(styleWithVariableNames)
    console.log(usedVariables)
  }

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

  return render(resolvedConfig)
}

export default renderComponent
