import {
  ComponentSlotStylesPrepared,
  isDebugEnabled,
  ICSSInJSStyle,
  ComponentStyleFunctionParam,
  ComponentSlotStylesResolved,
} from '@fluentui/styles'
import { ComponentSlotClasses } from '../styles/types'

export type ResolveStylesResult = {
  resolvedStyles: ComponentSlotStylesResolved
  resolvedStylesDebug: Record<string, { styles: Object }[]>
  classes: ComponentSlotClasses
}

// Both resolvedStyles and classes are objects of getters with lazy evaluation
const resolveStylesAndClasses = (
  mergedStyles: ComponentSlotStylesPrepared,
  styleParam: ComponentStyleFunctionParam,
  renderStyles: (styles: ICSSInJSStyle) => string,
): ResolveStylesResult => {
  const resolvedStyles: Record<string, ICSSInJSStyle> = {}
  const resolvedStylesDebug: Record<string, { styles: Object }[]> = {}
  const classes: Record<string, string> = {}

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

    const className = slotName === 'root' ? '__root' : slotName
    const cacheClassKey = `${className}__return`

    Object.defineProperty(classes, className, {
      enumerable: false,
      configurable: false,
      set(val) {
        classes[cacheClassKey] = val
        return true
      },
      get() {
        if (classes[cacheClassKey]) {
          return classes[cacheClassKey]
        }

        // this resolves the getter magic
        const styleObj = resolvedStyles[slotName]

        if (renderStyles && styleObj) {
          classes[cacheClassKey] = renderStyles(styleObj)
        }

        return classes[cacheClassKey]
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
