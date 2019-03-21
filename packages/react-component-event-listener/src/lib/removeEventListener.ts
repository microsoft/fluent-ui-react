import { EventHandler, EventTypes, ListenerActionOptions } from '../types'

const removeEventListener = (
  listener: EventHandler<EventTypes>,
  options: ListenerActionOptions,
) => {
  const { targetRef, type, capture } = options
  const isSupported = targetRef && !!targetRef.current && !!targetRef.current.removeEventListener

  if (isSupported) {
    ;(targetRef.current as NonNullable<Node>).removeEventListener(type, listener, capture)
  }

  if (process.env.NODE_ENV !== 'production') {
    if (!isSupported) {
      throw new Error(
        '@stardust-ui/react-component-event-listener: Passed `targetRef` is not valid or does not support `removeEventListener()` method.',
      )
    }
  }
}

export default removeEventListener
