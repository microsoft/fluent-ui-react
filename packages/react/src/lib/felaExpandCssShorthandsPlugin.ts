import * as _ from 'lodash'
import * as _expand from 'css-shorthand-expand'

// `css-shorthand-expand` is a CJS library, there are known issues with them:
// https://github.com/rollup/rollup/issues/1267#issuecomment-446681320
const expand = (_expand as any).default || _expand

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
