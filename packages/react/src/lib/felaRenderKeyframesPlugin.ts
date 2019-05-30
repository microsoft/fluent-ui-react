import callable from './callable'

/**
 * Fela plugin for disabling animations. The animations are disabled or not based on the
 * props' disableAnimations param. If the value of the prop is true, all animation related
 * styles are removed.
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
