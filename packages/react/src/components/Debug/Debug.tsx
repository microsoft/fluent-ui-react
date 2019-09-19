import keyboardKey from 'keyboard-key'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { toRefObject } from '@stardust-ui/react-component-ref'
import { EventListener } from '@stardust-ui/react-component-event-listener'

import { isBrowser } from '../../lib'

import DebugPanel from './DebugPanel'
import FiberNavigator from './FiberNavigator'

type DebugState = { fiberNav: FiberNavigator; isSelecting: boolean }

const INITIAL_STATE: DebugState = {
  fiberNav: null,
  isSelecting: false,
}

type DebugProps = {
  /** Existing document the popup should add listeners. */
  mountDocument?: Document
}

class Debug extends React.Component<DebugProps, DebugState> {
  selectorRef = React.createRef<HTMLPreElement>()

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
    const { fiberNav } = this.state

    console.debug('Clicked stardustDOMNode. Prevent default and stop propagation.', fiberNav)

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

    fiberNav = fiberNav.find(
      fiber => fiber.instance && fiber.instance.stardustDebug,
      fiber => fiber.owner,
    )

    if (fiberNav !== this.state.fiberNav) {
      this.setState({ fiberNav })
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.debug('DEBUG componentDidUpdate', { state: this.state, prevState })
    this.setDebugSelectorPosition()
  }

  setDebugSelectorPosition = () => {
    const { fiberNav } = this.state

    if (fiberNav && fiberNav.domNode && this.selectorRef.current) {
      const rect = fiberNav.domNode.getBoundingClientRect()

      this.selectorRef.current.style.top = `${rect.top}px`
      this.selectorRef.current.style.left = `${rect.left}px`
      this.selectorRef.current.style.width = `${rect.width}px`
      this.selectorRef.current.style.height = `${rect.height}px`

      requestAnimationFrame(this.setDebugSelectorPosition)
    }
  }

  render() {
    const { mountDocument } = this.props
    const { fiberNav, isSelecting } = this.state

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
        {isSelecting && fiberNav && (
          <pre
            ref={this.selectorRef}
            style={{
              position: 'fixed',
              padding: 0,
              margin: 0,
              background: '#6495ed22',
              border: '1px solid #6495edcc',
              zIndex: 99999999,
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            <div
              style={{
                position: 'absolute',
                padding: '2px 4px',
                margin: '-1px 0 0 -1px',
                bottom: '100%',
                left: 0,
                color: '#fff',
                background: '#6495ed',
              }}
            >
              <span style={{ fontWeight: 'bold' }}>{`<${fiberNav.name} />`}</span>
            </div>
            {fiberNav.domNode && (
              <div
                style={{
                  fontSize: '0.9em',
                  position: 'absolute',
                  padding: '2px 4px',
                  margin: '0 0 1px -1px',
                  top: '100%',
                  left: 0,
                  background: '#6495ed',
                }}
              >
                <strong style={{ fontWeight: 'bold', color: 'hsl(160, 100%, 80%)' }}>
                  {fiberNav.domNode.tagName.toLowerCase()}
                </strong>
                {fiberNav.domNode.hasAttribute('class') && (
                  <span style={{ color: 'rgba(255, 255, 255, 0.75)' }}>
                    .{(fiberNav.domNode.getAttribute('class') || '').replace(/ +/g, '.')}
                  </span>
                )}
              </div>
            )}
          </pre>
        )}
        {!isSelecting && fiberNav && fiberNav.instance && (
          <DebugPanel
            fiberNav={fiberNav}
            onActivateDebugSelectorClick={() => {
              this.setState({ isSelecting: true })
            }}
            // TODO: Integrate CSS in JS Styles for Host Components (DOM nodes)
            // cssStyles={stylesForNode(stardustDOMNode)}
            debugData={fiberNav.instance.stardustDebug}
          />
        )}
      </>
    )
  }
}

export default Debug
