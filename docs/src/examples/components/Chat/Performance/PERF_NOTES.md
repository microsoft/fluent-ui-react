## MacOS Catalina Investigations

no plugins:             439, 448, 442, 445, 450, 474, 500, 609
no expand:                                                            664, 668, 672, 691, 693, 710
skip unused slot styles:                                                                                 763, 764, 765, 772, 776, 779, 782, 799
after restart:                                                                                                                                             834, 850, 863, 868, 877, 884, 888
before restart:                                                                                                                                                                            891, 895, 909, 926, 926, 928, 941, 955

### Optimize: Replace renderComponent get classes loop with lazy styles/classes

Now evaluation of classes and styles is deferred until accessed.
Prevents unnecessary computation and writing of styles/classes.

**NOTE:**
Components often access styles.foo when passing to factories.
This triggers evaluation even though the shorthand factory value may not result in an element.
Components had to be refactored from `Button.create(button, { styles: styles.button })` to `button && Button.create(...)`
This could be done automatically if the factory `defaultProps` (or entire options) were lazily evaluated as an arrow fn.

```typescript jsx
  Object.keys(mergedStyles).forEach(slotName => {
    // resolve/render slot styles once and cache
    const cacheKey = slotName + '__return'

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

        // fela throws on returning undefined, always return object
        if (renderer && styleObj) {
          classes[cacheKey] = renderer.renderRule(() => styleObj, felaParam)
        }

        return classes[cacheKey]
      },
    })
  })
```

### Optimize: MenuItem comment out unused slot styles in style func 

Saved about 20-25% time by only processing/rendering styles we actually use.

                             msAvg/Weight
with all styles:             2/34    2/35    2/34    2/34    2/35
skip unused styles:        1.6/29  1.6/30  1.5/29  1.5/28  1.6/29
diff:                       .4/5    .4/5    .5/5    .5/6    .4/6
with renderComponent hack: 1.6/32  1.5/31  1.6/31  1.6/33  1.6/32  1.6/32

### ChatWithPopover.perf

|             |  MIN  |  AVG  |  MAX  |
|-------------|-------|-------|-------|
| First load: | 530ms | 540ms | 600ms |
| Hot reload: | 302ms | 310ms | 385ms |

#### Investigate: Do not unnecessarily compute styles for slots

We currently process all slot styles because we don't know which slots will be used.
Example, MenuItem computes styles for:
  - wrapper
  - root
  - content 
  - icon
  - menu
  - indicator

...whether or not the menu item needs to render these slots.

Again, Checkbox always computes both `checkbox` and `toggle` slot styles, but these are mutually exclusive. 

#### Optimize: Disable caching component variables in Provider

Note, Teams does not yet have this improvement so we're seeing here the values in Teams right now.

|             |  MIN  |  AVG  |  MAX  | AVG DIFF     |
|-------------|-------|-------|-------|--------------|
| First load: | 632ms | 667ms | 682ms | +127ms, +24% |
| Hot reload: | 400ms | 430ms | 456ms | +120ms, +28% |

#### Optimize: Skip unnecessary arguments / ops in renderComponent()

This was not worth documenting, no gains.

#### Optimize: Remove sanitize plugin

|             |  MIN  |  AVG  |  MAX  | AVG DIFF     |
|-------------|-------|-------|-------|--------------|
| First load: | 527ms | 531ms | 561ms | -9ms, -2%    |
| Hot reload: | xxxms | xxxms | xxxms | -xxms, -X%   |

#### Optimize: Skipping unnecessary merges in mergeComponentStyles

|             |  MIN  |  AVG  |  MAX  | AVG DIFF     |
|-------------|-------|-------|-------|--------------|
| First load: | 430ms | 450ms | 508ms | -90ms, -16%  |
| Hot reload: | 255ms | 265ms | 283ms | -45ms, -15%  |

```typescript jsx
/**
 * Merges a single component's styles (keyed by component part) with another component's styles.
 */
export const mergeComponentStyles__PROD = (
  ...sources: (ComponentSlotStylesInput | null | undefined)[]
): ComponentSlotStylesPrepared => {
  const initial: ComponentSlotStylesPrepared = {}

  return sources.reduce<ComponentSlotStylesPrepared>((partStylesPrepared, stylesByPart) => {
    _.forEach(stylesByPart, (partStyle, partName) => {
      // Break references to avoid an infinite loop.
      // We are replacing functions with a new ones that calls the originals.
      const originalTarget = partStylesPrepared[partName]
      const originalSource = partStyle

      // if there is no source, merging is a no-op
      if (
        typeof originalSource === 'undefined' ||
        originalSource === null ||
        // TODO can we not call two lodash methods in a super hot code path?
        (_.isPlainObject(originalSource) && _.isEmpty(originalSource))
      ) {
        return
      }

      // no target means source doesn't need to merge onto anything
      // just ensure source is callable (prepared format)
      if (typeof originalTarget === 'undefined') {
        partStylesPrepared[partName] = callable(originalSource)
        return
      }

      // We have both target and source, replace with merge fn
      partStylesPrepared[partName] = styleParam => {
        // originalTarget is always prepared, fn is guaranteed
        return _.merge(callable(originalTarget)(styleParam), callable(originalSource)(styleParam))
      }
    })

    return partStylesPrepared
  }, initial)
}
```

#### Optimize: Noop expand plugin, baseline

This 20% perf gain is completely achievable by:
    1. moving from run-time to compile-time transform
    1. replacing it with a throw and requiring styles to be written as expanded only
       - also increases portability/predictability of our styles
    1. provide functions for shorthand properties, such as padding('1px') => { ...expanded object form }

|             |  MIN  |  AVG  |  MAX  | AVG DIFF     |
|-------------|-------|-------|-------|--------------|
| First load: | 437ms | 440ms | 465ms | -100ms, -19% |
| Hot reload: | 242ms | 248ms | 252ms | -62ms, -20%  |

#### Optimize: Keep our expand plugin, skip actual expansion (what is plugin overhead itself)

Isolating perf checks here tells us what gain we can get in the plugin boilerplate itself.
Results show nothing can be done there, 99% of the time is in the expand() function used by the plugin.

|             |  MIN  |  AVG  |  MAX  | AVG DIFF     |
|-------------|-------|-------|-------|--------------|
| First load: | 425ms | 454ms | 479ms | -96ms, -18%  |
| Hot reload: | xxxms | xxxms | xxxms | xxxms, -x%   |

#### Optimize: Replace our expand() with expandProperty from fela `inline-style-expand-shorthand`

Note, the plugin doesn't operate on the properties in the styles for the perf example we're using...

|             |  MIN  |  AVG  |  MAX  | AVG DIFF     |
|-------------|-------|-------|-------|--------------|
| First load: | 482ms | 510ms | 520ms | -30ms, -6%   |
| Hot reload: | 288ms | 302ms | 356ms | -8ms, -3%    |



