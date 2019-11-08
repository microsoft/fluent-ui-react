import { ComponentSlotClasses, ComponentSlotStylesPrepared, ICSSInJSStyle } from '../themes/types'
import { isEnabled as isDebugEnabled } from './debug/debugEnabled'

// Both resolvedStyles and classes are objects of getters with lazy evaluation
const resolveStylesAndClasses = (
  mergedStyles: ComponentSlotStylesPrepared,
  styleParam,
  renderStyles,
  renderStylesParam,
): {
  resolvedStyles: ICSSInJSStyle
  resolvedStylesDebug: { [key: string]: { styles: Object }[] }
  classes: ComponentSlotClasses
} => {
  const resolvedStyles = {}
  const resolvedStylesDebug = {}
  const classes = {}

  const computedStyles = []
  const cachedStyles = []
  const computedClasses = []
  const cachedClasses = []

  Object.keys(mergedStyles).forEach(slotName => {
    // resolve/render slot styles once and cache
    const cacheKey = `${slotName}__return`

    Object.defineProperty(resolvedStyles, slotName, {
      enumerable: false,
      configurable: false,
      set(val) {
        resolvedStyles[cacheKey] = val
        return true
      },
      get() {
        if (resolvedStyles[cacheKey]) {
          cachedStyles.push(slotName)
          return resolvedStyles[cacheKey]
        }

        // resolve/render slot styles once and cache
        resolvedStyles[cacheKey] = mergedStyles[slotName](styleParam)

        if (process.env.NODE_ENV !== 'production' && isDebugEnabled) {
          resolvedStylesDebug[slotName] = resolvedStyles[slotName]['_debug']
          delete resolvedStyles[slotName]['_debug']
        }

        computedStyles.push(slotName)
        return resolvedStyles[cacheKey]
      },
    })

    Object.defineProperty(classes, slotName, {
      enumerable: false,
      configurable: false,
      set(val) {
        classes[cacheKey] = val
        return true
      },
      get() {
        if (classes[cacheKey]) {
          cachedClasses.push(slotName)
          return classes[cacheKey]
        }

        // this resolves the getter magic
        const styleObj = resolvedStyles[slotName]

        if (renderStyles && styleObj) {
          computedClasses.push(slotName)
          classes[cacheKey] = renderStyles(() => styleObj, renderStylesParam)
        }

        return classes[cacheKey]
      },
    })
  })

  return {
    resolvedStyles,
    resolvedStylesDebug,
    classes,
  }
}

export default resolveStylesAndClasses
