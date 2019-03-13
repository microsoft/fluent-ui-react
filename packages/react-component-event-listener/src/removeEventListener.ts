import * as React from 'react'
import { EventHandler, EventTypes } from './types'

const removeEventListener = (
  targetRef: React.RefObject<Node>,
  type: EventTypes,
  listener: EventHandler<EventTypes>,
) => {
  const isSupported = targetRef && targetRef.current && typeof targetRef.current.removeEventListener

  if (isSupported) {
    targetRef.current!.removeEventListener(type, listener)
  }

  if (process.env.NODE_ENV !== 'production') {
    if (!isSupported) {
      console.error(
        '@stardust-ui/react-component-event-listener: Passed `targetRef` is not valid or does not support `removeEventListener()` method.',
      )
    }
  }
}

export default removeEventListener
