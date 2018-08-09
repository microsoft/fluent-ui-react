import * as cx from 'classnames'
import * as React from 'react'
import { FelaTheme } from 'react-fela'

import getClasses from './getClasses'
import getElementType from './getElementType'
import getUnhandledProps from './getUnhandledProps'
import callable from './callable'
import { IAccessibilityDefinition } from './accessibility/interfaces'
import { DefaultBehavior } from './accessibility'

export interface IRenderResultConfig<P> {
  ElementType: React.ReactType<P>
  rest: { [key: string]: any }
  classes: { [key: string]: string }
  accessibility: IAccessibilityDefinition
}

export type RenderComponentCallback<P> = (config: IRenderResultConfig<P>) => any

export interface IRenderConfig {
  className?: string
  defaultProps?: { [key: string]: any }
  displayName?: string
  handledProps: string[]
  props: { [key: string]: any }
  state: { [key: string]: any }
  styles?: { [key: string]: Function }
  variables?: (siteVariables: object) => object
}

const getAccessibility = <P extends {}>(props, state) => {
  const { accessibility: customAccessibility, defaultAccessibility } = props
  return callable(customAccessibility || defaultAccessibility || DefaultBehavior)({
    ...props,
    ...state,
  })
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
    styles,
    state,
    variables,
  } = config

  return (
    <FelaTheme
      render={theme => {
        const { siteVariables = {}, componentVariables = {}, renderer } = theme

        const ElementType = getElementType({ defaultProps }, props)
        const rest = getUnhandledProps({ handledProps }, props)
        const variablesFromFile = callable(variables)(siteVariables)
        const variablesFromTheme = callable(componentVariables[displayName])(siteVariables)
        const variablesFromProp = callable(props.variables)(siteVariables)

        const mergedVariables = () =>
          Object.assign({}, variablesFromFile, variablesFromTheme, variablesFromProp)

        const classes = getClasses(renderer, props, styles, mergedVariables, theme)
        classes.root = cx(className, classes.root, props.className)

        const accessibility = getAccessibility(props, state)

        const config: IRenderResultConfig<P> = { ElementType, rest, classes, accessibility }

        return render(config)
      }}
    />
  )
}

export default renderComponent
