import * as React from 'react'
import { FelaTheme } from 'react-fela'
import { ThemePrepared, ICSSInJSStyle, StyledGenericApi, ApplyStyledConfig } from '../themes/types'
import getClasses from './getClasses'
import { getColors } from './colorUtils'
import callable from './callable'

type ResultFunc<TProps, TResult> = (props: TProps) => TResult

type GetResultFunc<TResult, TProps = {}> = (
  theme: ThemePrepared,
  componentName: string,
  slotName: string,
) => ResultFunc<TProps, TResult>

type GetPropValue<TPropValue> = (propName: string) => TPropValue

const createProxy = function<TPropValue>(
  // this 'prototype' is necessary for IE11 polyfill support: https://github.com/GoogleChrome/proxy-polyfill
  prototype: any,
  getPropValue: GetPropValue<TPropValue>,
) {
  return new Proxy(prototype, { get: (_target, name) => getPropValue(String(name)) })
}

const applyApi = function<TResult>(
  theme: ThemePrepared,
  getFunc: GetResultFunc<TResult>,
): StyledGenericApi<TResult> {
  return createProxy(Object.assign({}, theme.componentStyles), componentName =>
    createProxy(Object.assign({}, theme.componentStyles[componentName]), slotName =>
      getFunc(theme, componentName, slotName),
    ),
  )
}

const getSlotStylesFunc = function<TProps = {}>(
  theme: ThemePrepared,
  componentName: string,
  slotName: string,
): (props: TProps) => ICSSInJSStyle {
  const variables = callable(theme.componentVariables[componentName])(theme.siteVariables)
  const styles = (theme.componentStyles || {})[componentName]

  return (props: TProps) => {
    if (!styles) {
      return {}
    }

    const colors = getColors({
      theme,
      componentVariables: variables,
      props: props || {},
    })

    return styles[slotName]({
      props: (props || {}) as any,
      variables,
      theme,
      colors,
      styles: applyApi(theme, getSlotStylesFunc),
    })
  }
}

const getSlotClassesFunc = function<TProps = {}>(
  theme: ThemePrepared,
  componentName: string,
  slotName: string,
): (props: TProps) => string {
  return (props: TProps) => {
    const slotStyles = getSlotStylesFunc(theme, componentName, slotName)(props)
    const variables = callable(theme.componentVariables[componentName])(theme.siteVariables)

    const colors = getColors({
      theme,
      componentVariables: variables,
      props: props || {},
    })

    return getClasses(theme.renderer, { root: slotStyles }, {
      variables,
      props,
      styles: applyApi(theme, getSlotStylesFunc),
      theme,
      colors,
    } as any).root
  }
}

export const applyStylesApi = (theme: ThemePrepared) => applyApi(theme, getSlotStylesFunc)
export const applyClassesApi = (theme: ThemePrepared) => applyApi(theme, getSlotClassesFunc)

const styled = (render: (config: ApplyStyledConfig) => React.ReactNode) => {
  return (
    <FelaTheme>
      {(theme: ThemePrepared) =>
        render({
          siteVariables: theme ? theme.siteVariables : {},
          styles: theme ? applyStylesApi(theme) : {},
          classes: theme ? applyClassesApi(theme) : {},
        })
      }
    </FelaTheme>
  )
}

export default styled
