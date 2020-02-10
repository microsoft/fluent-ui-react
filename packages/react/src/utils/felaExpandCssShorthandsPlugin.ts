import { ICSSInJSStyle } from '@fluentui/styles'
import * as CSS from 'csstype'
import { expandProperty } from 'inline-style-expand-shorthand'

const handledCssProps: (keyof CSS.Properties)[] = [
  // 'font', Oops, is not supported by inline-style-expand-shorthand
  'padding',
  'margin',
  'border',
  'borderWidth',
  'borderStyle',
  'borderColor',
  'borderTop',
  'borderRight',
  'borderBottom',
  'borderLeft',
  'borderRadius',
  'background',
  'outline',
]

export default () => {
  const expandCssShorthands = (styles: ICSSInJSStyle) => {
    return Object.keys(styles).reduce(
      (acc: ICSSInJSStyle, cssPropertyName: keyof CSS.Properties) => {
        const cssPropertyValue = styles[cssPropertyName]

        if (typeof cssPropertyValue === 'object') {
          return { ...acc, [cssPropertyName]: expandCssShorthands(cssPropertyValue) }
        }

        if (handledCssProps.indexOf(cssPropertyName) !== -1) {
          const expandedProps = expandProperty(cssPropertyName, `${cssPropertyValue}`)

          if (expandedProps) {
            return { ...acc, ...expandedProps }
          }
        }

        return { ...acc, [cssPropertyName]: cssPropertyValue }
      },
      {},
    )
  }

  return expandCssShorthands
}
