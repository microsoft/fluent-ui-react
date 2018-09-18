import * as React from 'react'
import * as ReactDOM from 'react-dom'
import keyboardKey from 'keyboard-key'

import { UIComponent } from '../..'

export interface IAtomicItemProps {
  isFocused: boolean

  isFirstElement: boolean
  isLastElement: boolean

  onMovePrevious: () => void
  onMoveNext: () => void
  onMoveFirst: () => void
  onMoveLast: () => void
  onEnter: () => void
  onSpace: () => void
  onEsc: () => void
}

export interface IAtomicItemState {
  shouldSubContainerBeOpened: boolean
  isLastOpened: boolean
}

export class AtomicItemFocusHandler<
  P,
  S extends IAtomicItemState = IAtomicItemState
> extends UIComponent<any, S> {
  public itemRef = React.createRef<HTMLElement>()

  constructor(props: any, state: S) {
    super(props, state)

    this.state = {
      shouldSubContainerBeOpened: false,
      isLastOpened: false,
    } as any
  }

  componentDidUpdate() {
    if (this.props.atomicItemProps.isFocused) {
      const domNode = ReactDOM.findDOMNode(this.itemRef.current!) as HTMLElement
      domNode.focus()
    }
  }

  public movePrevious() {
    if (this.props.atomicItemProps.isFirstElement || !this.props.atomicItemProps.isFocused) {
      return
    }

    this.props.atomicItemProps.onMovePrevious()
  }

  public moveNext() {
    if (this.props.atomicItemProps.isLastElement || !this.props.atomicItemProps.isFocused) {
      return
    }

    this.props.atomicItemProps.onMoveNext()
  }

  public moveFirst() {
    if (this.props.atomicItemProps.isFirstElement || !this.props.atomicItemProps.isFocused) {
      return
    }

    this.props.atomicItemProps.onMoveFirst()
  }

  public moveLast() {
    if (this.props.atomicItemProps.isLastElement || !this.props.atomicItemProps.isFocused) {
      return
    }

    this.props.atomicItemProps.onMoveLast()
  }

  public enter() {
    this.setState({ isLastOpened: false })

    if (!this.props.atomicItemProps.isFocused || !(this.props as any).subItems) {
      return
    }

    this.setState({
      shouldSubContainerBeOpened: true,
      isLastOpened: true,
    })

    this.props.atomicItemProps.onEnter()
  }

  public space() {
    if (!this.props.atomicItemProps.isFocused) {
      return
    }

    this.props.atomicItemProps.onSpace()
  }

  public esc() {
    if (!this.props.atomicItemProps.isFocused) {
      return
    }

    console.warn(`isLastOpened ${this.state.isLastOpened}`)

    this.setState({ shouldSubContainerBeOpened: false })
    this.props.atomicItemProps.onEsc()
  }
}
