import * as React from 'react'
import { Context, ContextListener, ContextValue } from './types'

const createProvider = <Value>(Original: React.Provider<ContextValue<Value>>) => {
  const Provider: React.FC<React.ProviderProps<Value>> = props => {
    const listeners = React.useRef<ContextListener<Value>[]>([])
    const contextValue = React.useMemo<ContextValue<Value>>(() => ({} as any), [])

    // We call listeners in render intentionally. Listeners are not technically pure, but
    // otherwise we can't get benefits from concurrent mode.
    //
    // We make sure to work with double or more invocation of listeners.
    listeners.current.forEach(listener => listener(props.value))

    // Disables updates propogation for React Context as `value` is always shallow equal
    contextValue.subscribe = React.useCallback((listener: ContextListener<Value>) => {
      listeners.current.push(listener)

      const unsubscribe = () => {
        const index = listeners.current.indexOf(listener)
        listeners.current.splice(index, 1)
      }

      return unsubscribe
    }, [])
    contextValue.value = props.value

    return React.createElement(Original, { value: contextValue }, props.children)
  }

  /* istanbul ignore else */
  if (process.env.NODE_ENV !== 'production') {
    Provider.displayName = 'ContextSelector.Provider'
  }

  return Provider
}

type CreateContextOptions = {
  strict?: boolean
}

export const createContext = <Value>(
  defaultValue: Value,
  options: CreateContextOptions = {},
): Context<Value> => {
  const { strict = true } = options

  const context = React.createContext<ContextValue<Value>>({
    get subscribe() {
      if (strict) {
        /* istanbul ignore next */
        throw new Error(
          process.env.NODE_ENV === 'production'
            ? ''
            : `Please use <Provider /> component from "@fluentui/react-context-selector"`,
        )
      }

      /* istanbul ignore next */
      return () => () => {}
    },
    value: defaultValue,
  })
  context.Provider = createProvider<Value>(context.Provider) as any

  // We don't support Consumer API
  delete context.Consumer

  return context as any
}
