import { ComponentSlotClasses, ICSSInJSStyle } from '../themes/types'
import { isEnabled as isDebugEnabled } from './debug/debugEnabled'
import * as _ from 'lodash'
import callable from '@fluentui/react-bindings/src/utils/callable'

// Both resolvedStyles and classes are objects of getters with lazy evaluation
const resolveStylesAndClasses = (
  styles,
  styleParam,
  renderStyles,
  resolvedStylesCache,
  mergeRootWith,
): {
  resolvedStyles: ICSSInJSStyle
  mergedStyles: ICSSInJSStyle
  resolvedStylesDebug: { [key: string]: { styles: Object }[] }
  classes: ComponentSlotClasses
} => {
  const resolvedStyles = {}
  const resolvedStylesDebug = {}
  let mergedStyles = null
  const classes = {}

  resolvedStyles['root__return'] = resolvedStylesCache
    ? resolvedStylesCache['root']
    : callable(styles.root)(styleParam)

  if (mergeRootWith.length > 0) {
    mergedStyles = mergeRootWith.reduce((partStylesPrepared, stylesByPart) => {
      if (stylesByPart && stylesByPart['root']) {
        return _.merge(partStylesPrepared, callable(stylesByPart['root'])(styleParam))
      }
      return partStylesPrepared
    }, resolvedStyles['root__return']) // this resolves the getter magic
  }

  Object.keys(styles).forEach(slotName => {
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
          return resolvedStyles[cacheKey]
        }

        resolvedStyles[cacheKey] =
          resolvedStylesCache && resolvedStylesCache[slotName]
            ? resolvedStylesCache[slotName]
            : styles[slotName](styleParam)
        // TODO: this may need to be removed
        if (process.env.NODE_ENV !== 'production' && isDebugEnabled) {
          resolvedStylesDebug[slotName] = resolvedStyles[slotName]['_debug']
          delete resolvedStyles[slotName]['_debug']
        }

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
          return classes[cacheKey]
        }

        // this resolves the getter magic
        const styleObj =
          slotName === 'root' && mergedStyles ? mergedStyles : resolvedStyles[slotName]

        if (renderStyles && styleObj) {
          classes[cacheKey] = renderStyles(styleObj)
        }

        return classes[cacheKey]
      },
    })
  })

  return {
    resolvedStyles,
    mergedStyles,
    resolvedStylesDebug,
    classes,
  }
}

export default resolveStylesAndClasses
