import * as _ from 'lodash'
import * as expand from 'css-shorthand-expand'

export default () => {
  const expandCssShorthands = styles => {
    return _.keys(styles).reduce((acc, cssPropertyName) => {
      const cssPropertyValue = styles[cssPropertyName]

      if (typeof cssPropertyValue === 'object') {
        return { ...acc, [cssPropertyName]: expandCssShorthands(cssPropertyValue) }
      }

      const expandedProps = expand(_.kebabCase(cssPropertyName), String(cssPropertyValue))
      if (expandedProps) {
        return { ...acc, ...transformKebabCaseKeysToCamelCase(expandedProps) }
      }

      return { ...acc, [cssPropertyName]: cssPropertyValue }
    }, {})
  }

  return expandCssShorthands
}

const transformKebabCaseKeysToCamelCase = obj => {
  return _.mapKeys(obj, (value, key) => {
    return _.camelCase(key)
  })
}
