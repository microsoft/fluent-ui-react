import * as React from 'react'

import addEventListener from '../addEventListener'
import removeEventListener from '../removeEventListener'
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
      addEventListener(targetRef, type, handler)
      return () => removeEventListener(targetRef, type, handler)
    },
    [type],
  )
}

export default useEventListener
