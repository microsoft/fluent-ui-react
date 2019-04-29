import * as React from 'react'
import { FelaTheme } from 'react-fela'
import { ThemePrepared, ComponentSlotStylesPrepared, ICSSInJSStyle } from '../themes/types'
import getClasses from './getClasses'
import { getColors } from './renderComponent'
import callable from './callable'

type PerComponent<TValue> = Record<string, TValue>
type PerSlotFunc<TResult, TArg = any> = Record<string, (props: TArg) => TResult>

type ApplyThemeRenderConfig = {
  siteVariables: any
  styles: PerComponent<PerSlotFunc<ICSSInJSStyle>>
  classes: PerComponent<PerSlotFunc<string>>
}

const normalizeComponentStylesAndClasses = function<TProps = any, TVars = any>(
  styles: ComponentSlotStylesPrepared<TProps, TVars>,
  variables: TVars,
  theme: ThemePrepared,
  getAssembledStyles: () => any,
) {
  const resultStyles = {}

  Object.keys(styles).forEach(slotName => {
    resultStyles[slotName] = (props: TProps) => {
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
        styles: getAssembledStyles(),
      })
    }
  })

  const resultClasses = Object.keys(styles).reduce(
    (acc, slotName) => ({
      ...acc,
      [slotName]: (props: any) => {
        const colors = getColors({
          theme,
          componentVariables: variables,
          props: props || {},
        })

        return getClasses(theme.renderer, { root: styles[slotName] }, {
          variables,
          props,
          styles: getAssembledStyles(),
          theme,
          colors,
        } as any).root
      },
    }),
    {},
  )

  return {
    styles: resultStyles,
    classes: resultClasses,
  }
}

// export const normalizeAllStylesAndClasses = (theme: ThemePrepared) => {
//   const allComponentStyles = theme.componentStyles || {}

//   const styles = {}
//   const classes = {}

//   Object.keys(allComponentStyles).forEach(componentName => {
//     const componentStylesInput = allComponentStyles[componentName]

//     const {
//       styles: componentStyles,
//       classes: componentClasses,
//     } = normalizeComponentStylesAndClasses(
//       componentStylesInput,
//       callable(theme.componentVariables[componentName])(theme.siteVariables),
//       theme,
//       () => styles,
//     )

//     styles[componentName] = componentStyles
//     classes[componentName] = componentClasses
//   })

//   return { styles, classes }
// }

export const normalizeAllStylesAndClasses = (theme: ThemePrepared) => {
  const allComponentStyles = theme.componentStyles || {}

  const styles = {}
  const classes = {}

  Object.keys(allComponentStyles).forEach(componentName => {
    const componentStylesInput = allComponentStyles[componentName]

    const {
      styles: componentStyles,
      classes: componentClasses,
    } = normalizeComponentStylesAndClasses(
      componentStylesInput,
      callable(theme.componentVariables[componentName])(theme.siteVariables),
      theme,
      () => styles,
    )

    styles[componentName] = componentStyles
    classes[componentName] = componentClasses
  })

  return { styles, classes }
}

const styled = (render: (config: ApplyThemeRenderConfig) => React.ReactNode) => {
  return (
    <FelaTheme>
      {(theme: ThemePrepared) => {
        const { styles, classes } = theme
          ? normalizeAllStylesAndClasses(theme)
          : { styles: {}, classes: {} }

        return render({
          siteVariables: theme ? theme.siteVariables : {},
          styles,
          classes,
        })
      }}
    </FelaTheme>
  )
}

export default styled
