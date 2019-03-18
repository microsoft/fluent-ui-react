import * as PropTypes from 'prop-types'
import * as React from 'react'

export interface EventListenerProps {
  /** Idicating that events of this type will be dispatched to the registered listener before being dispatched to any EventTarget beneath it in the DOM tree. */
  capture?: boolean

  /** A function which receives a notification when an event of the specified type occurs. */
  listener: EventHandler<EventTypes>

  /** A ref object with a target node. */
  targetRef: TargetRef

  /** A case-sensitive string representing the event type to listen for. */
  type: EventTypes
}

export type EventHandler<T extends EventTypes> = (e: DocumentEventMap[T]) => void
export type EventTypes = keyof DocumentEventMap

export type ListenerActionOptions = {
  capture: boolean
  targetRef: TargetRef
  type: EventTypes
}
export type TargetRef = React.RefObject<Node | Window>

export const listenerPropTypes = {
  capture: PropTypes.bool,
  listener: PropTypes.func.isRequired,
  targetRef: PropTypes.shape({
    current: PropTypes.object,
  }).isRequired,
  type: PropTypes.string.isRequired,
} as Record<keyof EventListenerProps, any>
