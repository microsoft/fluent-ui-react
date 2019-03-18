import * as React from 'react'

import addEventListener from '../lib/addEventListener'
import removeEventListener from '../lib/removeEventListener'
import { EventTypes } from '../types'
import { UseListenerHookOptions } from './types'

const useEventListener = <N extends Node, T extends EventTypes>(
  options: UseListenerHookOptions<N, T>,
): void => {
  const { listener, type } = options
  const handler = React.useCallback((event: DocumentEventMap[T]) => {
    return listener(event)
  }, [])

  React.useEffect(
    () => {
      addEventListener(handler, options)
      return () => removeEventListener(handler, options)
    },
    [type],
  )
}

export default useEventListener
