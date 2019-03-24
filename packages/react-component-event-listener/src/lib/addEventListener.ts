import { EventHandler, EventTypes, ListenerActionOptions } from '../types'

const addEventListener = (listener: EventHandler<EventTypes>, options: ListenerActionOptions) => {
  const { targetRef, type, capture } = options
  const isSupported = targetRef && !!targetRef.current && !!targetRef.current.addEventListener

  if (isSupported) {
    ;(targetRef.current as NonNullable<Node>).addEventListener(type, listener, capture)
  }

  if (process.env.NODE_ENV !== 'production') {
    if (!isSupported) {
      throw new Error(
        '@stardust-ui/react-component-event-listener: Passed `targetRef` is not valid or does not support `addEventListener()` method.',
      )
    }
  }
}

export default addEventListener
