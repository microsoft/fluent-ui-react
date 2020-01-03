import * as React from 'react'

import { Context, ContextListener, ContextValue } from './types'
import { CONTEXT_SUBSCRIBE_PROPERTY, CONTEXT_VALUE_PROPERTY } from './utils'

const createProvider = <Value>(Original: React.Provider<ContextValue<Value>>) => {
  const Provider: React.FC<React.ProviderProps<Value>> = props => {
    const listeners = React.useRef<ContextListener<Value>[]>([])
    const value = React.useMemo<ContextValue<Value>>(() => ({} as any), [])

    // We call listeners in render intentionally. Listeners are not technically pure, but
    // otherwise we can't get benefits from concurrent mode.
    //
    // We make sure to work with double or more invocation of listeners.
    listeners.current.forEach(listener => listener(props.value))

    // Disables updates propogation for React Context as `value` is always shallow equal
    value[CONTEXT_SUBSCRIBE_PROPERTY] = React.useCallback((listener: ContextListener<Value>) => {
      listeners.current.push(listener)

      const unsubscribe = () => {
        const index = listeners.current.indexOf(listener)
        listeners.current.splice(index, 1)
      }

      return unsubscribe
    }, [])
    value[CONTEXT_VALUE_PROPERTY] = props.value

    return React.createElement(Original, { value }, props.children)
  }

  if (process.env.NODE_ENV !== 'production') {
    Provider.displayName = 'ContextSelector.Provider'
  }

  return Provider
}

export const createContext = <Value>(defaultValue: Value): Context<Value> => {
  const context = React.createContext<ContextValue<Value>>({
    get [CONTEXT_SUBSCRIBE_PROPERTY](): any {
      throw new Error(
        process.env.NODE_ENV === 'production'
          ? ''
          : `Please use <Provider /> component from "@fluentui/react-context-selector"`,
      )
    },
    [CONTEXT_VALUE_PROPERTY]: defaultValue,
  })
  context.Provider = createProvider<Value>(context.Provider) as any

  // We don't support Consumer API
  delete context.Consumer

  return context as any
}
