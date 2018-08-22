import * as cx from 'classnames'
import * as React from 'react'
import { FelaTheme } from 'react-fela'

import callable from './callable'
import felaRenderer from './felaRenderer'
import getClasses from './getClasses'
import getElementType from './getElementType'
import getUnhandledProps from './getUnhandledProps'
import toCompactArray from './toCompactArray'
import keyboardHandlerFilter from './accessibility/Helpers/keyboardHandlerFilter'
import { AccessibilityActions } from './accessibility/interfaces'
import _ from 'lodash'

import {
  ComponentStyleFunctionParam,
  ComponentVariablesInput,
  ComponentVariablesObject,
  IComponentPartClasses,
  IComponentPartStylesInput,
  IComponentPartStylesPrepared,
  IProps,
  IThemeInput,
  IThemePrepared,
} from '../../types/theme'
import { IAccessibilityDefinition, FocusZoneMode } from './accessibility/interfaces'
import { DefaultBehavior } from './accessibility'
import { mergeComponentStyles, mergeComponentVariables } from './mergeThemes'
import {
  IFocusZoneProps,
  IFocusZone,
  FocusZone as FabricFocusZone,
} from './accessibility/FocusZone'

export interface IRenderResultConfig<P> {
  ElementType: React.ReactType<P>
  classes: IComponentPartClasses
  rest: IProps
  variables: ComponentVariablesObject
  styles: IComponentPartStylesPrepared
  accessibility: IAccessibilityDefinition
}

export type RenderComponentCallback<P> = (config: IRenderResultConfig<P>) => any

type IRenderConfigProps = {
  [key: string]: any
  variables?: ComponentVariablesInput
  styles?: IComponentPartStylesInput
}

export interface IRenderConfig {
  className?: string
  defaultProps?: { [key: string]: any }
  displayName?: string
  handledProps: string[]
  props: IRenderConfigProps
  state: { [key: string]: any }
  actions: AccessibilityActions
}

const getAccessibility = <P extends {}>(props, state) => {
  const { accessibility: customAccessibility, defaultAccessibility } = props
  return callable(customAccessibility || defaultAccessibility || DefaultBehavior)({
    ...props,
    ...state,
  })
}

/**
 * This function provides compile-time type checking for the following:
 * - if FocusZone implements IFocusZone interface,
 * - if FocusZone properties extend IFocusZoneProps, and
 * - if the passed properties extend IFocusZoneProps.
 *
 * Should the FocusZone implementation change at any time, this function should provide a compile-time guarantee
 * that the new implementation is backwards compatible with the old implementation.
 */
function wrapInGenericFocusZone<
  COMPONENT_PROPS extends IFocusZoneProps,
  PROPS extends COMPONENT_PROPS,
  COMPONENT extends IFocusZone & React.Component<COMPONENT_PROPS>
>(FocusZone: { new (...args: any[]): COMPONENT }, props: PROPS, children: React.ReactNode) {
  return <FocusZone {...props}>{children}</FocusZone>
}

function addKeyDownHandler(rest, actions, accessibility, props) {
  const actionsDefinition = accessibility.actionsDefinition

  if (!actions || !actionsDefinition) return

  let hasCommonActions = false

  for (const actionName in actionsDefinition) {
    if (actions[actionName]) {
      hasCommonActions = true
      break
    }
  }

  if (!hasCommonActions) return

  rest.onKeyDown = (event: KeyboardEvent) => {
    for (const actionName in actionsDefinition) {
      if (!actions[actionName]) continue
      const eventHandler = keyboardHandlerFilter(
        actions[actionName],
        actionsDefinition[actionName].keyCombinations,
      )
      eventHandler && eventHandler(event)
    }
    _.invoke(props, 'onKeyDown', event, props)
  }
}

const renderComponent = <P extends {}>(
  config: IRenderConfig,
  render: RenderComponentCallback<P>,
): React.ReactNode => {
  const { className, defaultProps, displayName, handledProps, props, state, actions } = config

  return (
    <FelaTheme
      render={({
        siteVariables = {},
        componentVariables = {},
        componentStyles = {},
        rtl = false,
        renderer = felaRenderer,
      }: IThemeInput | IThemePrepared = {}) => {
        const ElementType = getElementType({ defaultProps }, props)
        const rest = getUnhandledProps({ handledProps }, props)

        const accessibility = getAccessibility(props, state) as IAccessibilityDefinition
        addKeyDownHandler(rest, actions, accessibility, props)

        // Resolve variables for this component, allow props.variables to override
        const resolvedVariables: ComponentVariablesObject = mergeComponentVariables(
          componentVariables[displayName],
          props.variables,
        )(siteVariables)

        // Resolve styles using resolved variables, merge results, allow props.styles to override
        const mergedStyles = mergeComponentStyles(componentStyles[displayName], props.styles)
        const styleParam: ComponentStyleFunctionParam = { props, variables: resolvedVariables }
        const resolvedStyles = Object.keys(mergedStyles).reduce(
          (acc, next) => ({ ...acc, [next]: callable(mergedStyles[next])(styleParam) }),
          {},
        )

        const classes: IComponentPartClasses = getClasses(renderer, mergedStyles, styleParam)
        classes.root = cx(className, classes.root, props.className)

        const config: IRenderResultConfig<P> = {
          ElementType,
          rest,
          classes,
          variables: resolvedVariables,
          styles: resolvedStyles,
          accessibility,
        }

        const rendered = render(config)

        if (accessibility.focusZone && accessibility.focusZone.mode === FocusZoneMode.Wrap) {
          return wrapInGenericFocusZone(FabricFocusZone, accessibility.focusZone.props, rendered)
        }
        return rendered
      }}
    />
  )
}

export default renderComponent
