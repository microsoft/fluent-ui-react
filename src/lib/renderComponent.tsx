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
import { IAccessibilityBehavior, AccessibilityActions } from './accessibility/interfaces'
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
  actions: AccessibilityActions
}

const getAccessibility = (
  props: IState & IPropsWithVarsAndStyles,
  actions: AccessibilityActions,
) => {
  const { accessibility: customAccessibility, defaultAccessibility } = props
  const accessibility = callable(customAccessibility || defaultAccessibility || DefaultBehavior)(
    props,
  )

  const handlers = getKeyDownHandlers(actions, accessibility, props)
  return {
    ...accessibility,
    handlers,
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

        // Resolve variables for this component, allow props.variables to override
        const resolvedVariables: ComponentVariablesObject = mergeComponentVariables(
          componentVariables[displayName],
          props.variables,
        )(siteVariables)

        // Resolve styles using resolved variables, merge results, allow props.styles to override
        const mergedStyles = mergeComponentStyles(componentStyles[displayName], props.styles)
        const stateAndProps = { ...state, ...props }
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

        const accessibility = getAccessibility(stateAndProps, actions)

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
