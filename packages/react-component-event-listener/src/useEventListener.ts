import * as React from 'react'

import { EventHandler, EventListenerOptions, EventTypes, TargetRef } from './types'

const isActionSupported = (
  targetRef: TargetRef,
  method: 'addEventListener' | 'removeEventListener',
) => targetRef && !!targetRef.current && !!targetRef.current[method]

const useEventListener = <T extends EventTypes>(options: EventListenerOptions<T>): void => {
  const { capture, listener, type, targetRef } = options

  const latestListener = React.useRef<EventHandler<T>>(listener)
  latestListener.current = listener

  const eventHandler = React.useCallback((event: DocumentEventMap[T]) => {
    return latestListener.current(event)
  }, [])

  React.useEffect(
    () => {
      if (isActionSupported(targetRef, 'addEventListener')) {
        ;(targetRef.current as NonNullable<Node>).addEventListener(type, eventHandler, capture)
      } else if (process.env.NODE_ENV !== 'production') {
        throw new Error(
          '@stardust-ui/react-component-event-listener: Passed `targetRef` is not valid or does not support `addEventListener()` method.',
        )
      }

      return () => {
        if (isActionSupported(targetRef, 'removeEventListener')) {
          ;(targetRef.current as NonNullable<Node>).removeEventListener(type, eventHandler, capture)
        } else if (process.env.NODE_ENV !== 'production') {
          throw new Error(
            '@stardust-ui/react-component-event-listener: Passed `targetRef` is not valid or does not support `removeEventListener()` method.',
          )
        }
      }
    },
    [capture, targetRef, type],
  )
}

export default useEventListener
