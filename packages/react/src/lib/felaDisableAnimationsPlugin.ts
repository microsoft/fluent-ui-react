import * as _ from 'lodash'

/**
 * Fela plugin for disabling animations. The animations are disabled or not based on the
 * props' disableAnimations param. If the value of the prop is true, all animation related
 * styles are removed.
 *
 * Caution! Infinite recursion is possible in case if style object has links to self in the props
 * tree.
 */
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
