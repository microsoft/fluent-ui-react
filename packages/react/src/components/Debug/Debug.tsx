import keyboardKey from 'keyboard-key'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { toRefObject } from '@stardust-ui/react-component-ref'
import { EventListener } from '@stardust-ui/react-component-event-listener'

import { isBrowser } from '../../lib'

import DebugPanel from './DebugPanel'
import FiberNavigator from './FiberNavigator'
import DebugRect from './DebugRect'

type DebugProps = {
  /** Existing document the popup should add listeners. */
  mountDocument?: Document
}

type DebugState = {
  debugPanelPosition?: 'left' | 'right'
  fiberNav: FiberNavigator
  isSelecting: boolean
}

const INITIAL_STATE: DebugState = {
  fiberNav: null,
  isSelecting: false,
}

class Debug extends React.Component<DebugProps, DebugState> {
  state = INITIAL_STATE

  static defaultProps = {
    mountDocument: isBrowser() ? window.document : null,
  }

  static propTypes = {
    mountDocument: PropTypes.object.isRequired,
  }

  handleKeyDown = e => {
    const code = keyboardKey.getCode(e)

    switch (code) {
      case keyboardKey.Escape: {
        this.setState(INITIAL_STATE)
        break
      }

      case keyboardKey.d: {
        if (e.altKey && e.shiftKey) {
          const isSelecting = !this.state.isSelecting

          this.setState({
            ...(!isSelecting && INITIAL_STATE),
            isSelecting,
          })
        }
        break
      }
    }
  }

  handleStardustDOMNodeClick = e => {
    // console.debug('Clicked stardustDOMNode. Prevent default and stop propagation.', this.state.fiberNav)

    e.preventDefault()
    e.stopPropagation()

    this.setState({ isSelecting: false })
  }

  handleMouseMove = e => {
    // console.log('MOUSEMOVE')
    this.debugDOMNode(e.target)
  }

  debugDOMNode = domNode => {
    // console.group('debugDOMNode')

    let fiberNav = FiberNavigator.fromDOMNode(domNode)

    if (!fiberNav) {
      console.error('No fiber for dom node', domNode)
      return
    }

    fiberNav = fiberNav.findOwner(fiber => fiber.stardustDebug)

    if (fiberNav !== this.state.fiberNav) {
      this.setState({ fiberNav })
    }
  }

  render() {
    const { mountDocument } = this.props
    const { fiberNav, isSelecting, debugPanelPosition } = this.state

    return (
      <>
        <EventListener
          targetRef={toRefObject(mountDocument.body)}
          listener={this.handleKeyDown}
          type="keydown"
        />
        {isSelecting && (
          <EventListener
            targetRef={toRefObject(mountDocument.body)}
            listener={this.handleMouseMove}
            type="mousemove"
          />
        )}
        {isSelecting && fiberNav && fiberNav.domNode && (
          <EventListener
            targetRef={toRefObject(fiberNav.domNode)}
            listener={this.handleStardustDOMNodeClick}
            type="click"
          />
        )}
        {isSelecting && fiberNav && <DebugRect fiberNav={fiberNav} />}
        {!isSelecting && fiberNav && fiberNav.instance && (
          <DebugPanel
            fiberNav={fiberNav}
            onActivateDebugSelectorClick={() =>
              this.setState({ ...INITIAL_STATE, isSelecting: true })
            }
            onClose={() => this.setState(INITIAL_STATE)}
            // TODO: Integrate CSS in JS Styles for Host Components (DOM nodes)
            // cssStyles={stylesForNode(stardustDOMNode)}
            debugData={fiberNav.stardustDebug}
            position={debugPanelPosition || 'right'}
            onPositionLeft={() => this.setState({ debugPanelPosition: 'left' })}
            onPositionRight={() => this.setState({ debugPanelPosition: 'right' })}
            onFiberChanged={f => this.setState({ fiberNav: f })}
          />
        )}
      </>
    )
  }
}

export default Debug
