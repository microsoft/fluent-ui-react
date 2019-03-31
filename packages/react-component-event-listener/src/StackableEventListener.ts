import * as React from 'react'

import addEventListener from './lib/addEventListener'
import removeEventListener from './lib/removeEventListener'
import { EventListenerProps, listenerPropTypes } from './types'
import * as listenerRegistries from './lib/listenerRegistries'

class StackableEventListener extends React.PureComponent<EventListenerProps> {
  static displayName = 'StackableEventListener'
  static propTypes = listenerPropTypes
  static defaultProps = {
    capture: false,
  }

  componentDidMount() {
    listenerRegistries.add(this.props.type, this.handleEvent)
    addEventListener(this.handleEvent, this.props as Required<EventListenerProps>)
  }

  componentDidUpdate(prevProps: EventListenerProps) {
    listenerRegistries.remove(this.props.type, this.handleEvent)
    removeEventListener(this.handleEvent, prevProps as Required<EventListenerProps>)

    listenerRegistries.add(this.props.type, this.handleEvent)
    addEventListener(this.handleEvent, this.props as Required<EventListenerProps>)
  }

  componentWillUnmount() {
    listenerRegistries.remove(this.props.type, this.handleEvent)
    removeEventListener(this.handleEvent, this.props as Required<EventListenerProps>)
  }

  handleEvent = (e: Event) => {
    if (listenerRegistries.isDispatchable(this.props.type, this.handleEvent)) {
      return this.props.listener(e)
    }
  }

  render() {
    return null
  }
}

export default StackableEventListener
