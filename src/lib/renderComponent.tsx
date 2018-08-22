import * as cx from 'classnames'
import * as React from 'react'
import { FelaTheme } from 'react-fela'

import callable from './callable'
import felaRenderer from './felaRenderer'
import getClasses from './getClasses'
import getElementType from './getElementType'
import getUnhandledProps from './getUnhandledProps'
import toCompactArray from './toCompactArray'
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
import { IAccessibilityDefinition, AccessibilityActions } from './accessibility/interfaces'
import { DefaultBehavior } from './accessibility'
import keyboardHandlerFilter from './accessibility/Helpers/keyboardHandlerFilter'
import { mergeComponentStyles, mergeComponentVariables } from './mergeThemes'

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
 * Adds onKeyDown handler to the Component's rest props, based on Component's actions
 * and keys mappings defined in Accessibility behavior
 * @param {Object} rest The rest props which is to be extended by adding onKeyDown handler
 * @param {AccessibilityActions} actions The input element which is to loose focus.
 * @param {IAccessibilityDefinition} accessibility The input element which is to loose focus.
 * @param {IRenderConfigProps} props The props which are used to invoke onKeyDown handler passed from top.
 */
const addKeyDownHandler = (rest, actions, accessibility, props) => {
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

  rest.onKeyDown = (event: React.KeyboardEvent) => {
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

        const accessibility = getAccessibility(props, state)
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

        return render(config)
      }}
    />
  )
}

export default renderComponent
