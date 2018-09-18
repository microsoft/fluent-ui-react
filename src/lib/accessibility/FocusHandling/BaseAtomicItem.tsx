import * as React from 'react'
import * as ReactDOM from 'react-dom'
import keyboardKey from 'keyboard-key'

import { UIComponent, AutoControlledComponent } from '../..'

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
  P extends IAtomicItemProps,
  S extends IAtomicItemState = IAtomicItemState
> extends UIComponent<P, S> {
  protected itemRef = React.createRef<HTMLElement>()

  constructor(props: P, state: S) {
    super(props, state)

    this.state = {
      shouldSubContainerBeOpened: false,
      isLastOpened: false,
    } as any
  }

  componentDidUpdate() {
    if (this.props.isFocused) {
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
        // if (this.props.parentContainerDirection === 'vertical') {
        //   break
        // }
        this.movePrevious()
        break

      case keyboardKey.ArrowRight:
        console.log('Right Arrow Key Pressed')
        // if (this.props.parentContainerDirection === 'vertical') {
        //   break
        // }
        this.moveNext()
        break

      case keyboardKey.ArrowUp:
        console.log('Up Arrow Key Pressed')
        // if (this.props.parentContainerDirection === 'horizontal') {
        //   break
        // }
        this.movePrevious()
        break

      case keyboardKey.ArrowDown:
        console.log('Down Arrow Key Pressed')
        // if (this.props.parentContainerDirection === 'horizontal') {
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

        console.error(`isLastOpened ${this.state.isLastOpened}`)
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

  private movePrevious() {
    if (this.props.isFirstElement || !this.props.isFocused) {
      return
    }

    this.props.onMovePrevious()
  }

  private moveNext() {
    if (this.props.isLastElement || !this.props.isFocused) {
      return
    }

    this.props.onMoveNext()
  }

  private moveFirst() {
    if (this.props.isFirstElement || !this.props.isFocused) {
      return
    }

    this.props.onMoveFirst()
  }

  private moveLast() {
    if (this.props.isLastElement || !this.props.isFocused) {
      return
    }

    this.props.onMoveLast()
  }

  private enter() {
    this.setState({ isLastOpened: false })

    if (!this.props.isFocused || !(this.props as any).subItems) {
      return
    }

    this.setState({
      shouldSubContainerBeOpened: true,
      isLastOpened: true,
    })

    this.props.onEnter()
  }

  private space() {
    if (!this.props.isFocused) {
      return
    }

    this.props.onSpace()
  }

  private esc() {
    if (!this.props.isFocused) {
      return
    }

    console.warn(`isLastOpened ${this.state.isLastOpened}`)

    this.setState({ shouldSubContainerBeOpened: false })
    this.props.onEsc()
  }
}
