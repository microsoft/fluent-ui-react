import * as React from 'react'

import addEventListener from './lib/addEventListener'
import removeEventListener from './lib/removeEventListener'
import shouldUpdateListener from './lib/shouldUpdateListener'
import { EventListenerProps, listenerPropTypes } from './types'

class EventListener extends React.Component<EventListenerProps> {
  static displayName = 'EventListener'
  static propTypes = listenerPropTypes
  static defaultProps = {
    capture: false,
  }

  shouldComponentUpdate(nextProps: EventListenerProps) {
    return shouldUpdateListener(this.props, nextProps)
  }

  componentDidMount() {
    addEventListener(this.handleEvent, this.props as Required<EventListenerProps>)
  }

  componentDidUpdate(prevProps: EventListenerProps) {
    removeEventListener(this.handleEvent, prevProps as Required<EventListenerProps>)
    addEventListener(this.handleEvent, this.props as Required<EventListenerProps>)
  }

  componentWillUnmount() {
    removeEventListener(this.handleEvent, this.props as Required<EventListenerProps>)
  }

  handleEvent = (e: Event) => this.props.listener(e)

  render() {
    return null
  }
}

export default EventListener
