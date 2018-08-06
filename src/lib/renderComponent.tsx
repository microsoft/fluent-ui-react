import * as cx from 'classnames'
import * as React from 'react'
import { FelaTheme } from 'react-fela'

import callable from './callable'
import felaRenderer from './felaRenderer'
import getElementType from './getElementType'
import getUnhandledProps from './getUnhandledProps'
import toCompactArray from './toCompactArray'
import { renderComponentStyles } from './themeUtils'

import {
  ComponentStyleFunctionParam,
  ComponentVariablesInput,
  ComponentVariablesObject,
  IComponentPartClasses,
  IComponentPartStylesInput,
  IProps,
  IThemeInput,
  IThemePrepared,
} from '../../types/theme'

export interface IRenderResultConfig<P> {
  ElementType: React.ReactType<P>
  classes: IComponentPartClasses
  rest: IProps
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
}

const renderComponent = <P extends {}>(
  config: IRenderConfig,
  render: RenderComponentCallback<P>,
): React.ReactNode => {
  const { className, defaultProps, displayName, handledProps, props } = config

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
        const variables: ComponentVariablesObject = {
          ...callable(componentVariables[displayName])(siteVariables),
          ...callable(props.variables)(siteVariables),
        }

        // Resolve styles using resolved variables, merge results, allow props.styles to override
        const stylesForComponent = toCompactArray(componentStyles[displayName], props.styles)

        const styleParam: ComponentStyleFunctionParam = {
          props,
          variables,
          siteVariables,
          rtl,
        }

        const classes: IComponentPartClasses = renderComponentStyles(
          renderer,
          stylesForComponent,
          styleParam,
        )
        classes.root = cx(className, classes.root, props.className)

        const config: IRenderResultConfig<P> = { ElementType, rest, classes }

        return render(config)
      }}
    />
  )
}

export default renderComponent
