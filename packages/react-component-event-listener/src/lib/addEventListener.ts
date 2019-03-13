import * as React from 'react'
import { EventHandler, EventTypes } from '../types'

const addEventListener = (
  targetRef: React.RefObject<Node>,
  type: EventTypes,
  listener: EventHandler<EventTypes>,
) => {
  const isSupported: boolean =
    targetRef && !!targetRef.current && !!targetRef.current.addEventListener

  if (isSupported) {
    ;(targetRef.current as NonNullable<Node>).addEventListener(type, listener)
  }

  if (process.env.NODE_ENV !== 'production') {
    if (!isSupported) {
      console.error(
        '@stardust-ui/react-component-event-listener: Passed `targetRef` is not valid or does not support `addEventListener()` method.',
      )
    }
  }
}

export default addEventListener
