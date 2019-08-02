import callable from './callable'

/**
 * Fela plugin for invoking keyframes with params. The keyframes, defined in the animationName prop,
 * are called with the params object, if defined in the animationName prop.
 *
 * Caution! Infinite recursion is possible in case if style object has links to self in the props
 * tree.
 */
export default () => {
  const invokeKeyframes = (styles: Object) => {
    if (typeof styles === 'string') {
      return styles
    }

    return Object.keys(styles).reduce((acc, cssPropertyName) => {
      const cssPropertyValue = styles[cssPropertyName]

      if (cssPropertyName === 'animationName' && typeof cssPropertyValue === 'object') {
        if (cssPropertyValue.keyframe) {
          styles[cssPropertyName] = callable(cssPropertyValue.keyframe)(
            cssPropertyValue.params || {},
          )
        }

        return {
          ...acc,
          [cssPropertyName]: styles[cssPropertyName],
        }
      }

      if (Array.isArray(cssPropertyValue)) {
        return {
          ...acc,
          [cssPropertyName]: cssPropertyValue.map(arrayElement => invokeKeyframes(arrayElement)),
        }
      }

      if (typeof cssPropertyValue === 'object') {
        return {
          ...acc,
          [cssPropertyName]: invokeKeyframes(cssPropertyValue),
        }
      }

      return { ...acc, [cssPropertyName]: styles[cssPropertyName] }
    }, {})
  }

  return invokeKeyframes
}
