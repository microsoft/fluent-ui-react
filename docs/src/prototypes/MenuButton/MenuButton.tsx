import {
  AccessibilityAttributes,
  ReactAccessibilityBehavior,
  Button,
  ButtonProps,
  Menu,
  MenuItemProps,
  MenuProps,
  Ref,
  ShorthandValue,
  Alignment,
  Position,
  UNSTABLE_Popper,
} from '@stardust-ui/react'
import * as _ from 'lodash'
import * as keyboardKey from 'keyboard-key'
import * as PopperJS from 'popper.js'
import * as React from 'react'

import { focusMenuItem, focusNearest } from './focusUtils'
import menuButtonBehavior from './menuButtonBehavior'

export interface MenuButtonProps {
  button: ShorthandValue<ButtonProps>
  buttonId: string
  disabled?: boolean
  menu: ShorthandValue<MenuProps>
  menuId: string
  placement?: PopperJS.Placement
}

export interface MenuButtonState {
  lastKeyCode: null | number
  lastShiftKey: boolean
  menuOpen: boolean
}

class MenuButton extends React.Component<MenuButtonProps, MenuButtonState> {
  static defaultProps = {
    placement: 'bottom',
  }

  state: MenuButtonState = {
    lastKeyCode: null,
    lastShiftKey: false,
    menuOpen: false,
  }

  buttonRef = React.createRef<HTMLButtonElement>()
  menuRef = React.createRef<HTMLUListElement>()

  componentDidUpdate(_, prevState: MenuButtonState) {
    if (!prevState.menuOpen && this.state.menuOpen) {
      document.addEventListener('click', this.handleDocumentClick)

      focusMenuItem(
        this.menuRef.current,
        this.state.lastKeyCode === keyboardKey.ArrowUp ? 'last' : 'first',
      )
    }

    if (prevState.menuOpen && !this.state.menuOpen) {
      document.removeEventListener('click', this.handleDocumentClick)

      switch (this.state.lastKeyCode) {
        case keyboardKey.Enter:
        case keyboardKey.Escape:
          this.buttonRef.current.focus()
          break

        case keyboardKey.Tab:
          focusNearest(this.buttonRef.current, this.state.lastShiftKey ? 'previous' : 'next')
          break
      }
    }
  }

  handleButtonOverrides = (predefinedProps: ButtonProps) => ({
    onClick: (e: React.SyntheticEvent, buttonProps: ButtonProps) => {
      _.invoke(predefinedProps, 'onClick', e, buttonProps)
      this.setState(prevState => ({
        lastKeyCode: null,
        menuOpen: !prevState.menuOpen,
      }))
    },
  })

  handleDocumentClick = (e: MouseEvent) => {
    const { menuOpen } = this.state
    const target = e.target as HTMLElement
    const isInside =
      _.invoke(this.buttonRef.current, 'contains', target) ||
      _.invoke(this.menuRef.current, 'contains', target)

    if (menuOpen && !isInside) {
      this.setState({ lastKeyCode: null, menuOpen: false })
    }
  }

  handleKeyDown = (e: React.KeyboardEvent) => {
    const { menuOpen } = this.state

    const keyCode = keyboardKey.getCode(e)
    const shouldClose =
      menuOpen && _.includes([keyboardKey.Enter, keyboardKey.Escape, keyboardKey.Tab], keyCode)
    const shouldOpen =
      !menuOpen && _.includes([keyboardKey.ArrowDown, keyboardKey.ArrowUp], keyCode)

    if (shouldClose) {
      // We should prevent default there otherwise event will be bubbled to a button and will cause menu reopen
      if (keyCode === keyboardKey.Enter) e.preventDefault()

      this.setState({
        lastKeyCode: keyCode,
        lastShiftKey: e.shiftKey,
        menuOpen: false,
      })
    }

    if (shouldOpen) {
      this.setState({ lastKeyCode: keyCode, menuOpen: true })
    }
  }

  handleMenuItemClick = (predefinedProps?: MenuItemProps) => (
    e: React.SyntheticEvent,
    itemProps: MenuItemProps,
  ) => {
    _.invoke(predefinedProps, 'onClick', e, itemProps)
    this.setState({ lastKeyCode: null, menuOpen: false })
  }

  handleMenuItemOverrides = (menuItemAccessibilityAttributes: AccessibilityAttributes) =>
    _.map(_.get(this.props.menu, 'items'), (item: ShorthandValue) =>
      typeof item === 'object'
        ? {
            ...item,
            onClick: this.handleMenuItemClick(item as MenuItemProps),
            ...menuItemAccessibilityAttributes,
          }
        : {
            content: item,
            key: item,
            onClick: this.handleMenuItemClick(),
            ...menuItemAccessibilityAttributes,
          },
    )

  render() {
    const { button, disabled, menu, placement } = this.props
    const { menuOpen } = this.state
    const [position, align] = _.split(placement, '-') as [Position, Alignment]
    const accessibilityBehavior: ReactAccessibilityBehavior = {
      attributes: {},
      ...menuButtonBehavior({ ...this.props, ...this.state }),
      keyHandlers: {},
    }

    return (
      <div
        onKeyDown={this.handleKeyDown}
        style={{ boxSizing: 'border-box', display: 'inline-block' }}
      >
        <Ref innerRef={this.buttonRef}>
          {Button.create(button, {
            defaultProps: {
              ...accessibilityBehavior.attributes.button,
              disabled,
            },
            overrideProps: this.handleButtonOverrides,
          })}
        </Ref>
        {menuOpen && (
          <UNSTABLE_Popper align={align} position={position} targetRef={this.buttonRef}>
            <Ref innerRef={this.menuRef}>
              {Menu.create(menu, {
                defaultProps: {
                  ...accessibilityBehavior.attributes.menu,
                  'data-placement': placement,
                  styles: { background: '#fff', zIndex: 1 },
                  vertical: true,
                },
                overrideProps: {
                  items: this.handleMenuItemOverrides(accessibilityBehavior.attributes.menuItem),
                },
              })}
            </Ref>
          </UNSTABLE_Popper>
        )}
      </div>
    )
  }
}

export default MenuButton
