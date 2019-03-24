import * as React from 'react'

import addEventListener from '../lib/addEventListener'
import removeEventListener from '../lib/removeEventListener'
import { EventTypes } from '../types'
import * as listenerRegistries from '../lib/listenerRegistries'
import { UseListenerHookOptions } from './types'

const useStackableEventListener = <N extends Node, T extends EventTypes>(
  options: UseListenerHookOptions<N, T>,
): void => {
  const { listener, type } = options
  const handler = React.useCallback((event: DocumentEventMap[T]) => {
    if (listenerRegistries.isDispatchable(type, handler)) {
      return listener(event)
    }
  }, [])

  React.useEffect(() => {
    listenerRegistries.add(type, handler)
    addEventListener(handler, options)

    return () => {
      listenerRegistries.remove(type, handler)
      removeEventListener(handler, options)
    }
  }, [])
}

export default useStackableEventListener
