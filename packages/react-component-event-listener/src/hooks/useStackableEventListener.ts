import * as React from 'react'

import addEventListener from '../addEventListener'
import removeEventListener from '../removeEventListener'
import { EventTypes } from '../types'
import * as listenerRegistries from '../listenerRegistries'
import { UseListenerHookOptions } from './types'

const useStackableEventListener = <N extends Node, T extends EventTypes>(
  options: UseListenerHookOptions<N, T>,
): void => {
  const { listener, targetRef, type } = options
  const handler = React.useCallback((event: DocumentEventMap[T]) => {
    if (listenerRegistries.isDispatchable(type, handler)) {
      return listener(event)
    }
  }, [])

  React.useEffect(() => {
    listenerRegistries.add(type, handler)
    addEventListener(targetRef, type, handler)

    return () => {
      listenerRegistries.remove(type, handler)
      removeEventListener(targetRef, type, handler)
    }
  }, [])
}

export default useStackableEventListener
