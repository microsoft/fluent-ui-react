import * as React from 'react'
import * as ReactDOM from 'react-dom'

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
  P extends {} & { atomicItemProps: IAtomicItemProps },
  S extends IAtomicItemState
> {
  public itemRef = React.createRef<HTMLElement>()

  constructor(private component: React.Component<P, S>) {
    this.component.state = {
      shouldSubContainerBeOpened: false,
      isLastOpened: false,
    } as any
  }

  componentDidUpdate() {
    if (this.component.props.atomicItemProps.isFocused) {
      const domNode = ReactDOM.findDOMNode(this.itemRef.current!) as HTMLElement
      domNode.focus()
    }
  }

  public movePrevious() {
    if (
      this.component.props.atomicItemProps.isFirstElement ||
      !this.component.props.atomicItemProps.isFocused
    ) {
      return
    }

    this.component.props.atomicItemProps.onMovePrevious()
  }

  public moveNext() {
    if (
      this.component.props.atomicItemProps.isLastElement ||
      !this.component.props.atomicItemProps.isFocused
    ) {
      return
    }

    this.component.props.atomicItemProps.onMoveNext()
  }

  public moveFirst() {
    if (
      this.component.props.atomicItemProps.isFirstElement ||
      !this.component.props.atomicItemProps.isFocused
    ) {
      return
    }

    this.component.props.atomicItemProps.onMoveFirst()
  }

  public moveLast() {
    if (
      this.component.props.atomicItemProps.isLastElement ||
      !this.component.props.atomicItemProps.isFocused
    ) {
      return
    }

    this.component.props.atomicItemProps.onMoveLast()
  }

  public enter() {
    this.component.setState({ isLastOpened: false })

    if (
      !this.component.props.atomicItemProps.isFocused ||
      !(this.component.props as any).subItems
    ) {
      return
    }

    this.component.setState({
      shouldSubContainerBeOpened: true,
      isLastOpened: true,
    })

    this.component.props.atomicItemProps.onEnter()
  }

  public space() {
    if (!this.component.props.atomicItemProps.isFocused) {
      return
    }

    this.component.props.atomicItemProps.onSpace()
  }

  public esc() {
    if (!this.component.props.atomicItemProps.isFocused) {
      return
    }

    this.component.setState({ shouldSubContainerBeOpened: false })
    this.component.props.atomicItemProps.onEsc()
  }
}
