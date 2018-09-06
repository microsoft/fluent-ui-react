import * as cx from 'classnames'
import * as React from 'react'
import { FelaTheme } from 'react-fela'

import callable from './callable'
import felaRenderer from './felaRenderer'
import getClasses from './getClasses'
import getElementType from './getElementType'
import getUnhandledProps from './getUnhandledProps'
import {
  ComponentStyleFunctionParam,
  ComponentVariablesObject,
  IComponentPartClasses,
  IComponentPartStylesPrepared,
  IProps,
  IPropsWithVarsAndStyles,
  IState,
  IThemeInput,
  IThemePrepared,
} from '../../types/theme'
import {
  IAccessibilityBehavior,
  AccessibilityActionHandlers,
  IAccessibilityDefinition,
} from './accessibility/interfaces'
import { DefaultBehavior } from './accessibility'
import getKeyDownHandlers from './getKeyDownHandlers'
import { mergeComponentStyles, mergeComponentVariables } from './mergeThemes'

export interface IRenderResultConfig<P> {
  ElementType: React.ReactType<P>
  classes: IComponentPartClasses
  rest: IProps
  variables: ComponentVariablesObject
  styles: IComponentPartStylesPrepared
  accessibility: IAccessibilityBehavior
}

export type RenderComponentCallback<P> = (config: IRenderResultConfig<P>) => any

export interface IRenderConfig {
  className?: string
  defaultProps?: { [key: string]: any }
  displayName: string
  handledProps: string[]
  props: IPropsWithVarsAndStyles
  state: IState
  actionHandlers: AccessibilityActionHandlers
}

const getAccessibility = (
  props: IState & IPropsWithVarsAndStyles,
  actionHandlers: AccessibilityActionHandlers,
) => {
  const { accessibility: customAccessibility, defaultAccessibility } = props
  const accessibility: IAccessibilityDefinition = callable(
    customAccessibility || defaultAccessibility || DefaultBehavior,
  )(props)

  const keyHandlers = getKeyDownHandlers(actionHandlers, accessibility.keyActions, props)
  return {
    ...accessibility,
    keyHandlers,
  }
}

const renderComponent = <P extends {}>(
  config: IRenderConfig,
  render: RenderComponentCallback<P>,
): React.ReactNode => {
  const {
    className,
    defaultProps,
    displayName,
    handledProps,
    props,
    state,
    actionHandlers,
  } = config

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

        // Resolve variables for this component, allow props.variables to override
        const resolvedVariables: ComponentVariablesObject = mergeComponentVariables(
          componentVariables[displayName],
          props.variables,
        )(siteVariables)

        // Resolve styles using resolved variables, merge results, allow props.styles to override
        const mergedStyles = mergeComponentStyles(componentStyles[displayName], props.styles)
        const stateAndProps = { ...state, ...props }
        const accessibility = getAccessibility(stateAndProps, actionHandlers)
        const rest = getUnhandledProps(
          { handledProps: [...handledProps, ...accessibility.handledProps] },
          props,
        )
        const styleParam: ComponentStyleFunctionParam = {
          props: stateAndProps,
          variables: resolvedVariables,
        }
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
