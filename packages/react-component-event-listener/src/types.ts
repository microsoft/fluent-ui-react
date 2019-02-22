import * as PropTypes from 'prop-types'
import * as React from 'react'

export interface EventListenerProps {
  /** A function which receives a notification when an event of the specified type occurs. */
  listener: EventHandler<EventTypes>

  /** A ref object with a target node. */
  targetRef: React.RefObject<Node>

  /** A case-sensitive string representing the event type to listen for. */
  type: EventTypes
}

export type EventHandler<T extends EventTypes> = (e: DocumentEventMap[T]) => void

export type EventTypes = keyof DocumentEventMap

export const listenerPropTypes = {
  listener: PropTypes.func.isRequired,
  targetRef: PropTypes.shape({
    current: PropTypes.object,
  }).isRequired,
  type: PropTypes.string.isRequired,
} as Record<keyof EventListenerProps, any>
