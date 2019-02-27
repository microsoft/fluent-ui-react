import {
  Accessibility,
  AccessibilityBehavior,
  Button,
  ButtonProps,
  Menu,
  MenuProps,
  Ref,
  ShorthandValue,
} from '@stardust-ui/react'
import * as _ from 'lodash'
import * as keyboardKey from 'keyboard-key'
import * as PopperJS from 'popper.js'
import * as React from 'react'
import { Manager as PopperManager, Reference as PopperReference, Popper } from 'react-popper'

import { focusButton, focusMenuItem, focusNearest } from './focusUtils'
import menuButtonBehavior from './menuButtonBehavior'
import MenuButtonWrapper from './MenuButtonWrapper'

export interface MenuButtonProps {
  accessibility?: Accessibility
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
    accessibility: menuButtonBehavior,
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

      focusMenuItem(this.menuRef, this.state.lastKeyCode === keyboardKey.ArrowUp ? 'last' : 'first')
    }

    if (prevState.menuOpen && !this.state.menuOpen) {
      document.removeEventListener('click', this.handleDocumentClick)

      switch (this.state.lastKeyCode) {
        case keyboardKey.Enter:
        case keyboardKey.Escape:
          focusButton(this.buttonRef)
          break

        case keyboardKey.Tab:
          focusNearest(this.buttonRef, this.state.lastShiftKey ? 'previous' : 'next')
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
      _.invoke(this.buttonRef.current, 'contains', target) &&
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

  handleMenuItemOverrides = accessibilityBehavior =>
    _.map(_.get(this.props.menu, 'items'), (item: ShorthandValue) =>
      typeof item === 'object'
        ? {
            ...item,
            ...accessibilityBehavior.menuItem,
          }
        : {
            content: item,
            key: item,
            ...accessibilityBehavior.menuItem,
          },
    )

  render() {
    const { accessibility, button, disabled, menu, placement } = this.props
    const { menuOpen } = this.state
    const accessibilityBehavior: AccessibilityBehavior = accessibility({
      ...this.props,
      ...this.state,
    })

    return (
      <MenuButtonWrapper onKeyDown={this.handleKeyDown}>
        <PopperManager>
          <PopperReference>
            {({ ref }) => (
              <Ref
                innerRef={(buttonNode: HTMLButtonElement) => {
                  // @ts-ignore
                  this.buttonRef.current = buttonNode
                  ref(buttonNode)
                }}
              >
                {Button.create(button, {
                  defaultProps: {
                    ...accessibilityBehavior.attributes.button,
                    disabled,
                  },
                  overrideProps: this.handleButtonOverrides,
                })}
              </Ref>
            )}
          </PopperReference>
          <Popper placement={placement}>
            {({ placement, ref, style }) =>
              menuOpen && (
                <Ref
                  innerRef={(menuNode: HTMLUListElement) => {
                    // @ts-ignore
                    this.menuRef.current = menuNode
                    ref(menuNode)
                  }}
                >
                  {Menu.create(menu, {
                    defaultProps: {
                      ...accessibilityBehavior.attributes.menu,
                      'data-placement': placement,
                      styles: { background: '#fff', zIndex: 1 },
                      vertical: true,
                    },
                    overrideProps: {
                      items: this.handleMenuItemOverrides(accessibilityBehavior),
                      style,
                    },
                  })}
                </Ref>
              )
            }
          </Popper>
        </PopperManager>
      </MenuButtonWrapper>
    )
  }
}

export default MenuButton
