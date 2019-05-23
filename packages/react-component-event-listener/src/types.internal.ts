import * as PropTypes from 'prop-types'
import { EventListenerProps, EventTypes, TargetRef } from './types'

export type ListenerActionOptions = {
  capture: boolean
  targetRef: TargetRef
  type: EventTypes
}

export const listenerPropTypes = {
  capture: PropTypes.bool,
  listener: PropTypes.func.isRequired,
  targetRef: PropTypes.shape({
    current: PropTypes.object,
  }).isRequired,
  type: PropTypes.string.isRequired,
} as Record<keyof EventListenerProps, any>
