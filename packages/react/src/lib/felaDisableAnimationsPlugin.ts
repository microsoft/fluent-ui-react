import * as _ from 'lodash'

export default () => {
  const disableAnimations = (styles: Object, type?, renderer?, props?) => {
    if (props && props.disableAnimations && type && type === 'RULE') {
      return Object.keys(styles).reduce((acc, cssPropertyName) => {
        const cssPropertyValue = styles[cssPropertyName]

        if (typeof cssPropertyValue === 'object') {
          return {
            ...acc,
            [cssPropertyName]: disableAnimations(cssPropertyValue, type, renderer, props),
          }
        }

        if (_.startsWith(cssPropertyName, 'animation')) {
          return acc
        }
        return { ...acc, [cssPropertyName]: styles[cssPropertyName] }
      }, {})
    }
    return styles
  }

  return disableAnimations
}
