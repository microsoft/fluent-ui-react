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

export abstract class BaseAtomicItem<
  P,
  S extends IAtomicItemState = IAtomicItemState
> extends UIComponent<any, S> {
  protected itemRef = React.createRef<HTMLElement>()

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

  protected handleKeyDown = (e: KeyboardEvent) => {
    switch (e.keyCode) {
      case keyboardKey.End:
        console.log('End Arrow Key Pressed')
        this.moveLast()
        break

      case keyboardKey.Home:
        console.log('Home Arrow Key Pressed')
        this.moveFirst()
        break

      case keyboardKey.ArrowLeft:
        console.log('Left Arrow Key Pressed')
        // if (this.props.atomicItemProps.parentContainerDirection === 'vertical') {
        //   break
        // }
        this.movePrevious()
        break

      case keyboardKey.ArrowRight:
        console.log('Right Arrow Key Pressed')
        // if (this.props.atomicItemProps.parentContainerDirection === 'vertical') {
        //   break
        // }
        this.moveNext()
        break

      case keyboardKey.ArrowUp:
        console.log('Up Arrow Key Pressed')
        // if (this.props.atomicItemProps.parentContainerDirection === 'horizontal') {
        //   break
        // }
        this.movePrevious()
        break

      case keyboardKey.ArrowDown:
        console.log('Down Arrow Key Pressed')
        // if (this.props.atomicItemProps.parentContainerDirection === 'horizontal') {
        //   break
        // }
        this.moveNext()
        break

      case keyboardKey.Enter:
        console.log('ENTER Key Pressed')
        this.enter()
        break

      case keyboardKey[' ']:
        console.log('SPACE Key Pressed')
        this.space()
        break

      case keyboardKey.Escape:
        console.log('ESC Key Pressed')

        this.esc()
        if (this.state.isLastOpened === true) {
          e.preventDefault()
          e.stopPropagation()
          this.setState({ isLastOpened: false })
        }
        break
    }

    // TODO: make this correct
    if (e.keyCode !== keyboardKey.Tab && e.keyCode !== keyboardKey.Escape) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  protected movePrevious() {
    if (this.props.atomicItemProps.isFirstElement || !this.props.atomicItemProps.isFocused) {
      return
    }

    this.props.atomicItemProps.onMovePrevious()
  }

  protected moveNext() {
    if (this.props.atomicItemProps.isLastElement || !this.props.atomicItemProps.isFocused) {
      return
    }

    this.props.atomicItemProps.onMoveNext()
  }

  protected moveFirst() {
    if (this.props.atomicItemProps.isFirstElement || !this.props.atomicItemProps.isFocused) {
      return
    }

    this.props.atomicItemProps.onMoveFirst()
  }

  protected moveLast() {
    if (this.props.atomicItemProps.isLastElement || !this.props.atomicItemProps.isFocused) {
      return
    }

    this.props.atomicItemProps.onMoveLast()
  }

  protected enter() {
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

  protected space() {
    if (!this.props.atomicItemProps.isFocused) {
      return
    }

    this.props.atomicItemProps.onSpace()
  }

  protected esc() {
    if (!this.props.atomicItemProps.isFocused) {
      return
    }

    console.warn(`isLastOpened ${this.state.isLastOpened}`)

    this.setState({ shouldSubContainerBeOpened: false })
    this.props.atomicItemProps.onEsc()
  }
}
