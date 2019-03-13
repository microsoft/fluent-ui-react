import * as React from 'react'

import { EventTypes } from '../types'
import { UseListenerHookOptions } from './types'

const useEventListener = <N extends Node, T extends EventTypes>(
  options: UseListenerHookOptions<N, T>,
): void => {
  const { listener, targetRef, type } = options
  const handler = React.useCallback((event: DocumentEventMap[T]) => {
    return listener(event)
  }, [])

  React.useEffect(
    () => {
      targetRef.current.addEventListener(type, handler)
      return () => targetRef.current.removeEventListener(type, handler)
    },
    [type],
  )
}

export default useEventListener
