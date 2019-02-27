import {
  Accessibility,
  AccessibilityAttributes,
  AccessibilityBehavior,
  Button,
  ButtonProps,
  Menu,
  MenuItemProps,
  MenuProps,
  Ref,
  ShorthandValue,
} from '@stardust-ui/react'
import * as _ from 'lodash'
import * as keyboardKey from 'keyboard-key'
import * as PopperJS from 'popper.js'
import * as React from 'react'
import { Manager as PopperManager, Reference as PopperReference, Popper } from 'react-popper'

import { focusMenuItem, focusNearest } from './focusUtils'
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

  buttonNode: HTMLButtonElement
  menuNode: HTMLUListElement

  componentDidUpdate(_, prevState: MenuButtonState) {
    if (!prevState.menuOpen && this.state.menuOpen) {
      document.addEventListener('click', this.handleDocumentClick)

      focusMenuItem(
        this.menuNode,
        this.state.lastKeyCode === keyboardKey.ArrowUp ? 'last' : 'first',
      )
    }

    if (prevState.menuOpen && !this.state.menuOpen) {
      document.removeEventListener('click', this.handleDocumentClick)

      switch (this.state.lastKeyCode) {
        case keyboardKey.Enter:
        case keyboardKey.Escape:
          this.buttonNode.focus()
          break

        case keyboardKey.Tab:
          focusNearest(this.buttonNode, this.state.lastShiftKey ? 'previous' : 'next')
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
      _.invoke(this.buttonNode, 'contains', target) || _.invoke(this.menuNode, 'contains', target)

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
                  this.buttonNode = buttonNode
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
                    this.menuNode = menuNode
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
                      items: this.handleMenuItemOverrides(
                        accessibilityBehavior.attributes.menuItem,
                      ),
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
