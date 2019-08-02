const getFirstRefHookValue = fiber => {
  const stateHooks = fiber.memoizedState
  const refHooks = stateHooks && stateHooks.memoizedState

  return refHooks && refHooks.current
}

const getFunctionComponentDebugData = component => {
  const fiberAccessorPropName = Object.keys(component).filter(key =>
    key.startsWith('__reactInternalInstance'),
  )[0]

  if (!fiberAccessorPropName) {
    throw new Error('Debug info was not found: fiber accessor prop is not detected.')
  }

  const domElementFiber = component[fiberAccessorPropName]
  if (!domElementFiber) {
    throw new Error(
      'Debug info was not found: fiber element is not defined. Ensure that Stardust component is selected.',
    )
  }

  return getFirstRefHookValue(domElementFiber._debugOwner)
}

const debugApi = (inputComponent?) => {
  const component = inputComponent || (window as any).$r

  if (!component) {
    throw new Error('Debug info was not found: component is not provided as an input.')
  }

  const debug = component.renderComponent
    ? component.stardustDebug
    : getFunctionComponentDebugData(component)

  if (debug === null) {
    console.warn(
      'There is no debug data registered for Stardust component. Ensure that debug data collection is enabled.',
    )
    return undefined
  }

  if (!debug) {
    console.error(
      'No debug data available. Ensure that you have selected Stardust component to debug.',
    )
    return undefined
  }

  return debug.resolve()
}

debugApi.whosProp = (...args) => debugApi().whosProp(...args)
debugApi.whosPropContains = (...args) => debugApi().whosPropContains(...args)
debugApi.whosValue = (...args) => debugApi().whosValue(...args)
debugApi.whosValueContains = (...args) => debugApi().whosValueContains(...args)

const isDebugEnabled = () => {
  let enabled = false
  try {
    const isProduction = process.env.NODE_ENV === 'production'
    const isEnabledBrowserOverride = !!window.localStorage.stardustDebug

    if (isEnabledBrowserOverride) {
      console.warn(
        [
          '@stardust-ui/react:',
          `Debug data collection is overriden to be enabled.`,
          'To remove this override paste `delete window.localStorage.stardustDebug` to your browser console and reload the page.',
        ].join(' '),
      )
    }

    enabled = isEnabledBrowserOverride || !isProduction
  } catch {}

  if (!enabled) {
    console.warn(
      [
        '@stardust-ui/react:',
        'Debug data collection is disabled.',
        'To enable it, paste `window.localStorage.stardustDebug = true` to your browser console and reload the page.',
      ].join(' '),
    )
  }

  return enabled
}

export const isEnabled = isDebugEnabled()

export default debugApi
