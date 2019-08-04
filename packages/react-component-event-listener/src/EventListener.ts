import * as PropTypes from 'prop-types'

import useEventListener from './useEventListener'
import { EventListenerOptions, EventTypes, TargetRef } from './types'

function EventListener<T extends EventTypes>(props: EventListenerOptions<T>) {
  useEventListener(props)

  return null
}

EventListener.displayName = 'EventListener'
EventListener.propTypes = {
  capture: PropTypes.bool,
  listener: PropTypes.func.isRequired,
  targetRef: PropTypes.shape({
    current: PropTypes.object,
  }).isRequired as PropTypes.Validator<TargetRef>,
  type: PropTypes.string.isRequired as PropTypes.Validator<EventTypes>,
}
EventListener.defaultProps = {
  capture: false,
}

export default EventListener
