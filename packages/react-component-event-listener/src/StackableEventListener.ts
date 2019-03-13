import * as React from 'react'

import addEventListener from './lib/addEventListener'
import removeEventListener from './lib/removeEventListener'
import { EventListenerProps, listenerPropTypes } from './types'
import * as listenerRegistries from './lib/listenerRegistries'

class StackableEventListener extends React.PureComponent<EventListenerProps> {
  static displayName = 'StackableEventListener'
  static propTypes = listenerPropTypes

  componentDidMount() {
    listenerRegistries.add(this.props.type, this.handleEvent)
    addEventListener(this.props.targetRef, this.props.type, this.handleEvent)
  }

  componentDidUpdate(prevProps: EventListenerProps) {
    listenerRegistries.remove(this.props.type, this.handleEvent)
    removeEventListener(prevProps.targetRef, prevProps.type, this.handleEvent)

    listenerRegistries.add(this.props.type, this.handleEvent)
    addEventListener(this.props.targetRef, this.props.type, this.handleEvent)
  }

  componentWillUnmount() {
    listenerRegistries.remove(this.props.type, this.handleEvent)
    removeEventListener(this.props.targetRef, this.props.type, this.handleEvent)
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
