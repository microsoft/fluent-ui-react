import callable from './callable'

/**
 * Fela plugin for rendering keyframes. The keyframes, defined in the animationName prop, are rendered
 * with the params object, if defined in the animationName prop.
 *
 * Caution! Infinite recursion is possible in case if style object has links to self in the props
 * tree.
 */
export default () => {
  const renderKeyframes = (styles: Object, type?, renderer?, props?) => {
    return Object.keys(styles).reduce((acc, cssPropertyName) => {
      const cssPropertyValue = styles[cssPropertyName]
      if (cssPropertyName === 'animationName' && typeof cssPropertyValue === 'object') {
        if (Array.isArray(cssPropertyValue)) {
          styles[cssPropertyName] = cssPropertyValue
            .map(animation => {
              if (animation.keyframe) {
                return renderer.renderKeyframe(callable(animation.keyframe), animation.params || {})
              }
              return renderer.renderKeyframe(() => animation)
            }, props)
            .join(',')
        } else if (cssPropertyValue.keyframe) {
          styles[cssPropertyName] = renderer.renderKeyframe(
            callable(cssPropertyValue.keyframe),
            cssPropertyValue.params || {},
          )
        } else {
          styles[cssPropertyName] = renderer.renderKeyframe(() => cssPropertyValue)
        }

        return {
          ...acc,
          [cssPropertyName]: styles[cssPropertyName],
        }
      }
      if (typeof cssPropertyValue === 'object') {
        return {
          ...acc,
          [cssPropertyName]: renderKeyframes(cssPropertyValue, type, renderer, props),
        }
      }
      return { ...acc, [cssPropertyName]: styles[cssPropertyName] }
    }, {})
  }

  return renderKeyframes
}
