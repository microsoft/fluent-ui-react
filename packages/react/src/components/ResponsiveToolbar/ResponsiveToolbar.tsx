import * as React from 'react'
import * as _ from 'lodash'

import { Ref } from '@stardust-ui/react-component-ref'
import ReactResizeDetector from 'react-resize-detector'

import Toolbar, { ToolbarProps } from '../Toolbar/Toolbar'

/**
 1. Can we just implement simple logic which removes items from the end one by one until it fits?
   - No, does not work for uBar
     - overflow item is in the middle of the toolbar
     - items are removed in steps (and custom order?)
 2. Can we expect all items have equal width?
   - No, does not work for uBar
 3. Should this logic be part of Toolbar or a separate ResponsiveToolbar component?
   - I want to use Toolbar first and (eventually) make it responsive
   - Separation of concerns
 4. Should it be generic or Toolbar-specific?
   - with Toolbar-specific approach, we can optimize and have better, more intuitive API
   - requirements for optimization:
     - container - items structure
     - each item renders one DOM element (so that we can use DOM and don't need to pollute React tree with Refs)
 5. Do we need additional elements in DOM?
   - yes, we need to do the measurements on hidden container to avoid flicker
 */

export type ResponsiveToolbarProps = ToolbarProps & {
  reduceItems: (items, measurements) => any
}

export interface ResponsiveToolbarState {
  items: ResponsiveToolbarProps['items']
  initialItems: ResponsiveToolbarProps['items']
  stableItems?: ResponsiveToolbarProps['items']
  stable: boolean
}

class ResponsiveToolbar extends React.Component<ResponsiveToolbarProps, ResponsiveToolbarState> {
  containerRef = React.createRef<HTMLElement>()

  state: ResponsiveToolbarState = {
    items: [],
    initialItems: [],
    stable: false,
  }

  static getDerivedStateFromProps(props: ResponsiveToolbarProps, state: ResponsiveToolbarState) {
    if (props.items === state.initialItems) {
      return null
    }

    state.items = props.items
    state.initialItems = props.items

    return state
  }

  componentDidMount() {
    this.afterComponentRendered()
  }

  componentDidUpdate() {
    this.afterComponentRendered()
  }

  afterComponentRendered() {
    console.log('rendered')
    //   window.requestAnimationFrame(() => {
    //     if (this.containerRef.current) {
    //       const { fits } = this.measureOverflow(this.containerRef.current)
    //       this.setState(({ items }) => {
    //         if (fits) {
    //           return { stable: true, stableItems: items }
    //         }
    //
    //         const reducedItems = this.props.reduceItems(items)
    //
    //         if (reducedItems === null) {
    //           // consumer refused to reduce further
    //           return { stable: true, stableItems: items }
    //         }
    //         return { items: reducedItems }
    //       })
    //     }
    //   })
  }

  measureOverflow(container: HTMLElement) {
    const containerRect = container.getBoundingClientRect()

    console.log('measureOverflow', containerRect.left, containerRect.right)

    const children = _.map(container.children, child => {
      const rect = child.getBoundingClientRect()
      return {
        left: rect.left,
        leftFits: rect.left >= containerRect.left,
        right: rect.right,
        rightFits: rect.right <= containerRect.right,
      }
    })

    console.table(children)
    const fits = !_.some(children, c => !c.leftFits || !c.rightFits)
    return { fits, children }
  }

  onResize = (newWidth, newHeight) => {
    console.log(`onResize -> ${newWidth} x ${newHeight}`)
    this.setState(state => ({
      items: state.initialItems,
      stable: false,
    }))
  }

  render() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { reduceItems, ...toolbarProps } = this.props

    return (
      <div style={{ position: 'relative' }}>
        {!this.state.stable && (
          <Ref innerRef={this.containerRef}>
            <Toolbar
              {...toolbarProps}
              style={{ xposition: 'fixed', xvisibility: 'hidden', background: '#ff000044' }}
              items={this.state.items}
            />
          </Ref>
        )}

        {this.state.stableItems && <Toolbar {...toolbarProps} items={this.state.stableItems} />}

        <ReactResizeDetector skipOnMount handleWidth onResize={this.onResize} />
      </div>
    )
  }
}

export default ResponsiveToolbar
