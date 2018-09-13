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
  ThemeIcons,
} from '../../types/theme'
import { IAccessibilityDefinition } from './accessibility/interfaces'
import { DefaultBehavior } from './accessibility'
import { mergeComponentStyles, mergeComponentVariables } from './mergeThemes'

export interface IRenderResultConfig<P> {
  ElementType: React.ReactType<P>
  classes: IComponentPartClasses
  rest: IProps
  variables: ComponentVariablesObject
  styles: IComponentPartStylesPrepared
  accessibility: IAccessibilityDefinition
  icons: ThemeIcons
}

export type RenderComponentCallback<P> = (config: IRenderResultConfig<P>) => any

export interface IRenderConfig {
  className?: string
  defaultProps?: { [key: string]: any }
  displayName: string
  handledProps: string[]
  props: IPropsWithVarsAndStyles
  state: IState
}

const getAccessibility = (props: IState & IPropsWithVarsAndStyles) => {
  const { accessibility: customAccessibility, defaultAccessibility } = props
  return callable(customAccessibility || defaultAccessibility || DefaultBehavior)(props)
}

const renderComponent = <P extends {}>(
  config: IRenderConfig,
  render: RenderComponentCallback<P>,
): React.ReactNode => {
  const { className, defaultProps, displayName, handledProps, props, state } = config

  return (
    <FelaTheme
      render={({
        siteVariables = {},
        componentVariables = {},
        componentStyles = {},
        icons = {},
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
        const accessibility = getAccessibility(stateAndProps)
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
          icons,
        }

        return render(config)
      }}
    />
  )
}

export default renderComponent
