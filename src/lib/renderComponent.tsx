import _ from 'lodash'
import cx from 'classnames'
import { combineRules } from 'fela'
import React from 'react'
import { FelaTheme } from 'react-fela'
import getElementType from './getElementType'
import getUnhandledProps from './getUnhandledProps'
import callable from './callable'
import {
  ComponentStyleFunctionArg,
  ComponentVariables,
  ComponentVariablesObject,
  IComponentStyleClasses,
  IComponentStyles,
  IRenderer,
  ISiteVariables,
} from '../../types/theme'
import { toCompactArray } from './index'

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

const resolveComponentVariables = (
  componentVariables: ComponentVariables[],
  siteVariables: ISiteVariables,
): ComponentVariablesObject => {
  return toCompactArray(componentVariables).reduce((acc, next) => {
    return { ...acc, ...callable(next)(siteVariables) }
  }, {})
}

const renderComponentStyles = (
  renderer: IRenderer,
  componentStyles: IComponentStyles[],
  styleArg: ComponentStyleFunctionArg,
): IComponentStyleClasses => {
  const componentParts: string[] = componentStyles.reduce((acc, next) => {
    return next ? _.union(acc, _.keys(next)) : acc
  }, [])

  return componentParts.reduce((classes, partName) => {
    const styleFunctionsForPart = componentStyles.reduce((stylesForPart, nextStyle) => {
      if (nextStyle[partName]) stylesForPart.push(callable(nextStyle[partName]))

      return stylesForPart
    }, [])

    const combinedFunctions = combineRules(...styleFunctionsForPart)

    classes[partName] = renderer.renderRule(combinedFunctions, styleArg)

    return classes
  }, {})
}

const renderComponent = <P extends {}>(
  config: IRenderConfig,
  render: RenderComponentCallback<P>,
): React.ReactNode => {
  const { className, defaultProps, displayName, handledProps, props } = config

  return (
    <FelaTheme
      render={theme => {
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
