import keyboardKey from 'keyboard-key'
import * as React from 'react'
import * as SD from '@stardust-ui/react'
import { shotgun } from '../../themes/teams/animations/timingFunctions'
import { toRefObject } from '@stardust-ui/react-component-ref'
import { EventListener } from '@stardust-ui/react-component-event-listener'

const findReactFiber = elm => {
  for (const k in elm) {
    if (k.startsWith('__reactInternalInstance$')) {
      const fiberNode = elm[k]

      return fiberNode && fiberNode.return && fiberNode.return
    }
  }
  return null
}

class Debug extends React.Component<{}> {
  state = {
    picking: false,
    stardustElement: null,
    stardustComponent: null,
    box: {
      top: '10rem',
      left: '10rem',
      width: '10rem',
      height: '10rem',
    },
  }

  handleKeyDown = e => {
    const key = keyboardKey.getKey(e)

    console.log('handleKeyDown', {
      ctrlKey: e.ctrlKey,
      shiftKey: e.shiftKey,
      metaKey: e.metaKey,
    })

    if (key === 'd' && e.ctrlKey) {
      const picking = !this.state.picking

      this.setState({
        picking,
        stardustComponent: picking ? this.state.stardustComponent : null,
      })
    }
  }

  handleClick = e => {
    this.setState({
      picking: false,
    })
  }

  handleMouseMove = e => {
    let node = e.target
    let stardustElement: HTMLElement
    let stardustComponent: React.Component

    // We start from a DOM node
    // We need to traverse up the React tree until we find a DOM component responsible for this DOM node
    // That component owns the DOM node.
    // All intermediary components are CompositeComponents and should be overlooked

    // console.group('MOUSEMOVE')

    while (!stardustElement && node && node.parentNode) {
      const fiber = findReactFiber(node)
      const elementType = fiber && fiber.elementType
      const SDComponent = elementType && SD[elementType.name]

      // console.group('WHILE')
      // console.log({ node, fiber, SDComponent })

      const isStardustExport =
        elementType && SDComponent && SDComponent.constructor === elementType.constructor

      if (isStardustExport) {
        stardustElement = node
        stardustComponent = SDComponent
      } else {
        node = node.parentNode
      }

      // console.log({ node, fiber, stardustElement, stardustComponent })
      // console.groupEnd()
    }

    // console.groupEnd()

    const rect = stardustElement && stardustElement.getBoundingClientRect()

    this.setState({
      stardustElement,
      stardustComponent,
      box: {
        top: rect && rect.top,
        left: rect && rect.left,
        width: rect && rect.width,
        height: rect && rect.height,
      },
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log('DEBUG componentDidUpdate', { state: this.state, prevState })
  }

  render() {
    const { box, stardustComponent, stardustElement, picking } = this.state

    return (
      <>
        <EventListener
          targetRef={toRefObject(document.body)}
          listener={this.handleKeyDown}
          type="keydown"
        />
        {picking && (
          <>
            <EventListener
              targetRef={toRefObject(document.body)}
              listener={this.handleMouseMove}
              type="mousemove"
            />
            <EventListener
              targetRef={toRefObject(document.body)}
              listener={this.handleClick}
              type="click"
            />
          </>
        )}
        {stardustComponent && (
          <pre
            style={{
              boxSizing: 'border-box',

              position: 'fixed',
              padding: 0,
              margin: 0,
              transition: `all ${shotgun} 0.2s`,
              ...box,
              color: '#000',
              background: '#6495ed22',
              border: '2px solid #6495edcc',
              zIndex: 99999999,
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            <div
              style={{
                boxSizing: 'border-box',
                position: 'absolute',
                bottom: '100%',
                left: 0,
                background: '#6495ed',
                color: '#fff',
              }}
            >
              {stardustComponent && (stardustComponent.displayName || stardustComponent.name)}
              {stardustElement && stardustElement.class}
            </div>
          </pre>
        )}
      </>
    )
  }
}

export default Debug
