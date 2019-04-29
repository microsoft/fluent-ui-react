import * as React from 'react'
import { FelaTheme } from 'react-fela'
import { ThemePrepared, ICSSInJSStyle } from '../themes/types'
import getClasses from './getClasses'
import { getColors } from './renderComponent'
import callable from './callable'

type PerComponent<TValue> = Record<string, TValue>
type PerSlotFunc<TResult, TProps = {}> = Record<string, (props: TProps) => TResult>

type Api<TResult, TProps = {}> = PerComponent<PerSlotFunc<TResult, TProps>>

type ApplyStyledConfig = {
  siteVariables: any
  styles: PerComponent<PerSlotFunc<ICSSInJSStyle>>
  classes: PerComponent<PerSlotFunc<string>>
}

type GetPropValue<TPropValue> = (propName: string) => TPropValue
const createProxy = function<TPropValue>(getPropValue: GetPropValue<TPropValue>) {
  return new Proxy({}, { get: (_target, name) => getPropValue(String(name)) })
}

type ResultFunc<TProps, TResult> = (props: TProps) => TResult

type GetResultFunc<TResult, TProps = {}> = (
  theme: ThemePrepared,
  componentName: string,
  slotName: string,
) => ResultFunc<TProps, TResult>

const applyApi = function<TResult, TProps = any>(
  theme: ThemePrepared,
  getFunc: GetResultFunc<TResult, TProps>,
): Api<TResult, TProps> {
  return createProxy(componentName =>
    createProxy(slotName => getFunc(theme, componentName, slotName)),
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
      styles: applyApi(theme, getSlotClassesFunc),
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
      styles: applyApi(theme, getSlotClassesFunc),
      theme,
      colors,
    } as any).root
  }
}

export type StylesApi<TProps = {}> = Api<ICSSInJSStyle, TProps>
export type ClassesApi<TProps = {}> = Api<string, TProps>

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
