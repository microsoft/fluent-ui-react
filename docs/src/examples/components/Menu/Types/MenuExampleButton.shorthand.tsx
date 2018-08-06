import React from 'react'
import { Menu, Button } from '@stardust-ui/react'
import keyboardKey from 'keyboard-key'

class MenuExampleButton extends React.Component {
  state = {
    activeItem: 'a',
    popupOpened: false,
  }

  buttonRef: Button
  setButtonRef = ref => (this.buttonRef = ref)

  popupRef: Menu
  setPopupRef = ref => (this.popupRef = ref)

  elementRef: HTMLElement
  setElementRef = ref => (this.elementRef = ref)

  handleItemClick = activeItem => () => {
    this.setState({ activeItem })
  }

  doesNodeContainClick = (element: HTMLElement, event) => {
    return element.contains(event.target)
  }

  handleDocumentClick = (e: Event) => {
    e.stopPropagation()
    if (this.elementRef && this.doesNodeContainClick(this.elementRef, e)) return

    this.setState({ popupOpened: false })
  }

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick)
  }

  render() {
    const { activeItem, popupOpened } = this.state

    const onMenuItemKeyDown = e => {
      if (keyboardKey.getCode(e) === keyboardKey.Escape) {
        this.setState({ popupOpened: false }, () => {
          this.buttonRef.elementRef.focus()
        })
      }
    }

    const focusFirstChildMenu = () => {
      this.popupRef.focusZone.focus()
    }

    const focusLastChildMenu = () => {
      this.popupRef.focusZone.focusLast()
    }

    const openPopup = (clbk?: Function) => {
      if (this.state.popupOpened) {
        clbk()()
      } else {
        this.setState({ activeItem: activeItem || 'a', popupOpened: !popupOpened }, clbk && clbk())
      }
    }

    const togglePopup = (clbk?: Function) => {
      this.setState({ activeItem: 'a', popupOpened: !popupOpened }, clbk && clbk())
    }

    const handleClick = () => togglePopup()
    const handleKeyDown = e => {
      let clbk: Function
      const keyCode = keyboardKey.getCode(e)

      switch (keyCode) {
        case keyboardKey.ArrowUp:
          clbk = () => focusLastChildMenu.bind(this)
          openPopup(clbk)
          break

        case keyboardKey.ArrowDown:
          clbk = () => focusFirstChildMenu.bind(this)
          openPopup(clbk)
          break

        case keyboardKey.Enter:
        case keyboardKey.Spacebar:
          clbk = () => focusFirstChildMenu.bind(this)
          togglePopup(clbk)
          break
      }
    }

    const submenu = (
      <Menu ref={this.setPopupRef} vertical onKeyDown={onMenuItemKeyDown}>
        <Menu.Item
          accBehavior="verticalMenuItem"
          active={activeItem === 'a'}
          onClick={this.handleItemClick('a')}
        >
          Editorials
        </Menu.Item>
        <Menu.Item
          accBehavior="verticalMenuItem"
          active={activeItem === 'b'}
          onClick={this.handleItemClick('b')}
        >
          Reviews
        </Menu.Item>
        <Menu.Item
          accBehavior="verticalMenuItem"
          active={activeItem === 'c'}
          onClick={this.handleItemClick('c')}
        >
          Upcoming Events
        </Menu.Item>
      </Menu>
    )

    return (
      <div className="popup-button" ref={this.setElementRef} style={{ width: 200 }}>
        <Button
          accBehavior="popupButton"
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          ref={this.setButtonRef}
        >
          {' '}
          Menu button <span aria-hidden="true">▾</span>
        </Button>

        {popupOpened ? submenu : null}
      </div>
    )
  }
}

export default MenuExampleButton
