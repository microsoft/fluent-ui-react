import keyboardKey from 'keyboard-key'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { toRefObject } from '@stardust-ui/react-component-ref'
import { EventListener } from '@stardust-ui/react-component-event-listener'

import { isBrowser } from '../../lib'

import DebugPanel from './DebugPanel'
import FiberNavigator from './FiberNavigator'

const INITIAL_STATE = {
  fiberNav: null,
  stardustOwnerFiberNav: null,
  intermediaryFibers: [],
  isSelecting: false,
  stardustDOMNode: null,
  stardustComponent: null,
  stardustInstance: null,
}

type DebugProps = {
  /** Existing document the popup should add listeners. */
  mountDocument?: Document
}

class Debug extends React.Component<DebugProps> {
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
    const { stardustDOMNode, stardustInstance, stardustComponent } = this.state

    console.debug('Clicked stardustDOMNode. Prevent default and stop propagation.', {
      stardustDOMNode,
      stardustInstance,
      stardustComponent,
    })

    e.preventDefault()
    e.stopPropagation()

    this.setState({ isSelecting: false })
  }

  handleMouseMove = e => {
    // console.log('MOUSEMOVE')
    this.debugDOMNode(e.target)
  }

  debugDOMNode = domNode => {
    let stardustDOMNode
    let stardustComponent: React.Component
    let stardustInstance: object
    const intermediaryFibers = []

    if (!domNode) {
      return
    }

    // console.group('debugDOMNode')

    const isFiberDebuggable = (fiber: FiberNavigator) => {
      // console.log('isFiberDebuggable', fiber)
      return !!fiber && !!fiber.instance && !!fiber.instance.stardustDebug
    }

    //
    // Find nearest Stardust owner
    //
    let stardustOwnerFiberNav = FiberNavigator.fromDOMNode(domNode)
    let foundStardustOwner

    while (!foundStardustOwner && stardustOwnerFiberNav) {
      if (isFiberDebuggable(stardustOwnerFiberNav)) {
        foundStardustOwner = true
      } else {
        stardustOwnerFiberNav = stardustOwnerFiberNav.owner
      }
    }

    if (!foundStardustOwner && !stardustOwnerFiberNav) {
      // console.log("Reached top, didn't find Stardust Owner in DOM")
      // console.groupEnd()
      return
    }

    //
    // Find parents up to Stardust owner
    //
    let parentsFiberNav = FiberNavigator.fromDOMNode(domNode)

    while (!stardustDOMNode && parentsFiberNav) {
      // console.group('WHILE')
      // console.debug({ node, parentsFiberNav, SDComponent })

      // compare owner owner to parents owner
      if (parentsFiberNav && stardustOwnerFiberNav.instance === parentsFiberNav.instance) {
        stardustDOMNode = ReactDOM.findDOMNode(parentsFiberNav.instance)
        stardustComponent = stardustOwnerFiberNav.reactComponent
        stardustInstance = stardustOwnerFiberNav.instance

        // console.debug('FOUND', {
        //   intermediaryFibers,
        //   parentsFiberNav,
        //   stardustOwnerFiberNav,
        //   stardustInstance,
        //   stardustDOMNode,
        //   stardustComponent,
        // })
      } else {
        // Track all React components between the original fiber and the eventual Stardust owner.
        // This will enable us to show a selector for choosing DOM nodes and Stardust components
        //   between the selected element at the nearest Stardust owner.
        if (isFiberDebuggable(parentsFiberNav)) {
          intermediaryFibers.push(parentsFiberNav)
        }
        parentsFiberNav = parentsFiberNav.parent

        // console.debug('SEARCHING', {
        //   intermediaryFibers,
        //   parentsFiberNav,
        //   stardustOwnerFiberNav,
        //   stardustDOMNode,
        // })
      }

      // console.groupEnd()
    }

    // console.groupEnd()

    if (
      stardustOwnerFiberNav !== this.state.stardustOwnerFiberNav ||
      parentsFiberNav !== this.state.fiberNav ||
      intermediaryFibers !== this.state.intermediaryFibers ||
      stardustDOMNode !== this.state.stardustDOMNode ||
      stardustComponent !== this.state.stardustComponent ||
      stardustInstance !== this.state.stardustInstance
    ) {
      this.setState({
        stardustOwnerFiberNav,
        fiberNav: parentsFiberNav,
        intermediaryFibers,
        stardustDOMNode,
        stardustComponent,
        stardustInstance,
      })
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.debug('DEBUG componentDidUpdate', { state: this.state, prevState })
    this.setDebugSelectorPosition()
  }

  setDebugSelectorPosition = () => {
    const { stardustDOMNode } = this.state

    if (stardustDOMNode && this.selectorRef.current) {
      const rect = stardustDOMNode.getBoundingClientRect()

      this.selectorRef.current.style.top = `${rect.top}px`
      this.selectorRef.current.style.left = `${rect.left}px`
      this.selectorRef.current.style.width = `${rect.width}px`
      this.selectorRef.current.style.height = `${rect.height}px`

      requestAnimationFrame(this.setDebugSelectorPosition)
    }
  }

  render() {
    const { mountDocument } = this.props
    const {
      // fiberNav,
      // stardustOwnerFiberNav,
      // intermediaryFibers,
      stardustComponent,
      stardustInstance,
      stardustDOMNode,
      isSelecting,
    } = this.state

    const componentName = stardustComponent
      ? stardustComponent.displayName || stardustComponent.name
      : ''

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
        {isSelecting && stardustDOMNode && (
          <EventListener
            targetRef={toRefObject(stardustDOMNode)}
            listener={this.handleStardustDOMNodeClick}
            type="click"
          />
        )}
        {isSelecting && stardustComponent && (
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
              <span style={{ fontWeight: 'bold' }}>{`<${componentName} />`}</span>
            </div>
            {stardustDOMNode && (
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
                  {stardustDOMNode.tagName.toLowerCase()}
                </strong>
                {stardustDOMNode.hasAttribute('class') && (
                  <span style={{ color: 'rgba(255, 255, 255, 0.75)' }}>
                    .{(stardustDOMNode.getAttribute('class') || '').replace(/ +/g, '.')}
                  </span>
                )}
              </div>
            )}
          </pre>
        )}
        {!isSelecting && stardustInstance && (
          <DebugPanel
            onActivateDebugSelectorClick={() => {
              this.setState({ isSelecting: true })
            }}
            componentName={componentName}
            // TODO: Integrate CSS in JS Styles for Host Components (DOM nodes)
            // cssStyles={stylesForNode(stardustDOMNode)}
            debugData={stardustInstance.stardustDebug}
          />
        )}
      </>
    )
  }
}

export default Debug
