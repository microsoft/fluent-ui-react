import _ from 'lodash'
import cx from 'classnames'
import React from 'react'
import { FelaTheme } from 'react-fela'

import callable from './callable'
import getElementType from './getElementType'
import getUnhandledProps from './getUnhandledProps'
import toCompactArray from './toCompactArray'
import { renderComponentStyles } from './themeUtils'
import {
  ComponentStyleFunctionParam,
  ComponentVariablesInput,
  ComponentVariablesObject,
  IComponentPartStylesInput,
  IThemeInput,
  IThemePrepared,
} from '../../types/theme'

export interface IRenderResultConfig<P> {
  ElementType: React.ReactType<P>
  rest: { [key: string]: any }
  classes: { [key: string]: string }
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
      render={(theme: IThemeInput | IThemePrepared) => {
        const ElementType = getElementType({ defaultProps }, props)
        const rest = getUnhandledProps({ handledProps }, props)

        //
        // Resolve variables for this component, allow props.variables to override
        //
        const variables: ComponentVariablesObject = {
          ...callable(theme.componentVariables[displayName])(theme.siteVariables),
          ...callable(props.variables)(theme.siteVariables),
        }

        //
        // Resolve styles using resolved variables, merge results, allow props.styles to override
        //
        const stylesForComponent = toCompactArray(theme.componentStyles)
          .map(styles => styles[displayName])
          .concat(props.styles)
          .filter(Boolean)

        const styleParam: ComponentStyleFunctionParam = {
          props,
          variables,
          siteVariables: theme.siteVariables,
          rtl: theme.rtl,
        }

        const classes: ComponentVariablesObject = renderComponentStyles(
          theme.renderer,
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
