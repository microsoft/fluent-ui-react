import * as React from 'react'

import addEventListener from './lib/addEventListener'
import removeEventListener from './lib/removeEventListener'
import * as listenerRegistries from './lib/listenerRegistries'
import shouldUpdateListener from './lib/shouldUpdateListener'
import { EventListenerProps, listenerPropTypes } from './types'

class StackableEventListener extends React.Component<EventListenerProps> {
  static displayName = 'StackableEventListener'
  static propTypes = listenerPropTypes
  static defaultProps = {
    capture: false,
  }

  shouldComponentUpdate(nextProps: EventListenerProps) {
    return shouldUpdateListener(this.props, nextProps)
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
