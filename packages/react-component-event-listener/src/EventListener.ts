import * as React from 'react'

import addEventListener from './lib/addEventListener'
import { EventListenerProps, listenerPropTypes } from './types'
import removeEventListener from './lib/removeEventListener'

class EventListener extends React.PureComponent<EventListenerProps> {
  static displayName = 'EventListener'
  static propTypes = listenerPropTypes
  static defaultProps = {
    capture: false,
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
