import { callable, ICSSInJSStyle } from '@fluentui/styles'

const isPlainObject = (object: any): object is Object =>
  Object.prototype.toString.call(object) === '[object Object]'

/**
 * Fela plugin for invoking keyframes with params. The keyframes, defined in the animationName prop,
 * are called with the params object, if defined in the animationName prop.
 *
 * Caution! Infinite recursion is possible in case if style object has links to self in the props
 * tree.
 */
export default () => {
  const invokeKeyframes = (styles: ICSSInJSStyle) => {
    Object.keys(styles).forEach((cssPropertyName: keyof ICSSInJSStyle) => {
      const cssPropertyValue = styles[cssPropertyName]

      if (isPlainObject(cssPropertyValue)) {
        if (cssPropertyName === 'animationName') {
          if (cssPropertyValue.keyframe) {
            styles[cssPropertyName] = callable(cssPropertyValue.keyframe)(
              cssPropertyValue.params || {},
            )
          }
        }

        invokeKeyframes(cssPropertyValue)
      }
    })

    return styles
  }

  return invokeKeyframes
}
