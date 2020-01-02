import { ComponentSlotClasses, ComponentSlotStylesPrepared, ICSSInJSStyle } from '../themes/types'
import { isEnabled as isDebugEnabled } from './debug/debugEnabled'
import * as _ from 'lodash'
import { worker } from './styleMapper' // eslint-disable-line import/no-mutable-exports

// Both resolvedStyles and classes are objects of getters with lazy evaluation
const resolveStylesAndClasses = (
  mergedStyles: ComponentSlotStylesPrepared,
  styleParam,
  renderStyles,
): {
  resolvedStyles: ICSSInJSStyle
  resolvedStylesDebug: { [key: string]: { styles: Object }[] }
  classes: ComponentSlotClasses
} => {
  const resolvedStyles = {}
  const resolvedStylesDebug = {}
  const classes = {}

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
          return resolvedStyles[cacheKey]
        }

        // resolve/render slot styles once and cache
        resolvedStyles[cacheKey] = mergedStyles[slotName](styleParam)

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
        const styleObj = resolvedStyles[slotName]

        if (renderStyles && styleObj) {
          classes[cacheKey] = renderStyles(styleObj)

          if (process.env.NODE_ENV !== 'production' && isDebugEnabled) {
            // resolvedStylesDebug[slotName].forEach(debug => {
            const debugClassName = _.uniqueId(`__debug_${slotName}_`)
            console.log(resolvedStyles[slotName], debugClassName)
            const debug = resolvedStyles[slotName].__debugMetadata
            // if (debug.meta) {
            if (debug) {
              worker.postMessage({
                id: 'add_mapped_class',
                className: debugClassName,
                stackInfo: debug.stackInfo,
                stackIndex: debug.stackIndex,
              })
            }

            classes[cacheKey] = `${classes[cacheKey]} ${debugClassName}`
            // })
          }
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
