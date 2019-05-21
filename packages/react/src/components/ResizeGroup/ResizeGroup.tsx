import * as React from 'react'
import { Ref } from '@stardust-ui/react-component-ref'
import ReactResizeDetector from 'react-resize-detector'

export interface ResizeGroupProps {
  items: any
  renderItems: any
  reduce: any
}

export interface ResizeGroupState {
  items: any
  stableItems?: any
  initialItems: any
  stable: boolean
}

class ResizeGroup extends React.Component<ResizeGroupProps, ResizeGroupState> {
  private containerRef = React.createRef<HTMLElement>()
  private hiddenRef = React.createRef<HTMLElement>()

  state: ResizeGroupState = {
    items: [],
    initialItems: [],
    stable: false,
  }

  componentDidMount() {
    console.log('componentDidMount')
    this.afterComponentRendered()
  }
  componentDidUpdate() {
    // console.log('componentDidUpdate')
    this.afterComponentRendered()
  }

  static getDerivedStateFromProps(props: ResizeGroupProps, state) {
    // const newState: Partial<ResizeGroupState> = prevState
    if (props.items === state.initialItems) {
      console.log('getDerivedStateFromProps - no change')
      return null
    }

    console.log('getDerivedStateFromProps - items changed')
    state.items = props.items
    state.initialItems = props.items

    return state
  }

  onResize = (newWidth, newHeight) => {
    if (newWidth === this.lastSize) {
      console.log(`%conResize to ${this.lastSize} -> ${newWidth} - ignore`, 'color: red')
      return
    }

    if (newWidth < this.lastSize && !this.state.stable) {
      console.log(
        `%conResize to ${this.lastSize} -> ${newWidth} - smaller and in progress`,
        'color: red',
      )
      this.lastSize = newWidth
      return
    }

    if (newWidth > this.lastSize && newWidth < this.lastComputedSize && !this.state.stable) {
      console.log(
        `%conResize to ${this.lastSize} -> ${newWidth} - bigger but still bellow and in progress`,
        'color: red',
      )
      this.lastSize = newWidth
      return
    }

    if (newWidth < this.lastSize) {
      console.log(`%conResize to ${this.lastSize} -> ${newWidth} - smaller, reduce`, 'color: red')
      this.setState({
        stable: false,
      })
      return
    }

    console.log(`%conResize to ${this.lastSize} -> ${newWidth} - recompute`, 'color: red')
    this.lastSize = newWidth
    this.setState(state => ({
      items: state.initialItems,
      stable: false,
    }))
  }

  private lastSize?: number
  private lastComputedSize?: number

  afterComponentRendered() {
    console.log('afterComponentRendered:SYNC')
    window.requestAnimationFrame(() => {
      // TODO: cancel on unmount
      console.log('afterComponentRendered')
      if (this.containerRef.current && this.hiddenRef.current) {
        const containerDimension = this.containerRef.current.getBoundingClientRect().width
        if (!this.lastSize) {
          this.lastSize = containerDimension
        }
        // console.log('%ccontainerDimension', 'color: blue', containerDimension)
        const scrollDimension = this.hiddenRef.current.scrollWidth
        this.lastComputedSize = scrollDimension
        console.log(
          `%ccontainer=${containerDimension} scroll=${scrollDimension} items=${
            this.state.initialItems.length
          }/${this.state.items.length}`,
          'color: blue',
        )
        if (scrollDimension > containerDimension) {
          // console.log(
          //   `it does not fit ${this.state.items.length} of ${this.props.items.length} items`,
          // )
          this.setState((state, props) => {
            return {
              items: props.reduce(state.items, props.items),
            }
          })
        } else if (!this.state.stable) {
          this.setState({
            stable: true,
            stableItems: this.state.items,
          })
          console.log('%cstable', 'color: green')
        }
      }
    })
  }

  render() {
    return (
      <>
        <Ref innerRef={this.containerRef}>
          <div
            style={{
              outline: '1px solid green',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {!this.state.stable && (
              <Ref innerRef={this.hiddenRef}>
                <div
                  style={{
                    outline: '1px solid blue',
                    // visibility: 'hidden',
                    position: 'fixed',
                    overflow: 'hidden',
                  }}
                >
                  {this.props.renderItems(this.state.items)}
                </div>
              </Ref>
            )}

            {this.state.stableItems && this.props.renderItems(this.state.stableItems)}
            {/* <ReactResizeDetector skipOnMount handleWidth refreshMode='debounce' refreshRate={16} onResize={this.onResize} /> */}
            <ReactResizeDetector skipOnMount handleWidth onResize={this.onResize} />
          </div>
        </Ref>
      </>
    )
  }
}

export default ResizeGroup
