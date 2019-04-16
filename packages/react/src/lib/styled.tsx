import * as React from 'react'
import { FelaTheme } from 'react-fela'
import { ThemePrepared, ComponentSlotStylesPrepared } from '../themes/types'
import getClasses from './getClasses'

type ApplyThemeRenderConfig = {
  siteVariables: any
  styles: any
  getClasses: (styles: any) => string
}

const normalizeComponentStyles = function<TProps = any, TVars = any>(
  styles: ComponentSlotStylesPrepared<TProps, TVars>,
  variables: TVars,
  theme: ThemePrepared,
  assembledStyles: any,
) {
  const root = (props: TProps) =>
    styles['root']({
      props,
      variables,
      theme,
      colors: null,
      styles: assembledStyles,
    })

  Object.keys(styles).forEach(slotName => {
    root[slotName] = (props: TProps) =>
      styles[slotName]({
        props,
        variables,
        theme,
        colors: null,
        styles: assembledStyles,
      })
  })

  return root
}

const callable = arg => (typeof arg === 'function' ? arg : () => arg)

export const normalizeStyles = (theme: ThemePrepared) => {
  const allComponentStyles = theme.componentStyles || {}

  const result = Object.keys(allComponentStyles).reduce((acc, componentName) => {
    const componentStyles = allComponentStyles[componentName]
    return {
      ...acc,
      [componentName]: normalizeComponentStyles(
        componentStyles,
        callable(theme.componentVariables[componentName])(theme.siteVariables),
        theme,
        result,
      ),
    }
  }, {})
  return result
}

const styled = (render: (config: ApplyThemeRenderConfig) => React.ReactNode) => {
  return (
    <FelaTheme>
      {(theme: ThemePrepared) =>
        render({
          siteVariables: theme ? theme.siteVariables : {},
          styles: theme ? normalizeStyles(theme) : {},
          getClasses: theme
            ? styles => getClasses(theme.renderer, { root: styles }, {} as any).root
            : () => '',
        })
      }
    </FelaTheme>
  )
}

export default styled
