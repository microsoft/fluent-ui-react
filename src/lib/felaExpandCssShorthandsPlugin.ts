import * as _ from 'lodash'
import * as expand from 'css-shorthand-expand'

export default () => {
  const expandCssShorthands = styles => {
    return _.keys(styles).reduce((acc, cssPropertyName) => {
      const cssPropertyValue = styles[cssPropertyName]
      const expandedProps = expand(_.kebabCase(cssPropertyName), String(cssPropertyValue))
      if (expandedProps) {
        return { ...acc, ...expandedProps }
      }
      return { ...acc, [cssPropertyName]: cssPropertyValue }
    }, {})
  }

  return expandCssShorthands
}
