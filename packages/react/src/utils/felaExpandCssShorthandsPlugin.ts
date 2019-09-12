import { expandProperty } from 'inline-style-expand-shorthand'
import * as CSS from 'csstype'

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
  const expandCssShorthands = (styles: Object) => {
    return Object.keys(styles).reduce((acc, cssPropertyName) => {
      const cssPropertyValue = styles[cssPropertyName]

      if (typeof cssPropertyValue === 'object') {
        return { ...acc, [cssPropertyName]: expandCssShorthands(cssPropertyValue) }
      }

      if (handledCssProps[cssPropertyName]) {
        const expandedProps = expandProperty(cssPropertyName, `${cssPropertyValue}`)

        if (expandedProps) {
          return { ...acc, expandedProps }
        }
      }

      return { ...acc, [cssPropertyName]: cssPropertyValue }
    }, {})
  }

  return expandCssShorthands
}
