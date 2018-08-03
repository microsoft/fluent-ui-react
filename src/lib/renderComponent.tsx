import cx from 'classnames'
import React from 'react'
import { FelaTheme } from 'react-fela'

import getElementType from './getElementType'
import getUnhandledProps from './getUnhandledProps'
import toCompactArray from './toCompactArray'
import { renderComponentStyles, resolveComponentVariables } from './themeUtils'

import {
  ComponentVariables,
  ComponentVariablesObject,
  IComponentStyles,
  IMergedThemes,
  ITheme,
} from '../../types/theme'

export interface IRenderResultConfig<P> {
  ElementType: React.ReactType<P>
  rest: { [key: string]: any }
  classes: { [key: string]: string }
}

export type RenderComponentCallback<P> = (config: IRenderResultConfig<P>) => any

type IRenderConfigProps = {
  [key: string]: any
  variables?: ComponentVariables
  styles?: IComponentStyles
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
      render={(theme: ITheme | IMergedThemes) => {
        const ElementType = getElementType({ defaultProps }, props)
        const rest = getUnhandledProps({ handledProps }, props)

        //
        // Resolve variables using final siteVariables, allow props.variables to override
        //
        const variablesForComponent = toCompactArray(theme.componentVariables)
          .map(variables => variables[displayName])
          .concat(props.variables)
          .filter(Boolean)

        const variables: ComponentVariablesObject = resolveComponentVariables(
          variablesForComponent,
          theme.siteVariables,
        )

        //
        // Resolve styles using resolved variables, merge results, allow props.styles to override
        //
        const stylesForComponent = toCompactArray(theme.componentStyles)
          .map(styles => styles[displayName])
          .concat(props.styles)
          .filter(Boolean)

        const styleArg = {
          props,
          variables,
          siteVariables: theme.siteVariables,
          rtl: theme.rtl,
        }

        const classes: ComponentVariablesObject = renderComponentStyles(
          theme.renderer,
          stylesForComponent,
          styleArg,
        )
        classes.root = cx(className, classes.root, props.className)

        const config: IRenderResultConfig<P> = { ElementType, rest, classes }

        return render(config)
      }}
    />
  )
}

export default renderComponent
