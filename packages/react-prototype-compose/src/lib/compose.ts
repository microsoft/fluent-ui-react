import * as React from 'react'
import { useTheme } from './theme-context'
import { Theme } from './theme'
import { felaRenderer } from '@stardust-ui/react'

const _getClasses = (theme: Theme, name: string, optionsSet: any[]) => {
  let tokens: any = {}
  optionsSet.forEach((options: any) => {
    if (options && options.tokens && typeof options.tokens === 'function') {
      tokens = { ...tokens, ...options.tokens(theme) }
    }
  })

  let styles: any = {}
  optionsSet.forEach((options: any) => {
    if (options && options.styles && typeof options.styles === 'function') {
      styles = { ...styles, ...options.styles(theme, tokens) }
    }
  })

  const classes = {}
  Object.keys(styles).forEach(k => {
    classes[k] = felaRenderer.renderRule(() => styles[k], { theme: { direction: 'ltr' } })
  })
  return classes
}

/**
 * Composed allows you to create composed components, which
 * have configurable, themable state, view, and slots.
 *
 * Composed components can be recomposed.
 */
export const compose = <TProps = {}>(baseComponent?: React.SFC, options?: any) => {
  const classNamesCache = new WeakMap()
  let optionsSet = [options]
  if (baseComponent && (baseComponent as any).__optionsSet) {
    optionsSet = [...(baseComponent as any).__optionsSet, options]
  }

  let mergedOptions = {}
  optionsSet.forEach(o => {
    mergedOptions = { ...mergedOptions, ...o }
  })

  const Component = (userProps: TProps) => {
    const theme: Theme = (useTheme() || (mergedOptions as any).defaultTheme)!
    if (!theme) {
      console.warn('No theme specified, behavior undefined.') // eslint-disable-line no-console
    }

    const { slots, state, slotProps, view, name } = mergedOptions as any
    const resolvedSlotProps = _getSlotProps(
      userProps,
      slots,
      state,
      slotProps,
      theme,
      classNamesCache,
      optionsSet,
      name,
    )

    return view({
      userProps,
      Slots: slots,
      slotProps: resolvedSlotProps,
      theme,
    })
  }

  for (const slotName in options.slots) {
    ;(Component as any)[slotName] = options.slots[slotName]
  }

  Component.__optionsSet = optionsSet
  Component.displayName = options.name || 'Composed Component'

  return Component
}

function _getSlotProps(
  userProps: any,
  slots: any,
  state: any,
  slotProps: any,
  theme: Theme,
  classNamesCache: WeakMap<any, any>,
  optionsSet: any[],
  name: string,
) {
  const resolvedState = state ? state(userProps, slots) : {}

  const resolvedSlotProps = slotProps
    ? typeof slotProps === 'function'
      ? slotProps(userProps, resolvedState)
      : slotProps
    : {}
  if (theme) {
    if (!classNamesCache.has(theme)) {
      classNamesCache.set(theme, _getClasses(theme, name, optionsSet))
    }
    const classNames = classNamesCache.get(theme)
    Object.keys(classNames).forEach(k => {
      const className = classNames[k]
      if (!resolvedSlotProps[k]) {
        resolvedSlotProps[k] = { className: '' }
      } else if (!resolvedSlotProps[k].className) {
        resolvedSlotProps[k].className = []
      }
      resolvedSlotProps[k].className = `${resolvedSlotProps[k].className} ${className}`
    })
  }
  return resolvedSlotProps
}
