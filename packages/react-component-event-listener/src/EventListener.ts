import * as React from 'react'

import addEventListener from './addEventListener'
import { EventListenerProps, listenerPropTypes } from './types'
import removeEventListener from './removeEventListener'

class EventListener extends React.PureComponent<EventListenerProps> {
  static displayName = 'EventListener'
  static propTypes = listenerPropTypes

  componentDidMount() {
    addEventListener(this.props.targetRef, this.props.type, this.handleEvent)
  }

  componentDidUpdate(prevProps) {
    removeEventListener(prevProps.targetRef, prevProps.type, this.handleEvent)
    addEventListener(this.props.targetRef, this.props.type, this.handleEvent)
  }

  componentWillUnmount() {
    removeEventListener(this.props.targetRef, this.props.type, this.handleEvent)
  }

  handleEvent = e => this.props.listener(e)

  render() {
    return null
  }
}

export default EventListener
