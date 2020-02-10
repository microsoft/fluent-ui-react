import {
  ComponentSlotStylesInput,
  ComponentSlotStylesPrepared, ComponentSlotStylesResolved, ComponentStyleFunctionParam, ICSSInJSStyle, isDebugEnabled,
  mergeComponentStyles,
  PropsWithVarsAndStyles,
  ThemePrepared, withDebugId,
} from '@fluentui/styles'
import {
  ComponentDesignProp,
  ComponentSlotClasses,
  PrimitiveProps,
  RendererParam,
  RendererRenderRule,
} from '@fluentui/react-bindings'
import * as _ from 'lodash'

export type ResolveStylesResult = {
  resolvedStyles: ComponentSlotStylesResolved
  resolvedStylesDebug: Record<string, { styles: Object }[]>
  classes: ComponentSlotClasses
}

export type ResolveStylesInput = {
  theme: ThemePrepared
  displayName: string
  props: PropsWithVarsAndStyles & { design?: ComponentDesignProp }
  resolvedVariables: object
  rtl: boolean
  disableAnimations: boolean
  renderer: {
    renderRule: RendererRenderRule
  }
  cacheEnabled: boolean | undefined
  stylesProps: PrimitiveProps
  renderStyles?: (styles: ICSSInJSStyle) => string
}

// this weak map is used as cache for the classes
const classesCache = new WeakMap<ThemePrepared, Record<string, string>>()

// this weak map is used as cache for the styles
const stylesCache = new WeakMap<ThemePrepared, Record<string, ICSSInJSStyle>>()

/**
 * Both resolvedStyles and classes are objects of getters with lazy evaluation
 *
 * Additionally if the cacheEnabled option is provided, than the resolved styles
 * and classes are caching the results in WeakMaps. The key of the maps contains the following:
 * - theme
 * - displayName
 * - slot name
 * - styling props
 * - rtl mode
 * - disable animations mode
 */
const resolveStyles = ({
                         theme,
                         displayName,
                         props,
                         resolvedVariables,
                         rtl,
                         disableAnimations,
                         renderer,
                         cacheEnabled,
                         stylesProps,
                         renderStyles: renderStylesInput,
                       }: ResolveStylesInput): ResolveStylesResult => {
  // Merge theme styles with inline overrides if any
  let mergedStyles: ComponentSlotStylesPrepared = theme.componentStyles[displayName] || {
    root: () => ({}),
  }
  const hasInlineStylesOverrides = !_.isNil(props.design) || !_.isNil(props.styles)

  if (hasInlineStylesOverrides) {
    mergedStyles = mergeComponentStyles(
      mergedStyles,
      props.design && withDebugId({ root: props.design }, 'props.design'),
      props.styles &&
      withDebugId({ root: props.styles } as ComponentSlotStylesInput, 'props.styles'),
    )
  }

  const styleParam: ComponentStyleFunctionParam = {
    displayName,
    props,
    variables: resolvedVariables,
    theme,
    rtl,
    disableAnimations,
  }

  // Fela plugins rely on `direction` param in `theme` prop instead of RTL
  // Our API should be aligned with it
  // Heads Up! Keep in sync with Design.tsx render logic
  const direction = rtl ? 'rtl' : 'ltr'
  const felaParam: RendererParam = {
    theme: { direction },
    disableAnimations,
    displayName, // does not affect styles, only used by useEnhancedRenderer in docs
  }

  const renderStyles = renderStylesInput || ((style: ICSSInJSStyle) => renderer.renderRule(() => style, felaParam))

  const resolvedStyles: Record<string, ICSSInJSStyle> = {}
  const resolvedStylesDebug: Record<string, { styles: Object }[]> = {}
  const classes: Record<string, string> = {}

  if (cacheEnabled && theme) {
    if (!stylesCache.has(theme)) {
      stylesCache.set(theme, {})
    }
    if (!classesCache.has(theme)) {
      classesCache.set(theme, {})
    }
  }

  const componentCacheKey =
    cacheEnabled && displayName && stylesProps
      ? `${displayName}:${JSON.stringify(stylesProps)}${styleParam.rtl}${styleParam.disableAnimations}`
      : ''

  Object.keys(mergedStyles).forEach(slotName => {
    // resolve/render slot styles once and cache
    const lazyEvaluationKey = `${slotName}__return`
    const slotCacheKey = componentCacheKey + slotName

    Object.defineProperty(resolvedStyles, slotName, {
      enumerable: false,
      configurable: false,
      set(val: ICSSInJSStyle) {
        // Add to the cache if it's enabled
        if (cacheEnabled && theme) {
          stylesCache.set(theme, {
            ...stylesCache.get(theme),
            [slotCacheKey]: val,
          })
        }

        resolvedStyles[lazyEvaluationKey] = val
      },
      get(): ICSSInJSStyle {
        // If caching enabled and entry exists, get from cache, avoid lazy evaluation
        if (cacheEnabled && theme) {
          const stylesThemeCache = stylesCache.get(theme) || {}
          if (stylesThemeCache[slotCacheKey]) {
            return stylesThemeCache[slotCacheKey]
          }
        }

        if (resolvedStyles[lazyEvaluationKey]) {
          return resolvedStyles[lazyEvaluationKey]
        }

        // resolve/render slot styles once and cache
        resolvedStyles[lazyEvaluationKey] = mergedStyles[slotName](styleParam)

        if (cacheEnabled && theme) {
          stylesCache.set(theme, {
            ...stylesCache.get(theme),
            [slotCacheKey]: resolvedStyles[lazyEvaluationKey],
          })
        }

        if (process.env.NODE_ENV !== 'production' && isDebugEnabled) {
          resolvedStylesDebug[slotName] = resolvedStyles[slotName]['_debug']
          delete resolvedStyles[slotName]['_debug']
        }

        return resolvedStyles[lazyEvaluationKey]
      },
    })

    const className = slotName === 'root' ? '__root' : slotName
    const cacheClassKey = `${className}__return`

    Object.defineProperty(classes, className, {
      enumerable: false,
      configurable: false,
      set(val: string) {
        if (cacheEnabled && theme) {
          classesCache.set(theme, {
            ...classesCache.get(theme),
            [slotCacheKey]: val,
          })
        }

        classes[cacheClassKey] = val
      },
      get(): string {
        if (cacheEnabled && theme) {
          const classesThemeCache = classesCache.get(theme) || {}
          if (classesThemeCache[slotCacheKey]) {
            return classesThemeCache[slotCacheKey]
          }
        }

        if (classes[cacheClassKey]) {
          return classes[cacheClassKey]
        }

        // this resolves the getter magic
        const styleObj = resolvedStyles[slotName]

        if (renderStyles && styleObj) {
          classes[cacheClassKey] = renderStyles(styleObj)

          if (cacheEnabled && theme) {
            classesCache.set(theme, {
              ...classesCache.get(theme),
              [slotCacheKey]: classes[cacheClassKey],
            })
          }
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

export default resolveStyles
