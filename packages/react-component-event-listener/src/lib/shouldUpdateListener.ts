import { EventListenerProps } from '../types'

const shouldUpdateListener = (prevProps: EventListenerProps, nextProps: EventListenerProps) =>
  prevProps.capture !== nextProps.capture ||
  prevProps.targetRef !== nextProps.targetRef ||
  prevProps.type !== nextProps.type

export default shouldUpdateListener
