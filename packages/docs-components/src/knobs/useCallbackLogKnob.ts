import * as React from 'react'
import { LogContext } from './KnobContexts'

const defaultFormatter = (name: string) => `${new Date().toLocaleTimeString()}: ${name}`

const useCallbackLogKnob = <T = (...args: any[]) => any>(
  name: string,
  callback?: T,
  formatter: Function = defaultFormatter,
): [T] => {
  const { append } = React.useContext(LogContext)

  const proxy = React.useCallback<any>(
    (...a) => {
      append(formatter(name, ...a))
      return (callback as any)(...a)
    },
    [append, callback, name, formatter],
  )

  return [proxy as T]
}

export default useCallbackLogKnob
