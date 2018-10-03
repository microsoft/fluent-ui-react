import * as _ from 'lodash'
import * as expand from 'css-shorthand-expand'

export default () => {
  const expandCssShorthands = styles => {
    const processedStyles = {}

    Object.keys(styles).forEach(cssPropertyName => {
      const cssPropertyValue = styles[cssPropertyName]

      if (typeof cssPropertyValue === 'object') {
        processedStyles[cssPropertyName] = cssPropertyValue
        return
      }

      if (_.includes(shorthands, cssPropertyName)) {
        const expandedProps = expand(_.kebabCase(cssPropertyName), String(cssPropertyValue))
        Object.keys(expandedProps).forEach(key => {
          processedStyles[_.camelCase(key)] = expandedProps[key]
        })
      } else {
        processedStyles[cssPropertyName] = cssPropertyValue
      }
    })

    return processedStyles
  }

  return expandCssShorthands
}

const shorthands = [
  'font',
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
